/** Locale bundles for the agent-preset settings row, hero chip, header label, and management section. */

/** Locale keys these surfaces render. */
export type AgentPresetSettingsKey =
  | 'title' | 'description' | 'loading' | 'error' | 'userTrust' | 'seatHint' | 'headerHint'
  | 'nav' | 'sectionIntro' | 'builtIn' | 'setDefault' | 'view'
  | 'presetStandardName' | 'presetStandardDescription'
  | 'presetCodeName' | 'presetCodeDescription'
  | 'presetMinimalName' | 'presetMinimalDescription'
  | 'presetCordisName' | 'presetCordisDescription'
  | 'duplicate' | 'duplicateUnavailable' | 'delete' | 'presetId' | 'presetIdPlaceholder' | 'copyOf'
  | 'displayName' | 'displayNamePlaceholder'
  | 'inUse' | 'noDescription' | 'builtInGroup' | 'customGroup'
  | 'brokenBadge' | 'brokenNoCopy'
  | 'composition' | 'cancel' | 'close' | 'retry'
  | 'copyTitle' | 'copyIntro' | 'create' | 'creating' | 'creatorDraft'
  | 'openLocation' | 'showLocation' | 'revealedPathLabel'
  | 'idRequired' | 'idInvalid' | 'idTaken'
  | 'deleteTitle' | 'deleteDescription' | 'deleteConfirm' | 'deleting'

/** English copy. */
export const en: Record<AgentPresetSettingsKey, string> = {
  title: 'Agent preset',
  description: 'Applies to sessions you start from now on. Running sessions keep the preset they began with.',
  loading: 'Loading presets…',
  error: 'Could not load agent presets.',
  userTrust: 'Custom',
  seatHint: 'Agent preset for the session you are about to start',
  headerHint: 'The agent preset this session runs, fixed when it started',
  nav: 'Agent presets',
  sectionIntro:
    'A preset is the plugin composition one session\'s agent runs — its tools, prompt, and capabilities. '
    + 'Duplicate an existing one and make it yours, or let the agent draft one for you in Creator mode.',
  builtIn: 'Built-in',
  setDefault: 'Set as default',
  view: 'View',
  presetStandardName: 'Standard mode',
  presetStandardDescription:
    'Full coding agent with file editing, shell, file and web search, skills, planning, goals, subagents, and workflows.',
  presetCodeName: 'Code mode',
  presetCodeDescription:
    'All Standard mode capabilities, with tools exposed through the Code Mode SDK so the model can combine multi-step operations in one TypeScript program.',
  presetMinimalName: 'Minimal mode',
  presetMinimalDescription:
    'Two-tool coding agent with persistent bash and str_replace_editor.',
  presetCordisName: 'Creator mode',
  presetCordisDescription:
    'Built for creating custom agent presets, with all Standard mode capabilities plus runtime inspection, plugin experiments, and preset-authoring guidance.',
  duplicate: 'Duplicate',
  duplicateUnavailable: 'This deployment has no writable preset directory',
  delete: 'Delete',
  presetId: 'Identifier',
  presetIdPlaceholder: 'my-agent',
  displayName: 'Name',
  displayNamePlaceholder: 'Shown in the picker; defaults to the identifier',
  inUse: 'In use',
  builtInGroup: 'Built-in',
  customGroup: 'Custom',
  noDescription: 'No description.',
  brokenBadge: 'Failed to load',
  brokenNoCopy: 'A preset that failed to load cannot be duplicated',
  copyOf: 'Copied from',
  composition: 'Composition (agent.cordis.yml)',
  cancel: 'Cancel',
  close: 'Close',
  retry: 'Retry',
  copyTitle: 'Duplicate preset',
  copyIntro:
    'The whole preset is copied on this machine. The identifier becomes its directory name and cannot '
    + 'be changed later; everything else is edited in the preset\'s own files.',
  create: 'Create',
  creating: 'Creating…',
  creatorDraft: 'Draft a custom preset with Creator mode',
  openLocation: 'Open folder',
  showLocation: 'Show location',
  revealedPathLabel: 'Preset files:',
  idRequired: 'Give the preset an identifier.',
  idInvalid: 'Use lowercase letters, digits, and hyphens, starting with a letter or digit.',
  idTaken: 'A preset with this identifier already exists.',
  deleteTitle: 'Delete this preset?',
  deleteDescription:
    'The preset directory is deleted. Sessions already running on it keep working; new sessions cannot select it.',
  deleteConfirm: 'Delete',
  deleting: 'Deleting…',
}

