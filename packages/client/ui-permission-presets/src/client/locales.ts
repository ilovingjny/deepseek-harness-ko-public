/** `settings.permission` namespace dictionaries (the Permission row's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'title': '权限',
  'description': '选择新会话的默认权限模式',
  'loading': '加载中',
  'unavailable': '不可用',
  'confirm.title': '确认启用 Full access？',
  'confirm.description': '启用 Full access 后，新会话将减少确认步骤，并且可以直接执行更多操作，包括敏感操作、文件修改或外部命令。仅建议在你信任后续任务时使用。',
  'confirm.acknowledge': '我已了解风险，并愿意继续',
  'confirm.cancel': '取消',
  'confirm.enable': '启用 Full access',
} satisfies Record<string, string>

/** The settings.permission namespace key union. */
export type PermissionSettingsKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'title': 'Permission',
  'description': 'Choose the default permission mode for new sessions',
  'loading': 'Loading',
  'unavailable': 'Unavailable',
  'confirm.title': 'Enable Full access?',
  'confirm.description': 'Full access lets new sessions reduce confirmation steps and perform more actions directly, including sensitive operations, file changes, or external commands. Only use it when you trust subsequent tasks.',
  'confirm.acknowledge': 'I understand the risks and want to continue',
  'confirm.cancel': 'Cancel',
  'confirm.enable': 'Enable Full access',
} satisfies Record<PermissionSettingsKey, string>

/** Korean dictionary. */
export const ko = {
  'title': '권한',
  'description': '새 세션의 기본 권한 모드 선택',
  'loading': '불러오는 중',
  'unavailable': '사용할 수 없음',
  'confirm.title': 'Full access를 사용하시겠습니까?',
  'confirm.description': 'Full access를 사용하면 새 세션에서 확인 절차가 줄고, 민감한 작업이나 파일 수정, 외부 명령을 포함한 더 많은 작업을 직접 실행할 수 있습니다. 이후 작업을 신뢰할 수 있을 때만 사용하세요.',
  'confirm.acknowledge': '위험을 이해했으며 계속 진행합니다',
  'confirm.cancel': '취소',
  'confirm.enable': 'Full access 사용',
} satisfies Record<PermissionSettingsKey, string>

/** Simplified Chinese dictionary for the current-session popup gate. */
export const accessZh = {
  'confirm.title': '确认启用 Full access？',
  'confirm.description': '启用 Full access 后，agent 将减少确认步骤，并且可以直接执行更多操作，包括敏感操作、文件修改或外部命令。仅建议在你信任当前任务时使用。',
  'confirm.acknowledge': '我已了解风险，并愿意继续',
  'confirm.cancel': '取消',
  'confirm.enable': '启用 Full access',
} satisfies Record<string, string>

/** Current-session popup-gate key union. */
export type PermissionAccessKey = keyof typeof accessZh

/** English dictionary for the current-session popup gate. */
export const accessEn = {
  'confirm.title': 'Enable Full access?',
  'confirm.description': 'Full access reduces confirmation steps and lets the agent perform more actions directly, including sensitive operations, file changes, or external commands. Only use it when you trust the current task.',
  'confirm.acknowledge': 'I understand the risks and want to continue',
  'confirm.cancel': 'Cancel',
  'confirm.enable': 'Enable Full access',
} satisfies Record<PermissionAccessKey, string>

/** Korean dictionary for the current-session popup gate. */
export const accessKo = {
  'confirm.title': 'Full access를 사용하시겠습니까?',
  'confirm.description': 'Full access를 사용하면 확인 절차가 줄고 에이전트가 민감한 작업이나 파일 수정, 외부 명령을 포함한 더 많은 작업을 직접 실행할 수 있습니다. 현재 작업을 신뢰할 수 있을 때만 사용하세요.',
  'confirm.acknowledge': '위험을 이해했으며 계속 진행합니다',
  'confirm.cancel': '취소',
  'confirm.enable': 'Full access 사용',
} satisfies Record<PermissionAccessKey, string>
