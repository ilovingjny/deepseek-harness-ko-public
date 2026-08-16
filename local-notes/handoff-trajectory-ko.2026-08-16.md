# Handoff — Trajectory 한국어 번역 전체 게이트·브라우저 실검증 (2026-08-16)

브랜치: `local/korean-ui` · 저장소: `/home/yulsol/work/deepseek-harness-ko` (Linux 서버)
비공개 원격: `origin` = `https://github.com/ilovingjny/deepseek-harness-ko-private.git` (이번 세션 push 없음)

## 한 줄 요약

ui-trajectory 정적 영어 문구 번역(T1~T5)에 이어 T6 전체 게이트를 실행하고, 클나영 리뷰(CONDITIONAL-PASS, BLOCKER 0)의 W2/W3/W4/W6을 이번 카드에서 반영했다. navigation-panes 골든 갱신 포함. 전체 게이트 중 test:gui·test:web에서 이 서버 환경 한정 실패(샌드박스 백엔드 불가·부하·shiki lazy 로드 타임아웃)가 있으며, 이번 변경과 무관함을 아래에 증거와 함께 기록한다.

## 게이트 결과 (전수)

| 게이트 | 명령 | 결과 |
|---|---|---|
| 로케일+ui-trajectory | `pnpm vitest run packages/client/locale/tests packages/client/ui-trajectory` | **147 passed, 3 skipped** (W6 테스트 1건 추가로 기존 146→147) |
| korean-coverage | `pnpm vitest run packages/client/locale/tests/korean-coverage.spec.ts` | **4 passed** |
| 타입·린트·문서 | `pnpm run typecheck && pnpm run lint && pnpm run doc-sync` | **전부 그린** (doc-sync 28 passed) |
| GUI | `pnpm run test:gui` | **3761 passed, 4 skipped + 환경 한정 실패 1건** (아래 §환경 한정 실패) |
| 웹 replay | `DSH_SNAPSHOT=replay pnpm run test:web` | **238 passed, 15 skipped + 환경 한정 실패 15건** (아래 §환경 한정 실패) |

### 환경 한정 실패 (이번 변경과 무관 — 근거 포함)

**test:gui — code-block.client.spec.tsx 1건**
- 실패: `highlightToHtml > lazily loads every read-card grammar: plain first, highlighted after load` — `vi.waitFor(..., { timeout: 5_000 })` 타임아웃 초과.
- 재현: 전체 스위트 실행 5회 연속 실패(5195~6679ms), **단독 실행 통과(4.52s)**. `--maxWorkers=1`로도 동일 실패 → 워커 경쟁 아님.
- 근거: `packages/client/ui-primitives`는 이번 브랜치에서 변경 0건(`git diff 968eab4187..HEAD` 확인). shiki grammar 23개 lazy 동적 import가 4코어 상시 부하(load≈4, binance bot·gateway 상주)에서 5초를 넘김. **부하/하드웨어 의존 환경 한정 실패로 판정**, 실패 출력은 그대로 기록됨.

**test:web — 15건 (11개 파일)**
1. **샌드박스 백엔드 불가 (근원 4개 파일)**: code-mode-round(2), replay-round-trip(3), minimal-preset.snapshot(1), chat-continuous-conversation(2)
   - 공통 에러: `sandbox mode "workspace-write" is requested but no sandbox backend is usable on this host; refusing to run the command unconfined.`
   - 근거: `/usr/bin/bwrap` 존재하나 `bwrap: setting up uid map: Permission denied` (unprivileged userns 불가), `/proc/filesystems`에 `landlock` 없음, sudo 암호 필요(권한 없음). chat-continuous의 `fixture not fully consumed (5/14)`는 샌드박스 실패로 대화 흐름이 중단된 부수 효과.
2. **부하/타이밍 (나머지)**: background-job-list(2), goal-multi-turn-actions(1), turn-tail-actions(1), chat-scroll-contract(2), approval-composer(1), shipped-composition(1)
   - 4코어 서버 상시 부하에서 e2e 타임아웃·경합(18s 스크롤 계약, 29s 승인 등). 이전 맥북 실행(254 passed)과 다른 환경 특성.
- 이번 변경(ui-trajectory 로케일)과 무관: 실패 파일들이 사용하는 코드(sandbox-local, workflow, code-mode, chat-scroll)는 이번 diff에 포함되지 않음. **이번 변경 관련 e2e 2건(navigation-panes, trajectory-virtualization)은 단독 재실행으로 모두 그린.**

## 클나영 리뷰 반영 현황 (diff 4c3474416b..d9e82691ba, CONDITIONAL-PASS)

