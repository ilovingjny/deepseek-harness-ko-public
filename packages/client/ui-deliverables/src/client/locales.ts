/** `deliverables` namespace dictionaries. */

/** Dictionary namespace owned by this plugin. */
export const NS = 'deliverables'

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'produced.label': '产物',
  'produced.moreOne': '+ 1 个文件',
  'produced.more': '+ {count} 个文件',
  'produced.open': '打开 {name}',
  'produced.showInFolder': '在文件夹中显示',
}

/** English dictionary (same key set). */
export const en: Record<DeliverablesKey, string> = {
  'produced.label': 'Produced',
  'produced.moreOne': '+ 1 file',
  'produced.more': '+ {count} files',
  'produced.open': 'Open {name}',
  'produced.showInFolder': 'Show in folder',
}

/** Korean dictionary. */
export const ko = {
  'produced.label': '생성된 파일',
  'produced.moreOne': '+ 파일 1개',
  'produced.more': '+ 파일 {count}개',
  'produced.open': '{name} 열기',
  'produced.showInFolder': '폴더에서 보기',
} satisfies Record<DeliverablesKey, string>

/** Union of this namespace's dictionary keys. */
export type DeliverablesKey = keyof typeof zh
