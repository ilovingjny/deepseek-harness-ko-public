import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative, resolve } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../')
const packagesRoot = join(repoRoot, 'packages')
const clientRoot = join(repoRoot, 'packages/client')

interface LocaleSource {
  readonly path: string
  readonly source: string
  readonly file: ts.SourceFile
}

interface DictionaryShape {
  readonly keys: readonly string[]
  readonly placeholders: ReadonlyMap<string, readonly string[]>
}

function localeSources(dir: string): LocaleSource[] {
  const result: LocaleSource[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'lib') continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) result.push(...localeSources(path))
    else if (entry.name === 'locales.ts' && path.includes('/src/client/')) {
      const source = readFileSync(path, 'utf8')
      result.push({
        path,
        source,
        file: ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS),
      })
    }
  }
  return result.sort((left, right) => left.path.localeCompare(right.path))
}

function clientSources(dir: string): LocaleSource[] {
  const result: LocaleSource[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'lib') continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) result.push(...clientSources(path))
    else if (path.includes('/src/client/') && /\.tsx?$/.test(entry.name)) {
      const source = readFileSync(path, 'utf8')
      result.push({
        path,
        source,
        file: ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, entry.name.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS),
      })
    }
  }
  return result.sort((left, right) => left.path.localeCompare(right.path))
}

function propertyName(property: ts.PropertyName | undefined): string | undefined {
  if (property === undefined) return undefined
  if (ts.isIdentifier(property) || ts.isStringLiteral(property) || ts.isNumericLiteral(property)) return property.text
  return undefined
}

function dictionaryObject(file: ts.SourceFile, name: string): ts.ObjectLiteralExpression | undefined {
  let found: ts.ObjectLiteralExpression | undefined
  const unwrap = (expression: ts.Expression): ts.Expression => {
    if (
      ts.isAsExpression(expression) ||
      ts.isTypeAssertionExpression(expression) ||
      ts.isSatisfiesExpression(expression) ||
      ts.isParenthesizedExpression(expression)
    ) {
      return unwrap(expression.expression)
    }
    return expression
  }
  const visit = (node: ts.Node): void => {
    if (found !== undefined) return
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) {
      if (node.initializer === undefined) return
      const initializer = unwrap(node.initializer)
      if (initializer !== undefined && ts.isObjectLiteralExpression(initializer)) found = initializer
    }
    ts.forEachChild(node, visit)
  }
  visit(file)
  return found
}

function literalText(node: ts.Expression): string | undefined {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) ? node.text : undefined
}

function placeholders(text: string): string[] {
  return [...text.matchAll(/\{([A-Za-z0-9_]+)\}/g)].map(match => match[1] as string).sort()
}

function dictionaryShape(file: ts.SourceFile, name: string): DictionaryShape | undefined {
  const object = dictionaryObject(file, name)
  if (object === undefined) return undefined
  const keys: string[] = []
  const placeholderMap = new Map<string, readonly string[]>()
  for (const property of object.properties) {
    if (!ts.isPropertyAssignment(property)) continue
    const key = propertyName(property.name)
    if (key === undefined) continue
    keys.push(key)
    const text = literalText(property.initializer)
    placeholderMap.set(key, text === undefined ? [] : placeholders(text))
  }
  return { keys: keys.sort(), placeholders: placeholderMap }
}

function walk(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node)
  ts.forEachChild(node, (child) => {
    walk(child, visit)
  })
}

function callPropertyName(call: ts.CallExpression): string | undefined {
  const expression = call.expression
  if (!ts.isPropertyAccessExpression(expression)) return undefined
  return expression.name.text
}

function objectKeys(object: ts.ObjectLiteralExpression): string[] {
  return object.properties.flatMap((property) => {
    if (ts.isShorthandPropertyAssignment(property)) return [property.name.text]
    if (ts.isPropertyAssignment(property)) {
      const key = propertyName(property.name)
      return key === undefined ? [] : [key]
    }
    return []
  })
}

function stringArgument(node: ts.Expression | undefined): string | undefined {
  return node !== undefined && ts.isStringLiteral(node) ? node.text : undefined
}