| 항목 | 처리 | 내용 |
|---|---|---|
| W2 행 aria-label 3곳 | **반영** | TrajectoryTable.tsx:2446-2454 → `table.ariaCollapsedSummary` / `table.ariaRequestOnly` / `table.ariaRow` 키로 t() 전환. request 접두는 기존 `table.request`('Request #{number}') 재사용 → aria-label이 셀 버튼('Request #1')과 일관. 'no content' 폴백은 기존 `table.noContent` 사용. KIND_LABEL·listDisplayText는 데이터/기술 표기 보존. |
| W3 timeline aria-label | **반영** | TrajectoryTimeline.tsx:394, :590 → `timeline.aria` 키('Trajectory timeline' / '실행 경로 타임라인') |
| W4 인라인 결과 title 툴팁 | **반영** | :2623-2625 → `resultText === 'No output' ? t('details.noOutput') : resultText` (기존 :2642 표시 매핑과 동일) |
| W1 compactionSeq 죽은 코드 | **도달 가능으로 판정(수정 불필요)** | layout.ts:341이 `title: 'Compaction ${request.startSeq}'` 그룹을 실제 생성하고, TrajectoryTable.tsx:2797의 `groupLabel(t, selected.group)`이 이를 소비. layout.client.spec.tsx:394도 'Compaction 3' 그룹을 생성·검증. diff만 본 리뷰의 오판. |
| W5 문자열 switch → 태그+assertNever | **미반영(사유 기록)** | TrajectoryTable.tsx:996/1005 switch는 T5에서 확정한 "데이터 계층 센티널 문자열 영어 유지 + 렌더 시점 t() 매핑" 설계의 일부. 태그 전환은 layout.ts 데이터 모델/세션 로그 재생 영향 대공사 — 별도 카드 필요. |
| W6 ko stub 렌더 단언 | **반영** | table.client.spec.tsx에 신규 테스트 'renders Korean UI labels while keeping data-layer text in English' — ko 사전 바인딩 stub으로 '(도구 호출만)' 표시(렌더 매핑)와 'plain english message' 데이터 텍스트 영어 유지를 단언. |
| W7 검색 인덱스 영어 데이터 전용 | **known-issue 기록** | trajectory-search-index.ts는 cell.text/preview/result/inputDetail/outputDetail 등 데이터 계층만 인덱싱. 번역된 UI 라벨(예: '도구')로는 검색 불가, 데이터 원문(예: 'tool')으로만 검색됨. 의도된 범위로 기록. |
| NIT N1~N8 | 미반영 | 다음 반복에서 선택 반영. |

## korean-coverage.spec.ts 갱신 불필요 판정 근거

- 스펙의 테스트 1이 `packages/**/src/client/locales.ts` **전수 동적 스캔** → ui-trajectory 신규 키(49+4개)는 zh/en/ko 키·placeholder 일치 검사에 자동 포함.
- 테스트 2가 모든 client 소스의 `locale.register({ zh, en, ... })` 호출을 동적 스캔 → ui-trajectory의 `locale.register(NS, { zh, en, ko })`(index.ts:31, **베이스라인부터 존재**) 자동 검사.
- 이번 작업에서 새 동적 `locale.register` 생성 없음, 사전 밖 문자열 패턴 신규 생성 없음(오히려 제거 방향). → **스펙 확장 불필요 판정**, 전수 실행에서 4 passed 확인.

## 키 인벤토리 (T1~T6 최종)

T1(98f919ef9d) 49개 + T2~T5(598ab48d22, 86f1ec5054, d9e82691ba) 60여 개 + 이번 카드 4개 = **신규 키 113여 개** (zh/en/ko 동일 키 집합·placeholder).

이번 카드 추가 4개:

| 키 | en | ko | placeholder |
|---|---|---|---|
| `timeline.aria` | Trajectory timeline | 실행 경로 타임라인 | — |
| `table.ariaCollapsedSummary` | Collapsed {kind} summary, {summary} | 접힌 {kind} 요약, {summary} | kind, summary |
| `table.ariaRequestOnly` | Request {number}, compaction | 요청 {number}, 컨텍스트 압축 | number |
| `table.ariaRow` | {request}{kind}, {content} | {request}{kind}, {content} | request, kind, content |

전체 키 인벤토리는 `local-notes/t1-trajectory-key-inventory.md` (T1 시점) + A2 핸드오프(60여 개) 참조. zh 값은 포크 diff 최소화 원칙에 따라 현행 영어 문구 유지.

## t 전달 구조 변경 요약 (T2)

- `TrajectoryView`가 보유한 `t`(PropsLocale)를 `TrajectoryTimeline`·`TrajectoryTable` 및 내부 서브컴포넌트(LaneLabels, TurnHeader, RecordListText 등)에 props로 전달.
- 테스트 픽스처는 `(key, params) => en 사전 바인딩 + placeholder 치환` 스텁 사용 — 기존 영어 어설션 보존.
- `t`는 필수 prop(선택 프로퍼티 금지), 미전달 호출부 0건.

## 센티널 처리 결정과 근거 (T5)

