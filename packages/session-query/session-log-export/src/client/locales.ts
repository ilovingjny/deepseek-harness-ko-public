/** Locale namespace owned by Session export browser feedback. */
export const NS = 'session-log-download'

/** Simplified-Chinese Session export strings. */
export const zh = {
  'dialog.preparingTitle': '正在导出 Session',
  'dialog.preparingDescription': '正在准备包含当前 Session、子 Session 和附件的 ZIP 文件。',
  'dialog.successTitle': 'Session 导出已开始下载',
  'dialog.successDescription': '浏览器正在下载 Session ZIP 文件。',
  'dialog.errorTitle': 'Session 导出失败',
  'dialog.close': '关闭',
  'dialog.commandFailed': '无法启动 Session 导出。',
  'action.sessionLog': 'Session 日志',
} as const

/** English Session export strings. */
export const en: Record<keyof typeof zh, string> = {
  'dialog.preparingTitle': 'Exporting Session',
  'dialog.preparingDescription': 'Preparing a ZIP containing this Session, its sub-Sessions, and attachments.',
  'dialog.successTitle': 'Session download started',
  'dialog.successDescription': 'The browser is downloading the Session ZIP.',
  'dialog.errorTitle': 'Session export failed',
  'dialog.close': 'Close',
  'dialog.commandFailed': 'Could not start the Session export.',
  'action.sessionLog': 'Session log',
}

/** Korean Session export strings. */
export const ko: Record<keyof typeof zh, string> = {
  'dialog.preparingTitle': '세션 내보내는 중',
  'dialog.preparingDescription': '현재 세션과 하위 세션, 첨부 파일을 포함한 ZIP 파일을 준비하는 중입니다.',
  'dialog.successTitle': '세션 다운로드 시작',
  'dialog.successDescription': '브라우저에서 세션 ZIP 파일을 다운로드하고 있습니다.',
  'dialog.errorTitle': '세션 내보내기 실패',
  'dialog.close': '닫기',
  'dialog.commandFailed': '세션 내보내기를 시작하지 못했습니다.',
  'action.sessionLog': '세션 로그',
}

/** Stable locale keys consumed by the shared modal. */
export type SessionLogDownloadKey = keyof typeof zh
