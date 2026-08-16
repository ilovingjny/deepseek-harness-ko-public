/** Shell chrome and General-nav dictionaries; feature rows own their copy. */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'trigger': '设置',
  'title': '设置',
  'close': '关闭',
  'openDocument': '打开配置文件',
  'openDocument.error': '无法打开配置文件',
  'general.nav': '通用设置',
} satisfies Record<string, string>

/** The settings namespace key union. */
export type SettingsKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'trigger': 'Settings',
  'title': 'Settings',
  'close': 'Close',
  'openDocument': 'Open configuration file',
  'openDocument.error': 'Could not open configuration file',
  'general.nav': 'General',
} satisfies Record<SettingsKey, string>

/** Korean dictionary. */
export const ko = {
  'trigger': '설정',
  'title': '설정',
  'close': '닫기',
  'openDocument': '구성 파일 열기',
  'openDocument.error': '구성 파일을 열지 못했습니다',
  'general.nav': '일반',
} satisfies Record<SettingsKey, string>
