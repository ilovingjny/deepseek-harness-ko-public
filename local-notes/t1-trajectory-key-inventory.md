# T1: ui-trajectory 로케일 키 인벤토리

**카드:** A1-T1 · **날짜:** 2026-08-16 · **브랜치:** local/korean-ui
**파일:** `packages/client/ui-trajectory/src/client/locales.ts` (사전만 확장, 컴포넌트 미수정)

## 설계 원칙

- 기존 `view.*`, `toolbar.*` 패턴을 이어 도메인 접두 사용: `timeline.*`, `turn.*`, `table.*`, `details.*`, `layout.*`.
- placeholder 이름은 zh/en/ko 3개 사전 모두 동일 (`{step}`, `{seq}`, `{turn}`, `{number}`, `{index}`) — korean-coverage.spec.ts가 자동 강제.
- 복수 문구는 사전 키를 호출부에서 선택하는 방식: `table.requestStep` / `table.requestSteps`, `table.toolCallCount` / `table.toolCallCounts`.
- zh 값은 현행 하드코딩 영어 문구 유지 (업스트림 선례), en 값은 현재 화면 문구와 완전 동일.
- ko 값은 기존 ko 사전 선례 병기: 시스템 프롬프트/제공자/모델/추론/실패 등.

## 키 인벤토리

### view.*

| 키 | en (현 화면 문구) | zh | ko | placeholder | 사용처 |
|---|---|---|---|---|---|
| `view.trajectory` | Trajectory | 轨迹 | 실행 경로 | - | 기존 |
| `view.step` | Step {step} | Step {step} | 단계 {step} | {step} | `TrajectoryView.tsx:204`, `layout.ts:183,194` (그룹 라벨) |
| `view.compaction` | Compaction {seq} | Compaction {seq} | 컨텍스트 압축 {seq} | {seq} | `TrajectoryView.tsx:229` (그룹 라벨) |

### toolbar.* (기존, 무변경)

| 키 | en | zh | ko |
|---|---|---|---|
| `toolbar.aria` | Trajectory toolbar | 轨迹工具栏 | 실행 경로 도구 모음 |
| `toolbar.duration` | Duration | Duration | 소요 시간 |
| `toolbar.useActualDuration` | Use actual duration | Use actual duration | 실제 소요 시간 사용 |
| `toolbar.useEqualWidth` | Use equal-width operations | Use equal-width operations | 작업을 같은 너비로 표시 |
| `toolbar.actualTime` | Actual time | 实际时间 | 실제 시간 |
| `toolbar.turns` | Turns | Turns | 턴 |
| `toolbar.expandTurns` | Expand turns | Expand turns | 턴 펼치기 |
| `toolbar.collapseTurns` | Collapse turns | Collapse turns | 턴 접기 |
| `toolbar.calls` | Calls | Calls | 호출 |
| `toolbar.expandCalls` | Expand calls | Expand calls | 호출 펼치기 |
| `toolbar.collapseCalls` | Collapse calls | Collapse calls | 호출 접기 |
| `toolbar.search` | Search trajectory | 搜索轨迹 | 실행 경로 검색 |
| `toolbar.searchPlaceholder` | Search | 搜索 | 검색 |

### timeline.*

| 키 | en (현 화면 문구) | zh | ko | placeholder | 사용처 |
|---|---|---|---|---|---|
| `timeline.input` | Input | Input | 입력 | - | `TrajectoryTimeline.tsx:191` (레인 헤더) |
| `timeline.model` | Model | Model | 모델 | - | `TrajectoryTimeline.tsx:192` (레인 헤더) |
| `timeline.tools` | Tools | Tools | 도구 | - | `TrajectoryTimeline.tsx:193` (레인 헤더) |
| `timeline.noTimingData` | No timing data | No timing data | 시간 데이터 없음 | - | `TrajectoryTimeline.tsx:387` |

### turn.*

