/** `plan` namespace dictionaries (the composer plan chip's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'chip.on.aria': 'plan mode 已开启，按下关闭',
  'chip.on.title': 'plan mode 已开启 — 点击关闭（/plan off）',
  'chip.off.aria': 'plan mode 已关闭，按下开启',
  'chip.off.title': 'plan mode 已关闭 — 点击开启（/plan）',
  'chip.exitFailed': '退出计划模式失败',
} satisfies Record<string, string>

/** The plan namespace key union. */
export type PlanKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'chip.on.aria': 'Plan mode on, press to turn off',
  'chip.on.title': 'Plan mode on — click to turn off (/plan off)',
  'chip.off.aria': 'Plan mode off, press to turn on',
  'chip.off.title': 'Plan mode off — click to turn on (/plan)',
  'chip.exitFailed': 'Failed to exit plan mode',
} satisfies Record<PlanKey, string>

/** Korean dictionary. */
export const ko = {
  'chip.on.aria': '계획 모드 켜짐, 눌러서 끄기',
  'chip.on.title': '계획 모드 켜짐 — 클릭해서 끄기 (/plan off)',
  'chip.off.aria': '계획 모드 꺼짐, 눌러서 켜기',
  'chip.off.title': '계획 모드 꺼짐 — 클릭해서 켜기 (/plan)',
  'chip.exitFailed': '계획 모드를 종료하지 못했습니다',
} satisfies Record<PlanKey, string>
