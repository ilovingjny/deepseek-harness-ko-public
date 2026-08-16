/** `trajectory` namespace dictionaries (view tab label + toolbar strings). */

/** Dictionary namespace owned by this plugin. */
export const NS = 'trajectory'

/** The trajectory dictionary key set (the source of truth for both locales). */
export type TrajectoryKey =
  | 'view.trajectory'
  | 'view.step'
  | 'view.compaction'
  | 'toolbar.aria'
  | 'toolbar.duration'
  | 'toolbar.useActualDuration'
  | 'toolbar.useEqualWidth'
  | 'toolbar.actualTime'
  | 'toolbar.turns'
  | 'toolbar.expandTurns'
  | 'toolbar.collapseTurns'
  | 'toolbar.calls'
  | 'toolbar.expandCalls'
  | 'toolbar.collapseCalls'
  | 'toolbar.search'
  | 'toolbar.searchPlaceholder'
  | 'timeline.input'
  | 'timeline.model'
  | 'timeline.tools'
  | 'timeline.noTimingData'
  | 'turn.input'
  | 'turn.output'
  | 'turn.think'
  | 'turn.time'
  | 'turn.title'
  | 'table.systemPrompt'
  | 'table.tools'
  | 'table.usage'
  | 'table.payload'
  | 'table.result'
  | 'table.payloadJson'
  | 'table.resultJson'
  | 'table.toolCall'
  | 'table.toolCalls'
  | 'table.subtoolCalls'
  | 'table.toolCallOnly'
  | 'table.failed'
  | 'table.noSystemPrompt'
  | 'table.request'
  | 'table.compaction'
  | 'table.requestStep'
  | 'table.requestSteps'
  | 'table.toolCallCount'
  | 'table.toolCallCounts'
  | 'details.eventDetails'
  | 'details.resizeEventDetails'
  | 'details.status'
  | 'details.provider'
  | 'details.model'
  | 'details.error'
  | 'details.openToolCallSummary'
  | 'details.openBlockToolCallSummary'
  | 'layout.message'
  | 'layout.toolCallOnly'
  | 'layout.initialSystemPrompt'
  | 'layout.systemPromptUpdated'
  | 'layout.toolsUpdated'
  | 'layout.systemPromptAndToolsUpdated'
  | 'layout.compactionFailed'
  | 'layout.contextCompacted'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The trajectory view tab label and toolbar strings. */
    'trajectory': TrajectoryKey
  }
}

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh: Record<TrajectoryKey, string> = {
  'view.trajectory': '轨迹',
  'view.step': 'Step {step}',
  'view.compaction': 'Compaction {seq}',
  'toolbar.aria': '轨迹工具栏',
  'toolbar.duration': 'Duration',
  'toolbar.useActualDuration': 'Use actual duration',
  'toolbar.useEqualWidth': 'Use equal-width operations',
  'toolbar.actualTime': '实际时间',
  'toolbar.turns': 'Turns',
  'toolbar.expandTurns': 'Expand turns',
  'toolbar.collapseTurns': 'Collapse turns',
  'toolbar.calls': 'Calls',
  'toolbar.expandCalls': 'Expand calls',
  'toolbar.collapseCalls': 'Collapse calls',
  'toolbar.search': '搜索轨迹',
  'toolbar.searchPlaceholder': '搜索',
  'timeline.input': 'Input',
  'timeline.model': 'Model',
  'timeline.tools': 'Tools',
  'timeline.noTimingData': 'No timing data',
  'turn.input': 'Input',
  'turn.output': 'Output',
  'turn.think': 'Think',
  'turn.time': 'Time',
  'turn.title': 'Turn {turn}',
  'table.systemPrompt': 'System Prompt',
  'table.tools': 'Tools',
  'table.usage': 'Usage',
  'table.payload': 'Payload',
  'table.result': 'Result',
  'table.payloadJson': 'Payload JSON',
  'table.resultJson': 'Result JSON',
  'table.toolCall': 'Tool Call',
  'table.toolCalls': 'Tool calls',
  'table.subtoolCalls': 'Subtool calls',
  'table.toolCallOnly': '(tool call only)',
  'table.failed': 'Failed',
  'table.noSystemPrompt': 'No system prompt in this request',
  'table.request': 'Request #{number}',
  'table.compaction': 'Compaction',
  'table.requestStep': 'step',
  'table.requestSteps': 'steps',
  'table.toolCallCount': 'tool call',
  'table.toolCallCounts': 'tool calls',
  'details.eventDetails': 'Event details',
  'details.resizeEventDetails': 'Resize event details',
  'details.status': 'Status',
  'details.provider': 'Provider',
  'details.model': 'Model',
  'details.error': 'Error',
  'details.openToolCallSummary': 'Open tool call summary',
  'details.openBlockToolCallSummary': 'Open Block #{index} tool call summary',
  'layout.message': 'Message',
  'layout.toolCallOnly': 'Tool call only',
  'layout.initialSystemPrompt': 'Initial System Prompt',
  'layout.systemPromptUpdated': 'System Prompt Updated',
  'layout.toolsUpdated': 'Tools Updated',
  'layout.systemPromptAndToolsUpdated': 'System Prompt and Tools Updated',
  'layout.compactionFailed': 'Compaction failed',
  'layout.contextCompacted': 'Context compacted',
}

