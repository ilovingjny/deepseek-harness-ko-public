/** `workflowRun` namespace dictionaries. */

/** Dictionary namespace owned by this plugin. */
export const NS = 'workflowRun'

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'run.title': '{name}',
  'run.members.one': '{count} 个成员',
  'run.members.other': '{count} 个成员',
  'run.empty': '没有启动成员',
  'phase.unassigned': '未分阶段',
  'phase.empty': '空阶段名',
  'statusCount.running': '运行中 {count}',
  'statusCount.completed': '已完成 {count}',
  'statusCount.failed': '失败 {count}',
  'statusCount.cancelled': '已取消 {count}',
  'statusCount.interrupted': '已中断 {count}',
  'member.empty': '空成员名',
  'member.open': '打开 {name}',
  'status.running': '运行中',
  'status.completed': '已完成',
  'status.failed': '失败',
  'status.cancelled': '已取消',
  'status.interrupted': '已中断',
}

/** English dictionary (same key set). */
export const en: Record<WorkflowRunKey, string> = {
  'run.title': '{name}',
  'run.members.one': '{count} member',
  'run.members.other': '{count} members',
  'run.empty': 'No members started',
  'phase.unassigned': 'Unphased',
  'phase.empty': 'Empty phase name',
  'statusCount.running': 'Running {count}',
  'statusCount.completed': 'Completed {count}',
  'statusCount.failed': 'Failed {count}',
  'statusCount.cancelled': 'Cancelled {count}',
  'statusCount.interrupted': 'Interrupted {count}',
  'member.empty': 'Empty member name',
  'member.open': 'Open {name}',
  'status.running': 'Running',
  'status.completed': 'Completed',
  'status.failed': 'Failed',
  'status.cancelled': 'Cancelled',
  'status.interrupted': 'Interrupted',
}

/** Korean dictionary. */
export const ko = {
  'run.title': '{name}',
  'run.members.one': '멤버 {count}명',
  'run.members.other': '멤버 {count}명',
  'run.empty': '시작된 멤버 없음',
  'phase.unassigned': '단계 없음',
  'phase.empty': '빈 단계 이름',
  'statusCount.running': '실행 중 {count}',
  'statusCount.completed': '완료됨 {count}',
  'statusCount.failed': '실패 {count}',
  'statusCount.cancelled': '취소됨 {count}',
  'statusCount.interrupted': '중단됨 {count}',
  'member.empty': '빈 멤버 이름',
  'member.open': '{name} 열기',
  'status.running': '실행 중',
  'status.completed': '완료됨',
  'status.failed': '실패',
  'status.cancelled': '취소됨',
  'status.interrupted': '중단됨',
} satisfies Record<WorkflowRunKey, string>

/** Union of this namespace's dictionary keys. */
export type WorkflowRunKey = keyof typeof zh
