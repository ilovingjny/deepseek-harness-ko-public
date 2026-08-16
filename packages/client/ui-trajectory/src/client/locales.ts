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
  | 'timeline.loadEarlierHistory'
  | 'timeline.loadingEarlierHistory'
  | 'timeline.clickToLoadEarlierHistory'
  | 'timeline.loadingEarlierHistoryStatus'
  | 'timeline.overviewAria'
  | 'timeline.aria'
  | 'turn.input'
  | 'turn.output'
  | 'turn.think'
  | 'turn.thinking'
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
  | 'table.summary'
  | 'table.options'
  | 'table.timing'
  | 'table.schema'
  | 'table.diff'
  | 'table.preview'
  | 'table.raw'
  | 'table.rawOutput'
  | 'table.source'
  | 'table.pending'
  | 'table.completed'
  | 'table.betweenTurns'
  | 'table.noContent'
  | 'table.noTools'
  | 'table.ariaCollapsedSummary'
  | 'table.ariaRequestOnly'
  | 'table.ariaRow'
  | 'details.eventDetails'
  | 'details.resizeEventDetails'
  | 'details.status'
  | 'details.provider'
  | 'details.model'
  | 'details.error'
  | 'details.openToolCallSummary'
  | 'details.openBlockToolCallSummary'
  | 'details.notAvailable'
  | 'details.showLocalTime'
  | 'details.showUnixTimestamp'
  | 'details.notRecorded'
  | 'details.stepStartUnavailable'
  | 'details.firstTokenUnavailable'
  | 'details.usageUnavailable'
  | 'details.outputTokensUnavailable'
  | 'details.durationTooShort'
  | 'details.started'
  | 'details.duration'
  | 'details.totalDuration'
  | 'details.generation'
  | 'details.throughput'
  | 'details.usageNotReported'
  | 'details.optionsNotRecorded'
  | 'details.sourceNotRecorded'
  | 'details.timingSource'
  | 'details.sessionTimestamps'
  | 'details.sessionTimestampsRunning'
  | 'details.schemaUnavailable'
  | 'details.requestTiming'
  | 'details.parameters'
  | 'details.parametersJson'
  | 'details.tokens'
  | 'details.reasoning'
  | 'details.content'
  | 'details.input'
  | 'details.cached'
  | 'details.cacheCreated'
  | 'details.other'
  | 'details.output'
  | 'details.thisRequest'
  | 'details.sessionCumulative'
  | 'details.requestOptionsJson'
  | 'details.messageSourceJson'
  | 'details.unknown'
  | 'details.user'
  | 'details.plugin'
  | 'details.goal'
  | 'details.pluginWithName'
  | 'details.goalWithRound'
  | 'details.openImage'
  | 'details.noPayloadCaptured'
  | 'details.noResultCaptured'
  | 'details.noOutput'
  | 'details.closeDetails'
  | 'details.purpose'
  | 'details.retry'
  | 'details.retryDelay'
  | 'details.scheduledRetry'
  | 'details.ofMaxRetries'
  | 'details.compacted'
  | 'details.assistantMessage'
  | 'details.hierarchy'
  | 'details.dragToResize'
  | 'layout.message'
  | 'layout.toolCallOnly'
  | 'layout.initialSystemPrompt'
  | 'layout.systemPromptUpdated'
  | 'layout.toolsUpdated'
  | 'layout.systemPromptAndToolsUpdated'
  | 'layout.compactingContext'
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
  'timeline.loadEarlierHistory': 'Load earlier history',
  'timeline.loadingEarlierHistory': 'Loading earlier history…',
  'timeline.clickToLoadEarlierHistory': 'Click to load earlier history',
  'timeline.loadingEarlierHistoryStatus': 'Loading earlier history',
  'timeline.overviewAria': 'Timeline overview; drag horizontally to focus events',
  'timeline.aria': 'Trajectory timeline',
  'turn.input': 'Input',
  'turn.output': 'Output',
  'turn.think': 'Think',
  'turn.thinking': 'Thinking',
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
  'table.summary': 'Summary',
  'table.options': 'Options',
  'table.timing': 'Timing',
  'table.schema': 'Schema',
  'table.diff': 'Diff',
  'table.preview': 'Preview',
  'table.raw': 'Raw',
  'table.rawOutput': 'Raw Output',
  'table.source': 'Source',
  'table.pending': 'Pending',
  'table.completed': 'Completed',
  'table.betweenTurns': 'Between turns',
  'table.noContent': 'No content',
  'table.noTools': 'No tools in this request',
  'table.ariaCollapsedSummary': 'Collapsed {kind} summary, {summary}',
  'table.ariaRequestOnly': 'Request {number}, compaction',
  'table.ariaRow': '{request}{kind}, {content}',
  'details.eventDetails': 'Event details',
  'details.resizeEventDetails': 'Resize event details',
  'details.status': 'Status',
  'details.provider': 'Provider',
  'details.model': 'Model',
  'details.error': 'Error',
  'details.openToolCallSummary': 'Open tool call summary',
  'details.openBlockToolCallSummary': 'Open Block #{index} tool call summary',
  'details.notAvailable': 'Not available',
  'details.showLocalTime': 'Show local time',
  'details.showUnixTimestamp': 'Show Unix timestamp',
  'details.notRecorded': 'Not recorded',
  'details.stepStartUnavailable': 'Step start unavailable',
  'details.firstTokenUnavailable': 'First token unavailable',
  'details.usageUnavailable': 'Usage unavailable',
  'details.outputTokensUnavailable': 'Output tokens unavailable',
  'details.durationTooShort': 'Duration too short',
  'details.started': 'Started',
  'details.duration': 'Duration',
  'details.totalDuration': 'Total duration',
  'details.generation': 'Generation',
  'details.throughput': 'Throughput',
  'details.usageNotReported': 'Usage not reported',
  'details.optionsNotRecorded': 'Options not recorded',
  'details.sourceNotRecorded': 'Source not recorded',
  'details.timingSource': 'Timing source',
  'details.sessionTimestamps': 'Session timestamps',
  'details.sessionTimestampsRunning': 'Session timestamps (running)',
  'details.schemaUnavailable': 'Schema unavailable',
  'details.requestTiming': 'Request Timing',
  'details.parameters': 'Parameters',
  'details.parametersJson': 'parameters JSON',
  'details.tokens': 'Tokens',
  'details.reasoning': 'Reasoning',
  'details.content': 'Content',
  'details.input': 'Input',
  'details.cached': 'Cached',
  'details.cacheCreated': 'Cache created',
  'details.other': 'Other',
  'details.output': 'Output',
  'details.thisRequest': 'This request',
  'details.sessionCumulative': 'Session cumulative',
  'details.requestOptionsJson': 'Request options JSON',
  'details.messageSourceJson': 'Message source JSON',
  'details.unknown': 'Unknown',
  'details.user': 'User',
  'details.plugin': 'Plugin',
  'details.goal': 'Goal',
  'details.pluginWithName': 'Plugin · {plugin}',
  'details.goalWithRound': 'Goal · Round {round}',
  'details.openImage': 'Open image',
  'details.noPayloadCaptured': 'No payload captured',
  'details.noResultCaptured': 'No result captured',
  'details.noOutput': 'No output',
  'details.closeDetails': 'Close details',
  'details.purpose': 'Purpose',
  'details.retry': 'Retry',
  'details.retryDelay': 'Retry delay',
  'details.scheduledRetry': 'Scheduled {retry}',
  'details.ofMaxRetries': ' of {max}',
  'details.compacted': 'Compacted',
  'details.assistantMessage': 'Assistant Message',
  'details.hierarchy': 'Hierarchy',
  'details.dragToResize': 'Drag to resize. Double-click to reset.',
  'layout.message': 'Message',
  'layout.toolCallOnly': 'Tool call only',
  'layout.initialSystemPrompt': 'Initial System Prompt',
  'layout.systemPromptUpdated': 'System Prompt Updated',
  'layout.toolsUpdated': 'Tools Updated',
  'layout.systemPromptAndToolsUpdated': 'System Prompt and Tools Updated',
  'layout.compactingContext': 'Compacting context…',
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
  'timeline.loadEarlierHistory': 'Load earlier history',
  'timeline.loadingEarlierHistory': 'Loading earlier history…',
  'timeline.clickToLoadEarlierHistory': 'Click to load earlier history',
  'timeline.loadingEarlierHistoryStatus': 'Loading earlier history',
  'timeline.overviewAria': 'Timeline overview; drag horizontally to focus events',
  'timeline.aria': 'Trajectory timeline',
  'turn.input': 'Input',
  'turn.output': 'Output',
  'turn.think': 'Think',
  'turn.thinking': 'Thinking',
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
  'table.summary': 'Summary',
  'table.options': 'Options',
  'table.timing': 'Timing',
  'table.schema': 'Schema',
  'table.diff': 'Diff',
  'table.preview': 'Preview',
  'table.raw': 'Raw',
  'table.rawOutput': 'Raw Output',
  'table.source': 'Source',
  'table.pending': 'Pending',
  'table.completed': 'Completed',
  'table.betweenTurns': 'Between turns',
  'table.noContent': 'No content',
  'table.noTools': 'No tools in this request',
  'table.ariaCollapsedSummary': 'Collapsed {kind} summary, {summary}',
  'table.ariaRequestOnly': 'Request {number}, compaction',
  'table.ariaRow': '{request}{kind}, {content}',
  'details.eventDetails': 'Event details',
  'details.resizeEventDetails': 'Resize event details',
  'details.status': 'Status',
  'details.provider': 'Provider',
  'details.model': 'Model',
  'details.error': 'Error',
  'details.openToolCallSummary': 'Open tool call summary',
  'details.openBlockToolCallSummary': 'Open Block #{index} tool call summary',
  'details.notAvailable': 'Not available',
  'details.showLocalTime': 'Show local time',
  'details.showUnixTimestamp': 'Show Unix timestamp',
  'details.notRecorded': 'Not recorded',
  'details.stepStartUnavailable': 'Step start unavailable',
  'details.firstTokenUnavailable': 'First token unavailable',
  'details.usageUnavailable': 'Usage unavailable',
  'details.outputTokensUnavailable': 'Output tokens unavailable',
  'details.durationTooShort': 'Duration too short',
  'details.started': 'Started',
  'details.duration': 'Duration',
  'details.totalDuration': 'Total duration',
  'details.generation': 'Generation',
  'details.throughput': 'Throughput',
  'details.usageNotReported': 'Usage not reported',
  'details.optionsNotRecorded': 'Options not recorded',
  'details.sourceNotRecorded': 'Source not recorded',
  'details.timingSource': 'Timing source',
  'details.sessionTimestamps': 'Session timestamps',
  'details.sessionTimestampsRunning': 'Session timestamps (running)',
  'details.schemaUnavailable': 'Schema unavailable',
  'details.requestTiming': 'Request Timing',
  'details.parameters': 'Parameters',
  'details.parametersJson': 'parameters JSON',
  'details.tokens': 'Tokens',
  'details.reasoning': 'Reasoning',
  'details.content': 'Content',
  'details.input': 'Input',
  'details.cached': 'Cached',
  'details.cacheCreated': 'Cache created',
  'details.other': 'Other',
  'details.output': 'Output',
  'details.thisRequest': 'This request',
  'details.sessionCumulative': 'Session cumulative',
  'details.requestOptionsJson': 'Request options JSON',
  'details.messageSourceJson': 'Message source JSON',
  'details.unknown': 'Unknown',
  'details.user': 'User',
  'details.plugin': 'Plugin',
  'details.goal': 'Goal',
  'details.pluginWithName': 'Plugin · {plugin}',
  'details.goalWithRound': 'Goal · Round {round}',
  'details.openImage': 'Open image',
  'details.noPayloadCaptured': 'No payload captured',
  'details.noResultCaptured': 'No result captured',
  'details.noOutput': 'No output',
  'details.closeDetails': 'Close details',
  'details.purpose': 'Purpose',
  'details.retry': 'Retry',
  'details.retryDelay': 'Retry delay',
  'details.scheduledRetry': 'Scheduled {retry}',
  'details.ofMaxRetries': ' of {max}',
  'details.compacted': 'Compacted',
  'details.assistantMessage': 'Assistant Message',
  'details.hierarchy': 'Hierarchy',
  'details.dragToResize': 'Drag to resize. Double-click to reset.',
  'layout.message': 'Message',
  'layout.toolCallOnly': 'Tool call only',
  'layout.initialSystemPrompt': 'Initial System Prompt',
  'layout.systemPromptUpdated': 'System Prompt Updated',
  'layout.toolsUpdated': 'Tools Updated',
  'layout.systemPromptAndToolsUpdated': 'System Prompt and Tools Updated',
  'layout.compactingContext': 'Compacting context…',
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
  'timeline.loadEarlierHistory': '이전 기록 불러오기',
  'timeline.loadingEarlierHistory': '이전 기록 불러오는 중…',
  'timeline.clickToLoadEarlierHistory': '클릭하여 이전 기록 불러오기',
  'timeline.loadingEarlierHistoryStatus': '이전 기록 불러오는 중',
  'timeline.overviewAria': '타임라인 개요; 이벤트에 초점을 맞추려면 가로로 드래그',
  'timeline.aria': '실행 경로 타임라인',
  'turn.input': '입력',
  'turn.output': '출력',
  'turn.think': '추론',
  'turn.thinking': '추론 중',
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
  'table.summary': '요약',
  'table.options': '옵션',
  'table.timing': '시간',
  'table.schema': '스키마',
  'table.diff': '변경 사항',
  'table.preview': '미리보기',
  'table.raw': '원본',
  'table.rawOutput': '원본 출력',
  'table.source': '소스',
  'table.pending': '대기 중',
  'table.completed': '완료',
  'table.betweenTurns': '턴 사이',
  'table.noContent': '내용 없음',
  'table.noTools': '이 요청에 도구가 없습니다',
  'table.ariaCollapsedSummary': '접힌 {kind} 요약, {summary}',
  'table.ariaRequestOnly': '요청 {number}, 컨텍스트 압축',
  'table.ariaRow': '{request}{kind}, {content}',
  'details.eventDetails': '이벤트 상세',
  'details.resizeEventDetails': '이벤트 상세 크기 조정',
  'details.status': '상태',
  'details.provider': '제공자',
  'details.model': '모델',
  'details.error': '오류',
  'details.openToolCallSummary': '도구 호출 요약 열기',
  'details.openBlockToolCallSummary': '블록 #{index} 도구 호출 요약 열기',
  'details.notAvailable': '사용할 수 없음',
  'details.showLocalTime': '로컬 시간 표시',
  'details.showUnixTimestamp': 'Unix 타임스탬프 표시',
  'details.notRecorded': '기록되지 않음',
  'details.stepStartUnavailable': '단계 시작 시간 없음',
  'details.firstTokenUnavailable': '첫 토큰 시간 없음',
  'details.usageUnavailable': '사용량 없음',
  'details.outputTokensUnavailable': '출력 토큰 없음',
  'details.durationTooShort': '소요 시간이 너무 짧음',
  'details.started': '시작',
  'details.duration': '소요 시간',
  'details.totalDuration': '총 소요 시간',
  'details.generation': '생성',
  'details.throughput': '처리량',
  'details.usageNotReported': '사용량이 보고되지 않음',
  'details.optionsNotRecorded': '옵션이 기록되지 않음',
  'details.sourceNotRecorded': '소스가 기록되지 않음',
  'details.timingSource': '시간 출처',
  'details.sessionTimestamps': '세션 타임스탬프',
  'details.sessionTimestampsRunning': '세션 타임스탬프 (진행 중)',
  'details.schemaUnavailable': '스키마 없음',
  'details.requestTiming': '요청 시간',
  'details.parameters': '매개변수',
  'details.parametersJson': '매개변수 JSON',
  'details.tokens': '토큰',
  'details.reasoning': '추론',
  'details.content': '내용',
  'details.input': '입력',
  'details.cached': '캐시됨',
  'details.cacheCreated': '캐시 생성됨',
  'details.other': '기타',
  'details.output': '출력',
  'details.thisRequest': '이 요청',
  'details.sessionCumulative': '세션 누적',
  'details.requestOptionsJson': '요청 옵션 JSON',
  'details.messageSourceJson': '메시지 소스 JSON',
  'details.unknown': '알 수 없음',
  'details.user': '사용자',
  'details.plugin': '플러그인',
  'details.goal': '목표',
  'details.pluginWithName': '플러그인 · {plugin}',
  'details.goalWithRound': '목표 · 라운드 {round}',
  'details.openImage': '이미지 열기',
  'details.noPayloadCaptured': '페이로드가 캡처되지 않음',
  'details.noResultCaptured': '결과가 캡처되지 않음',
  'details.noOutput': '출력 없음',
  'details.closeDetails': '상세 닫기',
  'details.purpose': '용도',
  'details.retry': '재시도',
  'details.retryDelay': '재시도 지연',
  'details.scheduledRetry': '재시도 예약: {retry}',
  'details.ofMaxRetries': ' / {max}',
  'details.compacted': '압축됨',
  'details.assistantMessage': '어시스턴트 메시지',
  'details.hierarchy': '계층',
  'details.dragToResize': '드래그하여 크기 조정. 더블 클릭하여 초기화.',
  'layout.message': '메시지',
  'layout.toolCallOnly': '도구 호출만',
  'layout.initialSystemPrompt': '초기 시스템 프롬프트',
  'layout.systemPromptUpdated': '시스템 프롬프트 업데이트됨',
  'layout.toolsUpdated': '도구 업데이트됨',
  'layout.systemPromptAndToolsUpdated': '시스템 프롬프트 및 도구 업데이트됨',
  'layout.compactingContext': '컨텍스트 압축 중…',
  'layout.compactionFailed': '컨텍스트 압축 실패',
  'layout.contextCompacted': '컨텍스트가 압축되었습니다',
}