function findLocaleRegisterCalls(source: LocaleSource): ts.CallExpression[] {
  const calls: ts.CallExpression[] = []
  walk(source.file, (node) => {
    if (ts.isCallExpression(node) && callPropertyName(node) === 'register') {
      const receiver = node.expression
      if (ts.isPropertyAccessExpression(receiver)) {
        const owner = receiver.expression.getText(source.file)
        if (owner === 'locale' || owner.endsWith('.locale')) calls.push(node)
      }
    }
  })
  return calls
}

function relativePath(path: string): string {
  return relative(repoRoot, path)
}

function expectNoIssues(issues: readonly string[]): void {
  expect(issues, issues.join('\n')).toEqual([])
}

describe('Korean locale coverage', () => {
  const sources = localeSources(packagesRoot)
  const clientFiles = clientSources(packagesRoot)

  it('requires ko for every zh/en dictionary, with identical keys and placeholders', () => {
    const issues: string[] = []
    for (const source of sources) {
      const zh = dictionaryShape(source.file, 'zh')
      const en = dictionaryShape(source.file, 'en')
      if (zh === undefined || en === undefined) continue
      const ko = dictionaryShape(source.file, 'ko')
      const path = relativePath(source.path)
      if (ko === undefined) {
        issues.push(`${path}: missing ko dictionary`)
        continue
      }
      for (const key of new Set([...zh.keys, ...en.keys, ...ko.keys])) {
        const keySets = [zh, en, ko].map(dictionary => dictionary.keys.includes(key))
        if (new Set(keySets).size !== 1) issues.push(`${path}: key "${key}" is not present in zh/en/ko equally`)
        const variants = [zh, en, ko].map(dictionary => (dictionary.placeholders.get(key) ?? []).join('|'))
        if (new Set(variants).size !== 1) issues.push(`${path}: key "${key}" has different {placeholder} names in zh/en/ko`)
      }
    }
    expectNoIssues(issues)
  })

  it('requires ko in every typed locale.register({ zh, en, ... }) call', () => {
    const issues: string[] = []
    for (const source of clientFiles) {
      for (const call of findLocaleRegisterCalls(source)) {
        const dicts = call.arguments[1]
        if (dicts === undefined || !ts.isObjectLiteralExpression(dicts)) continue
        const keys = objectKeys(dicts)
        if (keys.includes('zh') && keys.includes('en') && !keys.includes('ko')) {
          issues.push(`${relativePath(source.path)}:${source.file.getLineAndCharacterOfPosition(call.getStart(source.file)).line + 1}: locale.register dictionary has zh/en but no ko`)
        }
      }
    }
    expectNoIssues(issues)
  })

  it('requires ko in the directory-browser dynamic dictionary list', () => {
    const path = join(clientRoot, 'ui-directory-picker-browse/src/client/index.ts')
    const source = readFileSync(path, 'utf8')
    const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    const locales = new Set<string>()
    walk(file, (node) => {
      if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || node.name.text !== 'dictionaries') return
      if (!node.initializer || !ts.isArrayLiteralExpression(node.initializer)) return
      for (const entry of node.initializer.elements) {
        if (!ts.isArrayLiteralExpression(entry)) continue
        const locale = stringArgument(entry.elements[0])
        if (locale !== undefined) locales.add(locale)
      }
    })
    expectNoIssues([...['zh', 'en', 'ko'].filter(locale => !locales.has(locale))]
      .map(locale => `${relativePath(path)}: dictionaries is missing ${locale}`))
  })

  it('requires ko in permission ACCESS_NS dynamic registrations', () => {
    const path = join(clientRoot, 'ui-permission-presets/src/client/index.ts')
    const source = readFileSync(path, 'utf8')
    const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    const locales = new Set<string>()
    walk(file, (node) => {
      if (!ts.isCallExpression(node) || callPropertyName(node) !== 'register') return
      if (node.arguments[0]?.getText(file) !== 'ACCESS_NS') return
      const locale = stringArgument(node.arguments[1])
      if (locale !== undefined) locales.add(locale)
    })
    expectNoIssues([...['zh', 'en', 'ko'].filter(locale => !locales.has(locale))]
      .map(locale => `${relativePath(path)}: ACCESS_NS registration is missing ${locale}`))
  })
})