- **결정: 차선안** — layout.ts 데이터 계층의 센티널 문자열('Tool call only', 'No output', 'Initial System Prompt', 'Compacting context…', 'Step N'/'Compaction N' 그룹 타이틀)은 **영어 원문 유지**, TrajectoryTable 렌더 시점에 `compactionChangeLabel`/`systemChangeLabel`/`groupLabel`/`table.request` 등 t() 매핑으로 한국어 표시.
- 근거: `cell.text === 'Tool call only'`(TrajectoryTable.tsx:1053) 류 로직 비교가 문자열 센티널에 의존. 판별 필드 전환(선호안)은 layout.ts 데이터 모델 + RecordSchema + 세션 로그 재생 영향이 커서 이번 범위에서 보류. `===` 비교 회귀 0건.
- layout.client.spec.ts 동작 불변 확인 후 착수·완료.

## 브라우저 실검증 (dsh-ko 웹, Playwright)

- 서버: `DSH_HOME=/home/yulsol/.dsh-ko ~/.local/bin/dsh-ko web --port 3081` (3080 점유 회피) → HTTP 200. `~/.dsh-ko/settings.yaml`은 `local-tools/settings.ko.yaml` 사본(locale.preference=ko). 공식 dsh(`~/.dsh`) 무접촉.
- 브라우저: Playwright 1.61.1 + chromium headless shell 1228 (이 서버에 신규 설치 — 기존 1223이 repo 요구 버전과 불일치해 e2e 전면 실패, 설치 후 해소).

| 체크리스트 | 결과 |
|---|---|
| 온보딩 화면 한국어 ('API 키를 추가해 시작하기' 등) | ✅ |
| 메인 UI 한국어 (새 세션·작업 공간·아직 세션이 없습니다·설정) | ✅ |
| 설정 다이얼로그 '언어: 한국어' | ✅ |
| 보존 목록 영어 유지 ('Workspace Write' 권한 모드 기술 표기) | ✅ |
| 페이지 오류(console/pageerror) | **0건** |
| CJK 외 잔여 영어 정적 문구 | **0건** (기술 표기 'Workspace Write' 제외) |
| Trajectory 탭 데이터 렌더링 | ⚠️ API 키 없어 새 세션 생성 불가 → **유닛(ko stub 105 passed·W6), navigation-panes 골든, 소스 정적 검증(aria-label/title 하드코딩 0건, 잔여 정적 영어 0건 — TTFT/SYSTEM은 기술 표기 보존)으로 갈음** |

## dispose 관찰 로그 (트랙 C M1)

| 실행 # | 스위트 | dispose 120s 타임아웃 | 소요 |
|---|---|---|---|
| 1 | test:web (playwright 1223 부재 → 브라우저 launch 실패) | 해당 없음(부팅 실패) | 304s |
| 2 | test:web (1228 설치 후 replay) | **없음** | 803s |
| 3 | navigation-panes 단독 replay | 없음 | 25s |
| 4 | trajectory-virtualization 단독 replay | 없음 | 9s |

minimal-preset.snapshot은 이번 실행에서 샌드박스 백엔드 불가로 실패(dispose 도달 전 코드 실행 단계 실패). dispose hang 자체는 **무재발 → "부하 플레이크 판정 유지"** 로 종결 기록. (에스컬레이션 트리거: 전체 부하 중 afterAll dispose 120s 타임아웃 2회 연속 — 미충족)

## 커밋

- 이번 카드 커밋: `a380cea29b`(직전 amend 기준; 최종 해시는 `git log --oneline -1` 참조) — 6개 파일 (locales.ts 키 4개, TrajectoryTable.tsx aria-label·title, TrajectoryTimeline.tsx aria-label, table.client.spec.tsx W6 테스트, trajectory.expected.md 골든, 핸드오프 문서)
- push 안 함. 영규님 확인 후 별도 진행.
- 직전 커밋: `d9e82691ba` (A2-T2~T5 완료), `98f919ef9d` (A1-T1)

## 남은 일 / 알려진 문제

1. **pro 모델 workflow 자식 null 실패 진단** — 별도 카드 t_3d766703 (deepflash-coder, 이 카드 완료 시 승격).
2. **이 서버 환경 한정 실패 2종** — test:gui shiki lazy 로드 타임아웃(code-block, 5s 고정 타임아웃이 4코어 부하에서 초과) / test:web 샌드박스 불가(bwrap userns 거부·Landlock 없음)·부하. 맥북/샌드박스 가능 호스트에서는 기준(3761/254) 충족 예상. 해결 후보: code-block 테스트 타임아웃 상향(별도 카드), 샌드박스 호스트에서 CI 실행.
3. **W7 known-issue**: 검색 인덱스는 데이터 계층(영어 원문)만 검색 — 번역 UI 라벨로 검색 불가(의도된 범위).
4. **W5 보류**: 센티널 문자열 switch → 태그 기반 전환은 별도 카드(데이터 모델 변경 수반).