/** Simplified Chinese copy. */
export const zh: Record<AgentPresetSettingsKey, string> = {
  title: 'Agent 预设',
  description: '对此后新建的会话生效。运行中的会话保持它开始时的预设。',
  loading: '正在加载预设…',
  error: '无法加载 Agent 预设。',
  userTrust: '自定义',
  seatHint: '即将开始的这个会话所用的 Agent 预设',
  headerHint: '本会话运行的 Agent 预设，开始时即固定',
  nav: 'Agent 预设',
  sectionIntro: '预设即一个会话的 Agent 所运行的插件组装 —— 它的工具、提示词与能力。复制一份既有预设改成自己的，或用「创造模式」让 Agent 帮你创建。',
  builtIn: '内置',
  setDefault: '设为默认',
  view: '查看',
  presetStandardName: '标准模式',
  presetStandardDescription: '功能完整的编码 Agent，支持文件编辑、Shell、文件与网页检索、Skills、计划、目标、子代理和工作流。',
  presetCodeName: 'PTC 模式',
  presetCodeDescription: '具备标准模式的全部能力，并通过 Code Mode SDK 呈现工具，让模型用一个 TypeScript 程序组合多步操作。',
  presetMinimalName: '极简模式',
  presetMinimalDescription: '仅提供持久 bash 与 str_replace_editor 的双工具编码 Agent。',
  presetCordisName: '创造模式',
  presetCordisDescription: '用于创建自定义 Agent preset：具备标准模式的全部能力，并提供运行时检查、插件实验和 preset 创作指导。',
  duplicate: '复制',
  duplicateUnavailable: '此部署未配置可写的预设目录',
  delete: '删除',
  presetId: '标识符',
  presetIdPlaceholder: 'my-agent',
  displayName: '名称',
  displayNamePlaceholder: '选择器中显示的名字，缺省用标识符',
  inUse: '当前使用',
  builtInGroup: '内置',
  customGroup: '自定义',
  noDescription: '暂无描述。',
  brokenBadge: '加载失败',
  brokenNoCopy: '预设加载失败，不能复制',
  copyOf: '复制自',
  composition: '组装（agent.cordis.yml）',
  cancel: '取消',
  close: '关闭',
  retry: '重试',
  copyTitle: '复制预设',
  copyIntro: '整个预设会在本机复制一份。标识符将成为目录名，事后无法更改；其余内容之后直接在预设自己的文件里编辑。',
  create: '创建',
  creating: '正在创建…',
  creatorDraft: '用「创造模式」创作自定义预设',
  openLocation: '打开目录',
  showLocation: '查看路径',
  revealedPathLabel: '预设文件：',
  idRequired: '请填写标识符。',
  idInvalid: '只能使用小写字母、数字与连字符，且以字母或数字开头。',
  idTaken: '该标识符已被占用。',
  deleteTitle: '删除该预设？',
  deleteDescription: '预设目录将被删除。已在其上运行的会话不受影响；新会话将无法再选择它。',
  deleteConfirm: '删除',
  deleting: '正在删除…',
}