| 키 | en (현 화면 문구) | zh | ko | placeholder | 사용처 |
|---|---|---|---|---|---|
| `turn.input` | Input | Input | 입력 | - | `TrajectoryTurnHeader.tsx:5` (COLUMN_LABELS) |
| `turn.output` | Output | Output | 출력 | - | `TrajectoryTurnHeader.tsx:5` |
| `turn.think` | Think | Think | 추론 | - | `TrajectoryTurnHeader.tsx:5` |
| `turn.time` | Time | Time | 시간 | - | `TrajectoryTurnHeader.tsx:5` |
| `turn.title` | Turn {turn} | Turn {turn} | 턴 {turn} | {turn} | `TrajectoryTurnHeader.tsx:21` |

### table.*

| 키 | en (현 화면 문구) | zh | ko | placeholder | 사용처 |
|---|---|---|---|---|---|
| `table.systemPrompt` | System Prompt | System Prompt | 시스템 프롬프트 | - | `TrajectoryTable.tsx:210,1307` (탭 라벨/title) |
| `table.tools` | Tools | Tools | 도구 | - | `TrajectoryTable.tsx:211,1314` |
| `table.usage` | Usage | Usage | 사용량 | - | `TrajectoryTable.tsx:220` |
| `table.payload` | Payload | Payload | 페이로드 | - | `TrajectoryTable.tsx:918,1565` |
| `table.result` | Result | Result | 결과 | - | `TrajectoryTable.tsx:919,1565` |
| `table.payloadJson` | Payload JSON | Payload JSON | 페이로드 JSON | - | `TrajectoryTable.tsx:1565` |
| `table.resultJson` | Result JSON | Result JSON | 결과 JSON | - | `TrajectoryTable.tsx:1565` |
| `table.toolCall` | Tool Call | Tool Call | 도구 호출 | - | `TrajectoryTable.tsx:2959` |
| `table.toolCalls` | Tool calls | Tool calls | 도구 호출 | - | `TrajectoryTable.tsx:2737` (dt) |
| `table.subtoolCalls` | Subtool calls | Subtool calls | 하위 도구 호출 | - | `TrajectoryTable.tsx:2742` (dt) |
| `table.toolCallOnly` | (tool call only) | (tool call only) | (도구 호출만) | - | `TrajectoryTable.tsx:996,1015` |
| `table.failed` | Failed | Failed | 실패 | - | `TrajectoryTable.tsx:678` (상태 라벨) |
| `table.noSystemPrompt` | No system prompt in this request | No system prompt in this request | 이 요청에 시스템 프롬프트가 없습니다 | - | `TrajectoryTable.tsx:2839` |
| `table.request` | Request #{number} | Request #{number} | 요청 #{number} | {number} | `TrajectoryTable.tsx:2299,2621,2933` |
| `table.compaction` | Compaction | Compaction | 컨텍스트 압축 | - | `TrajectoryTable.tsx:2713` (Purpose dd), `:2299` (· Compaction) |
| `table.requestStep` | step | step | 단계 | - | `TrajectoryTable.tsx:564` (복수 선택) |
| `table.requestSteps` | steps | steps | 단계 | - | `TrajectoryTable.tsx:564` (복수 선택) |
| `table.toolCallCount` | tool call | tool call | 도구 호출 | - | `TrajectoryTable.tsx:565,624` (복수 선택) |
| `table.toolCallCounts` | tool calls | tool calls | 도구 호출 | - | `TrajectoryTable.tsx:565,624` (복수 선택) |

### details.*

| 키 | en (현 화면 문구) | zh | ko | placeholder | 사용처 |
|---|---|---|---|---|---|
| `details.eventDetails` | Event details | Event details | 이벤트 상세 | - | `TrajectoryTable.tsx:2535,2672` (aria-label) |
| `details.resizeEventDetails` | Resize event details | Resize event details | 이벤트 상세 크기 조정 | - | `TrajectoryTable.tsx:2541` (aria-label) |
| `details.status` | Status | Status | 상태 | - | `TrajectoryTable.tsx:2705,2859,2970` (dt) |
| `details.provider` | Provider | Provider | 제공자 | - | `TrajectoryTable.tsx:2719` (dt) |
| `details.model` | Model | Model | 모델 | - | `TrajectoryTable.tsx:2729` (dt) |
| `details.openToolCallSummary` | Open tool call summary | Open tool call summary | 도구 호출 요약 열기 | - | `TrajectoryTable.tsx:1072,1161` (title) |
| `details.openBlockToolCallSummary` | Open Block #{index} tool call summary | Open Block #{index} tool call summary | 블록 #{index} 도구 호출 요약 열기 | {index} | `TrajectoryTable.tsx:1071` (aria-label) |

