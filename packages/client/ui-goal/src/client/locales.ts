/** `goal` namespace dictionaries. */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'phase.active': '进行中的目标',
  'phase.paused': '已暂停的目标',
  'phase.blocked': '受阻的目标',
  'objective.aria': '目标内容',
  'commandInput.aria': '命令输入',
  'action.save': '保存目标',
  'action.cancel': '取消编辑',
  'action.pause': '暂停目标',
  'action.resume': '恢复目标',
  'action.edit': '编辑目标',
  'action.clear': '清除目标',
} satisfies Record<string, string>

/** The goal namespace key union. */
export type GoalKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'phase.active': 'Ongoing Goal',
  'phase.paused': 'Paused Goal',
  'phase.blocked': 'Blocked Goal',
  'objective.aria': 'Goal objective',
  'commandInput.aria': 'Command input',
  'action.save': 'Save goal',
  'action.cancel': 'Cancel edit',
  'action.pause': 'Pause goal',
  'action.resume': 'Resume goal',
  'action.edit': 'Edit goal',
  'action.clear': 'Clear goal',
} satisfies Record<GoalKey, string>

/** Korean dictionary. */
export const ko = {
  'phase.active': '진행 중인 목표',
  'phase.paused': '일시 중지된 목표',
  'phase.blocked': '진행이 막힌 목표',
  'objective.aria': '목표 내용',
  'commandInput.aria': '명령 입력',
  'action.save': '목표 저장',
  'action.cancel': '편집 취소',
  'action.pause': '목표 일시 중지',
  'action.resume': '목표 재개',
  'action.edit': '목표 편집',
  'action.clear': '목표 지우기',
} satisfies Record<GoalKey, string>
