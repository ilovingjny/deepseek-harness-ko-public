/** `question` namespace dictionaries. */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'error.incomplete': '请先完成这道问题。',
  'error.unanswered': '请选择一个选项或填写自定义答案。',
  'nav.prev': '上一题',
  'nav.next': '下一题',
  'nav.cancel': '放弃整组问题',
  'option.recommended': '推荐',
  'custom.placeholder': '输入你的答案',
  'action.skip': '跳过本题',
  'action.next': '下一题',
  'plan.header': '计划待审',
  'plan.approve': '确认执行',
  'plan.decline': '拒绝',
  'plan.discuss': '去聊天里说',
} satisfies Record<string, string>

/** The question namespace key union. */
export type QuestionKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'error.incomplete': 'Please complete this question first.',
  'error.unanswered': 'Please select an option or enter a custom answer.',
  'nav.prev': 'Previous question',
  'nav.next': 'Next question',
  'nav.cancel': 'Dismiss all questions',
  'option.recommended': 'Recommended',
  'custom.placeholder': 'Type your answer',
  'action.skip': 'Skip this question',
  'action.next': 'Next',
  'plan.header': 'Plan review',
  'plan.approve': 'Approve',
  'plan.decline': 'Refuse',
  'plan.discuss': 'Chat about it',
} satisfies Record<QuestionKey, string>

/** Korean dictionary. */
export const ko = {
  'error.incomplete': '먼저 이 질문에 답해 주세요.',
  'error.unanswered': '옵션을 선택하거나 직접 답을 입력해 주세요.',
  'nav.prev': '이전 질문',
  'nav.next': '다음 질문',
  'nav.cancel': '모든 질문 닫기',
  'option.recommended': '추천',
  'custom.placeholder': '답을 입력하세요',
  'action.skip': '이 질문 건너뛰기',
  'action.next': '다음',
  'plan.header': '계획 검토',
  'plan.approve': '승인',
  'plan.decline': '거부',
  'plan.discuss': '채팅에서 논의',
} satisfies Record<QuestionKey, string>