### layout.*

| 키 | en (현 화면 문구) | zh | ko | placeholder | 사용처 |
|---|---|---|---|---|---|
| `layout.message` | Message | Message | 메시지 | - | `layout.ts:174,178` (그룹 타이틀) |
| `layout.toolCallOnly` | Tool call only | Tool call only | 도구 호출만 | - | `layout.ts:766`, `TrajectoryTable.tsx:1428` |
| `layout.initialSystemPrompt` | Initial System Prompt | Initial System Prompt | 초기 시스템 프롬프트 | - | `layout.ts:772` |
| `layout.systemPromptUpdated` | System Prompt Updated | System Prompt Updated | 시스템 프롬프트 업데이트됨 | - | `layout.ts:773` |
| `layout.toolsUpdated` | Tools Updated | Tools Updated | 도구 업데이트됨 | - | `layout.ts:774` |
| `layout.systemPromptAndToolsUpdated` | System Prompt and Tools Updated | System Prompt and Tools Updated | 시스템 프롬프트 및 도구 업데이트됨 | - | `layout.ts:775` |
| `layout.compactionFailed` | Compaction failed | Compaction failed | 컨텍스트 압축 실패 | - | `layout.ts:314` |
| `layout.contextCompacted` | Context compacted | Context compacted | 컨텍스트가 압축되었습니다 | - | `layout.ts:316` |

## 설계 결정 기록

1. **복수 문구 키 분리**: `step/steps`, `tool call/tool calls`는 로케일 런타임 복수 규칙이 없으므로 단/복수 키를 나누고 호출부에서 선택한다 (계획서 T1 지침).
2. **센티널 문구 `Tool call only` 주의**: `layout.ts:766`의 `'Tool call only'`와 `TrajectoryTable.tsx:964`의 `cell.text === 'Tool call only'` 비교는 **로직 센티널**이다. 이 카드(T1)는 사전 키만 추가했고 컴포넌트는 미수정이므로 기존 `===` 비교는 그대로 유지된다. T5에서 구조 전환 시 `layout.toolCallOnly` 키를 사용한다.
3. **`table.toolCallOnly` (괄호 포함) vs `layout.toolCallOnly` (괄호 없음)**: 화면에 괄호 형태 `(tool call only)`로 표시되는 곳(`TrajectoryTable.tsx:996,1015`)과 센티널/단독 표시(`layout.ts:766`, `TrajectoryTable.tsx:1428`)가 달라 키를 분리했다.
4. **zh 값 영어 유지**: 포크 diff 최소화를 위해 신규 키의 zh 값은 현행 하드코딩 영어 문구를 그대로 사용 (계획서 허용, 업스트림 zh 사전 선례).
5. **`turn.title`/`table.request`/`view.step`/`view.compaction`/`details.openBlockToolCallSummary`** placeholder는 zh/en/ko 동일 이름 사용 → korean-coverage.spec.ts 자동 검증 통과 확인.

## 검증 결과

| 게이트 | 명령 | 결과 |
|---|---|---|
| 로케일+ui-trajectory 테스트 | `pnpm vitest run packages/client/locale/tests packages/client/ui-trajectory` | ✅ 146 passed, 3 skipped |
| typecheck | `pnpm run typecheck` | ✅ 통과 |

- GUI 스냅샷 무변경: 컴포넌트 코드 미수정 (사전만 확장) — 테스트가 이를 포함해 전부 통과.
- korean-coverage.spec.ts는 `locales.ts`를 동적 스캔하므로 신규 키가 zh/en/ko 일치 검사에 자동 포함됨 (갱신 불필요 판정, 계획서 T6 지침과 일치).