/** English dictionary. */
export const en: Record<TrajectoryKey, string> = {
  'view.trajectory': 'Trajectory',
  'view.step': 'Step {step}',
  'view.compaction': 'Compaction {seq}',
  'toolbar.aria': 'Trajectory toolbar',
  'toolbar.duration': 'Duration',
  'toolbar.useActualDuration': 'Use actual duration',
  'toolbar.useEqualWidth': 'Use equal-width operations',
  'toolbar.actualTime': 'Actual time',
  'toolbar.turns': 'Turns',
  'toolbar.expandTurns': 'Expand turns',
  'toolbar.collapseTurns': 'Collapse turns',
  'toolbar.calls': 'Calls',
  'toolbar.expandCalls': 'Expand calls',
  'toolbar.collapseCalls': 'Collapse calls',
  'toolbar.search': 'Search trajectory',
  'toolbar.searchPlaceholder': 'Search',
  'timeline.input': 'Input',
  'timeline.model': 'Model',
  'timeline.tools': 'Tools',
  'timeline.noTimingData': 'No timing data',
  'turn.input': 'Input',
  'turn.output': 'Output',
  'turn.think': 'Think',
  'turn.time': 'Time',
  'turn.title': 'Turn {turn}',
  'table.systemPrompt': 'System Prompt',
  'table.tools': 'Tools',
  'table.usage': 'Usage',
  'table.payload': 'Payload',
  'table.result': 'Result',
  'table.payloadJson': 'Payload JSON',
  'table.resultJson': 'Result JSON',
  'table.toolCall': 'Tool Call',
  'table.toolCalls': 'Tool calls',
  'table.subtoolCalls': 'Subtool calls',
  'table.toolCallOnly': '(tool call only)',
  'table.failed': 'Failed',
  'table.noSystemPrompt': 'No system prompt in this request',
  'table.request': 'Request #{number}',
  'table.compaction': 'Compaction',
  'table.requestStep': 'step',
  'table.requestSteps': 'steps',
  'table.toolCallCount': 'tool call',
  'table.toolCallCounts': 'tool calls',
  'details.eventDetails': 'Event details',
  'details.resizeEventDetails': 'Resize event details',
  'details.status': 'Status',
  'details.provider': 'Provider',
  'details.model': 'Model',
  'details.error': 'Error',
  'details.openToolCallSummary': 'Open tool call summary',
  'details.openBlockToolCallSummary': 'Open Block #{index} tool call summary',
  'layout.message': 'Message',
  'layout.toolCallOnly': 'Tool call only',
  'layout.initialSystemPrompt': 'Initial System Prompt',
  'layout.systemPromptUpdated': 'System Prompt Updated',
  'layout.toolsUpdated': 'Tools Updated',
  'layout.systemPromptAndToolsUpdated': 'System Prompt and Tools Updated',
  'layout.compactionFailed': 'Compaction failed',
  'layout.contextCompacted': 'Context compacted',
}

/** Korean dictionary. */
export const ko: Record<TrajectoryKey, string> = {
  'view.trajectory': '실행 경로',
  'view.step': '단계 {step}',
  'view.compaction': '컨텍스트 압축 {seq}',
  'toolbar.aria': '실행 경로 도구 모음',
  'toolbar.duration': '소요 시간',
  'toolbar.useActualDuration': '실제 소요 시간 사용',
  'toolbar.useEqualWidth': '작업을 같은 너비로 표시',
  'toolbar.actualTime': '실제 시간',
  'toolbar.turns': '턴',
  'toolbar.expandTurns': '턴 펼치기',
  'toolbar.collapseTurns': '턴 접기',
  'toolbar.calls': '호출',
  'toolbar.expandCalls': '호출 펼치기',
  'toolbar.collapseCalls': '호출 접기',
  'toolbar.search': '실행 경로 검색',
  'toolbar.searchPlaceholder': '검색',
  'timeline.input': '입력',
  'timeline.model': '모델',
  'timeline.tools': '도구',
  'timeline.noTimingData': '시간 데이터 없음',
  'turn.input': '입력',
  'turn.output': '출력',
  'turn.think': '추론',
  'turn.time': '시간',
  'turn.title': '턴 {turn}',
  'table.systemPrompt': '시스템 프롬프트',
  'table.tools': '도구',
  'table.usage': '사용량',
  'table.payload': '페이로드',
  'table.result': '결과',
  'table.payloadJson': '페이로드 JSON',
  'table.resultJson': '결과 JSON',
  'table.toolCall': '도구 호출',
  'table.toolCalls': '도구 호출',
  'table.subtoolCalls': '하위 도구 호출',
  'table.toolCallOnly': '(도구 호출만)',
  'table.failed': '실패',
  'table.noSystemPrompt': '이 요청에 시스템 프롬프트가 없습니다',
  'table.request': '요청 #{number}',
  'table.compaction': '컨텍스트 압축',
  'table.requestStep': '단계',
  'table.requestSteps': '단계',
  'table.toolCallCount': '도구 호출',
  'table.toolCallCounts': '도구 호출',
  'details.eventDetails': '이벤트 상세',
  'details.resizeEventDetails': '이벤트 상세 크기 조정',
  'details.status': '상태',
  'details.provider': '제공자',
  'details.model': '모델',
  'details.error': '오류',
  'details.openToolCallSummary': '도구 호출 요약 열기',
  'details.openBlockToolCallSummary': '블록 #{index} 도구 호출 요약 열기',
  'layout.message': '메시지',
  'layout.toolCallOnly': '도구 호출만',
  'layout.initialSystemPrompt': '초기 시스템 프롬프트',
  'layout.systemPromptUpdated': '시스템 프롬프트 업데이트됨',
  'layout.toolsUpdated': '도구 업데이트됨',
  'layout.systemPromptAndToolsUpdated': '시스템 프롬프트 및 도구 업데이트됨',
  'layout.compactionFailed': '컨텍스트 압축 실패',
  'layout.contextCompacted': '컨텍스트가 압축되었습니다',
}
