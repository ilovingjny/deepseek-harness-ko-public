/** `feedback` namespace dictionaries. */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'action.like': '好的回答',
  'action.likeActive': '取消标记',
  'action.dislike': '有问题的回答',
  'action.dislikeActive': '取消标记',
  'note.open': '补充说明',
  'note.placeholder': '这条回答哪里好，或哪里有问题？（可选）',
  'note.save': '保存',
  'note.cancel': '取消',
  'note.aria': '反馈说明',
  'error.conflict': '这条反馈已在别处改动，已显示最新状态',
  'error.load': '反馈状态加载失败',
  'error.generic': '反馈保存失败',
} satisfies Record<string, string>

/** The feedback namespace key union. */
export type MessageFeedbackKey = keyof typeof zh

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The per-message feedback controls' copy. */
    feedback: MessageFeedbackKey
  }
}

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'action.like': 'Good response',
  'action.likeActive': 'Remove rating',
  'action.dislike': 'Bad response',
  'action.dislikeActive': 'Remove rating',
  'note.open': 'Add a note',
  'note.placeholder': 'What was good, or what went wrong? (optional)',
  'note.save': 'Save',
  'note.cancel': 'Cancel',
  'note.aria': 'Feedback note',
  'error.conflict': 'This feedback changed elsewhere; the latest state is shown',
  'error.load': 'Could not load feedback',
  'error.generic': 'Could not save feedback',
} satisfies Record<MessageFeedbackKey, string>

/** Korean dictionary. */
export const ko = {
  'action.like': '좋은 답변',
  'action.likeActive': '평가 취소',
  'action.dislike': '문제 있는 답변',
  'action.dislikeActive': '평가 취소',
  'note.open': '메모 추가',
  'note.placeholder': '무엇이 좋았거나 문제가 있었나요? (선택 사항)',
  'note.save': '저장',
  'note.cancel': '취소',
  'note.aria': '피드백 메모',
  'error.conflict': '이 피드백이 다른 곳에서 변경되었습니다. 최신 상태를 표시합니다.',
  'error.load': '피드백을 불러오지 못했습니다',
  'error.generic': '피드백을 저장하지 못했습니다',
} satisfies Record<MessageFeedbackKey, string>