/** Korean copy. */
export const ko: Record<AgentPresetSettingsKey, string> = {
  title: '에이전트 프리셋',
  description: '앞으로 시작하는 세션에 적용됩니다. 실행 중인 세션은 시작할 때의 프리셋을 유지합니다.',
  loading: '프리셋 불러오는 중…',
  error: '에이전트 프리셋을 불러오지 못했습니다.',
  userTrust: '사용자 지정',
  seatHint: '곧 시작할 세션에서 사용할 에이전트 프리셋',
  headerHint: '이 세션이 실행하는 에이전트 프리셋이며 시작할 때 고정됩니다',
  nav: '에이전트 프리셋',
  sectionIntro: '프리셋은 한 세션의 에이전트가 실행할 플러그인 구성입니다. 도구, 프롬프트, 기능이 포함됩니다. 기존 프리셋을 복제해 내 것으로 만들거나, Creator 모드에서 에이전트에게 초안을 작성하게 할 수 있습니다.',
  builtIn: '내장',
  setDefault: '기본값으로 설정',
  view: '보기',
  presetStandardName: '표준 모드',
  presetStandardDescription: '파일 편집, 셸, 파일 및 웹 검색, 스킬, 계획, 목표, 서브에이전트, 워크플로를 지원하는 완전한 코딩 에이전트입니다.',
  presetCodeName: '코드 모드',
  presetCodeDescription: '표준 모드의 모든 기능에 더해 Code Mode SDK로 도구를 노출합니다. 모델이 하나의 TypeScript 프로그램에서 여러 단계를 조합할 수 있습니다.',
  presetMinimalName: '최소 모드',
  presetMinimalDescription: '지속형 bash와 str_replace_editor 두 도구를 사용하는 코딩 에이전트입니다.',
  presetCordisName: 'Creator 모드',
  presetCordisDescription: '사용자 지정 에이전트 프리셋을 만들기 위한 모드입니다. 표준 모드의 모든 기능과 런타임 검사, 플러그인 실험, 프리셋 작성 안내를 제공합니다.',
  duplicate: '복제',
  duplicateUnavailable: '이 배포에는 쓰기 가능한 프리셋 디렉터리가 없습니다',
  delete: '삭제',
  presetId: '식별자',
  presetIdPlaceholder: 'my-agent',
  displayName: '이름',
  displayNamePlaceholder: '선택기에 표시되며, 비워 두면 식별자를 사용합니다',
  inUse: '사용 중',
  builtInGroup: '내장',
  customGroup: '사용자 지정',
  noDescription: '설명이 없습니다.',
  brokenBadge: '불러오기 실패',
  brokenNoCopy: '불러오기에 실패한 프리셋은 복제할 수 없습니다',
  copyOf: '복제 원본',
  composition: '구성(agent.cordis.yml)',
  cancel: '취소',
  close: '닫기',
  retry: '다시 시도',
  copyTitle: '프리셋 복제',
  copyIntro: '이 컴퓨터에 프리셋 전체를 복사합니다. 식별자는 디렉터리 이름이 되며 나중에 변경할 수 없습니다. 나머지는 프리셋 자체 파일에서 편집합니다.',
  create: '생성',
  creating: '생성 중…',
  creatorDraft: 'Creator 모드로 사용자 지정 프리셋 초안 작성',
  openLocation: '폴더 열기',
  showLocation: '위치 보기',
  revealedPathLabel: '프리셋 파일:',
  idRequired: '프리셋 식별자를 입력하세요.',
  idInvalid: '소문자, 숫자, 하이픈만 사용할 수 있으며 문자나 숫자로 시작해야 합니다.',
  idTaken: '이 식별자를 사용하는 프리셋이 이미 있습니다.',
  deleteTitle: '이 프리셋을 삭제하시겠습니까?',
  deleteDescription: '프리셋 디렉터리가 삭제됩니다. 이미 실행 중인 세션은 계속 작동하지만 새 세션에서는 선택할 수 없습니다.',
  deleteConfirm: '삭제',
  deleting: '삭제 중…',
}

/** Preset roster fields needed to resolve Web display copy. */
export interface PresetDisplaySource {
  /** Stable preset id. */
  readonly id: string
  /** Whether the deployment ships the preset or the user owns it. */
  readonly trust: 'system' | 'user'
  /** Unlocalized name published by the preset. */
  readonly name?: string
  /** Unlocalized description published by the preset. */
  readonly description?: string
}

/** Display copy resolved for the active Web locale. */
export interface PresetDisplayText {
  /** Localized built-in name or the preset's own fallback name. */
  readonly name: string
  /** Localized built-in description or the preset's own description. */
  readonly description?: string
}

interface PresetLocaleKeys {
  readonly name: AgentPresetSettingsKey
  readonly description: AgentPresetSettingsKey
}

const BUILT_IN_PRESET_KEYS: Readonly<Partial<Record<string, PresetLocaleKeys>>> = {
  standard: { name: 'presetStandardName', description: 'presetStandardDescription' },
  code: { name: 'presetCodeName', description: 'presetCodeDescription' },
  minimal: { name: 'presetMinimalName', description: 'presetMinimalDescription' },
  cordis: { name: 'presetCordisName', description: 'presetCordisDescription' },
}

/**
 * Resolve preset display copy without making user-authored metadata translatable.
 * @param preset - roster row whose copy is being rendered.
 * @param t - active Web locale lookup.
 * @returns localized copy for a known shipped preset, otherwise file metadata.
 */
export function presetDisplayText(
  preset: PresetDisplaySource,
  t: (key: AgentPresetSettingsKey) => string,
): PresetDisplayText {
  const keys = preset.trust === 'system' ? BUILT_IN_PRESET_KEYS[preset.id] : undefined
  if (keys !== undefined) return { name: t(keys.name), description: t(keys.description) }
  return {
    name: preset.name ?? preset.id,
    ...preset.description === undefined ? {} : { description: preset.description },
  }
}
