# DeepSeek Harness 한국어 포크 — 후속 작업 실행 플랜

**브랜치:** `local/korean-ui` · **기준 커밋:** `968eab4187` · **베이스라인:** locale 집중 855 / GUI 3761 / web replay e2e 254 통과, typecheck·lint·doc-sync 그린

참고 문서·코드 실사 결과: `TrajectoryView`는 `t`를 `PropsLocale<'trajectory'>`로 받아 **TrajectoryToolbar에만** 전달 중이고, `TrajectoryTimeline`·`TrajectoryTable`은 `t`를 받지 않습니다. 정적 영어 문구는 Timeline(레인 헤더 `Input/Model/Tools`, `No timing data`), TurnHeader(`COLUMN_LABELS = ['Input','Output','Think','Time']`), Table(탭 라벨 `System Prompt/Tools/…/Usage`, `Event details`, `Tool Call`, `Payload/Result`, `Failed`, `Request #N · Compaction`, `step/steps` 복수 문구 등), View(`Step ${step}`, `Compaction ${seq}` 그룹 라벨), layout.ts(센티널 문구 `Tool call only`, `Initial System Prompt` 등)에 분포합니다. 테스트 픽스처(`table.client.spec.tsx` 등)는 `TrajectoryTable`을 `t` 없이 렌더링 중입니다.

---

## 0. 작업 순서와 의존 관계

```
[트랙 A: ui-trajectory 번역]  T1 → T2 → T3 → T4 → T5 → T6
                                   (T3/T4/T5는 T2 완료 후 순차, 카드 단위 커밋)
[트랙 B: pro 모델 진단]        D1 → D2 → D3 → D4   (A와 독립, 병행 가능)
[트랙 C: dispose 관찰]         M1                   (경량, A/B 검증 실행에 편승)
```

- 트랙 A는 타입 안전한 중간 상태를 남기지 않는다는 원칙에 따라 **한 세션 내에서 T2~T6을 연속 완주**하는 것을 기본 운영으로 합니다(카드 분리는 리뷰/검증 단위이지, 브로큰 커밋을 남기는 단위가 아님).
- 트랙 B는 코드 변경이 없는 진단 작업이라 A와 병행 가능하나, **A 진행 중에는 `settings.ko.yaml`·에이전트 구성을 바꾸지 않음**(A의 브라우저 검증 환경이 오염되므로).
- 트랙 C는 독립 카드 1장. A/B의 전체 스위트 실행 결과를 관찰 로그에 기록하기만 함.

---

## 트랙 A — ui-trajectory 정적 영어 문구 번역

### 카드 T1: 로케일 키 스키마 설계 및 locales.ts 사전 확장
- **작업 내용**
  - 소스 전수 재확인으로 번역 대상 문구 인벤토리 확정(감사 문서 목록 + 실사 결과: `Input/Model/Tools`(레인 헤더), `Input/Output/Think/Time`(턴 헤더), `No timing data`, `Event details`, `Resize event details`, `Status`, `Provider`, `System Prompt`, `Tools`, `Usage`, `Payload`, `Result`, `Payload JSON`/`Result JSON`, `Tool Call`, `Tool calls`, `Subtool calls`, `(tool call only)`, `Failed`, `No system prompt in this request`, `Request #N`, `Compaction`, `Step N`, `N step(s)`, `Open tool call summary` 류 aria/title).
  - `packages/client/ui-trajectory/src/client/locales.ts`의 `TrajectoryKey` 유니언에 신규 키 추가. 기존 네이밍(`view.*`, `toolbar.*`)을 이어 `timeline.*`, `turn.*`, `table.*`, `details.*` 등 도메인 접두 사용.
  - `{placeholder}` 키 설계: `Step {step}`, `Request #{number}`, `{count} steps` 류. **zh/en/ko 3개 사전 모두 동일한 placeholder 이름** 사용(korean-coverage.spec.ts가 자동 강제).
  - 복수 문구(`1 step`/`N steps`)는 사전 키를 호출부에서 선택하는 방식(예: `table.requestStep`/`table.requestSteps`)으로 처리 — 로케일 런타임에 복수 규칙이 없음.
  - zh 값은 포크 diff 최소화를 위해 현행 하드코딩 영어 문구를 유지해도 됨(업스트림 zh 사전에도 영어 잔존 선례 있음). en 값은 현재 화면 문구와 **완전히 동일**하게.
- **성공 기준**
  - zh/en/ko 키 집합·placeholder 완전 일치, `pnpm vitest run packages/client/locale/tests` 통과.
  - 아직 컴포넌트가 새 키를 참조하지 않으므로 GUI 스냅샷 무변경.
- **검증 게이트**
  - `pnpm vitest run packages/client/locale/tests packages/client/ui-trajectory`
  - `pnpm run typecheck`
- **산출물** `packages/client/ui-trajectory/src/client/locales.ts` + 키 인벤토리 표(handoff 문서 부록)
- **금지사항** 기존 한국어/중국어/영어 키·값 변경 금지 · placeholder 이름 언어별 상이 금지 · 컴포넌트 코드 동시 수정 금지(이 카드는 사전만)

### 카드 T2: `t` 전달 구조 관통 (View → Timeline/Table → 테스트 픽스처)
- **작업 내용**
  - `TrajectoryTimeline`, `TrajectoryTable`(및 둘이 호출하는 내부 서브컴포넌트) props에 `t` 추가 — `@deepseek-ai/dsh-client-ui-slots`의 `TranslateNS<'trajectory'>` 타입 사용(기존 `PropsLocale` 패턴 준수).
  - `TrajectoryView`가 이미 보유한 `t`를 두 컴포넌트에 전달.
  - `tests/`의 모든 렌더링 호출부(`table.client.spec.tsx`, `views.client.spec.tsx`, `layout.client.spec.tsx`, `cell.client.spec.tsx` 등)에 스텁 번역 함수 주입(관례: `(key) => key` 또는 en 사전 바인딩 — 기존 영어 어설션이 깨지지 않는 쪽 우선).
  - **이 카드에서 문자열 치환은 하지 않음** — 시그니처·배선만. 모든 호출부가 한 커밋에서 갱신되어야 타입체크가 그린 유지됨.
- **성공 기준**
  - `t` 미전달 호출부 0건, 기존 테스트 전부 기존 어설션 그대로 통과.
- **검증 게이트**
  - `pnpm vitest run packages/client/ui-trajectory`
  - `pnpm run typecheck && pnpm run lint`
- **산출물** 수정된 TSX props 시그니처 + 테스트 픽스처
- **금지사항** `t`를 선택 프로퍼티로 만들어 미완 배선을 숨기는 것 금지 · 이 카드에서 문구 치환 금지 · 테스트 어설션 의미 변경 금지

### 카드 T3: Timeline·TurnHeader 레이블 번역
- **작업 내용**
  - `TrajectoryTimeline.tsx` 레인 헤더(`Input/Model/Tools`)와 `No timing data` → `t()` 호출.
  - `TrajectoryTurnHeader.tsx` `COLUMN_LABELS` 상수 → `t` 기반 동적 라벨.
  - 감사 기준 준수: `IN`/`OUT` 류 입출력 기술 표기, 모델명·프로바이더명은 번역하지 않음.
- **성공 기준** ko 선택 시 타임라인/턴 헤더에 정적 영어 0건(감사 문서의 보존 목록 제외).
- **검증 게이트**
  - `pnpm vitest run packages/client/ui-trajectory`
  - `pnpm run typecheck && pnpm run lint`
- **산출물** `TrajectoryTimeline.tsx`, `TrajectoryTurnHeader.tsx`
- **금지사항** 레이아웃 계산·좌표 로직 변경 금지(문구 교체만) · 데이터 유래 텍스트(모델 출력) 번역 금지

### 카드 T4: TrajectoryTable·이벤트 상세 패널 번역 (본체)
- **작업 내용**
  - 탭 정의 배열(`System Prompt`, `Tools`, …, `Usage`), `Event details`/`Resize event details` aria-label, `Tool Call`/`Tool calls`/`Subtool calls`, `Payload`/`Result`(+`JSON` 접미는 기술 표기로 보존), `Failed`, `No system prompt in this request`, `Request #N`/`· Compaction`, `Open tool call summary` aria/title, `Status`/`Provider`/`Model`/`Error` 등 상세 패널 dt 류 → `t()`.
  - `step/steps` 복수 문구는 T1에서 정한 호출부 선택 방식으로.
- **성공 기준** 테이블·상세 패널 정적 영어 0건(보존 목록 제외), 기존 스냅샷·동작 테스트 통과.
- **검증 게이트**
  - `pnpm vitest run packages/client/ui-trajectory`
  - `pnpm run typecheck && pnpm run lint`
- **산출물** `TrajectoryTable.tsx`
- **금지사항** `JSON`·`ZIP` 류 기술 명칭 번역 금지 · aria-label 번역 시 접근성 테스트 픽스처 선행 확인 없이 어설션 변경 금지

### 카드 T5: layout.ts 센티널 문구와 View 그룹 라벨 처리
- **작업 내용**
  - `TrajectoryView`의 `Step ${step}`, `Compaction ${seq}` 그룹 라벨 → placeholder 키.
  - **핵심 위험:** `layout.ts`가 생성하는 `'Tool call only'`, `'Initial System Prompt'` 류 문구는 `TrajectoryTable.tsx:964`의 `cell.text === 'Tool call only'` 비교처럼 **로직 센티널로 사용 중**. 처리 원칙:
    1. 선호안: 셀 모델에 판별 필드(예: kind/flag)를 추가해 로직 비교를 텍스트에서 구조로 전환 후, 표시 텍스트만 번역.
    2. 차선안: 센티널 문자열은 데이터 계층에 영어로 유지하고 렌더 시점에 매핑.
  - 어느 쪽이든 `layout.client.spec.ts` 동작 불변을 먼저 확인하고 착수.
- **성공 기준** 그룹 헤더·변경 배너 ko 표시, `cell.text` 문자열 비교 로직 회귀 0건.
- **검증 게이트**
  - `pnpm vitest run packages/client/ui-trajectory`
  - `pnpm run typecheck && pnpm run lint`
- **산출물** `layout.ts`, `TrajectoryView.tsx`, `TrajectoryTable.tsx`(해당 개소)
- **금지사항** 센티널 문자열을 번역문으로 바꾸면서 기존 `===` 비교를 방치하는 것(즉시 회귀) 금지 · 레이아웃 산출 구조 임의 변경 금지

### 카드 T6: 회귀 테스트 확인·전체 게이트·브라우저 실검증·핸드오프
- **작업 내용**
  - `packages/client/locale/tests/korean-coverage.spec.ts` **갱신 필요 여부 판정: 불필요가 정답.** 이 스펙은 `packages/**/src/client/locales.ts`를 동적 스캔하므로 ui-trajectory 신규 키는 자동으로 zh/en/ko 키·placeholder 일치 검사에 포함됨. 단, 동적 `locale.register`나 사전 밖 문자열 패턴을 새로 만들지 않았는지 확인하고, 만들었다면 그때만 스펙 확장.
  - 전체 게이트 후 dsh-ko 브라우저 실검증: `~/.local/bin/dsh-ko web --port 3081`(3080은 점유 중 — 환경 충돌이므로 회피)에서 세션 열고 Trajectory 탭 확인: 레인 헤더/턴 헤더/테이블/상세 패널 한국어, 보존 목록(모델명·JSON 등) 영어 유지, 페이지 오류 0건, CJK 외 잔여 영어 정적 문구 0건.
- **성공 기준** 아래 게이트 전부 그린 + 브라우저 검증 체크리스트 통과.
- **검증 게이트(전수)**
  - `pnpm vitest run packages/client/locale/tests packages/client/ui-trajectory`
  - `pnpm vitest run packages/client/locale/tests/korean-coverage.spec.ts`
  - `pnpm run typecheck` · `pnpm run lint` · `pnpm run doc-sync`
  - `pnpm run test:gui` (3761 유지 확인)
  - `DSH_SNAPSHOT=replay pnpm run test:web`
- **산출물** `local-notes/handoff-trajectory-ko.<날짜>.md` — 키 인벤토리, 구조 변경(t 전달) 요약, 센티널 처리 결정, 브라우저 검증 기록, 커밋 해시
- **금지사항** 공식 dsh 설치(`/opt/homebrew/bin/dsh`, `~/.dsh`) 무접촉 · 기존 한국어 사전 키 이름·값 변경 금지 · 검증 미실행 상태 완료 선언 금지

---

## 트랙 B — pro 모델 workflow 자식 에이전트 null 실패 진단

### 카드 D1: 재현과 증거 수집
- **작업 내용**
  - `dsh-ko` 웹(`settings.ko.yaml` 적용 프로필)에서 workflow 툴로 `deepseek-v4-pro` 단일 에이전트 호출 재현.
  - 대조군 3종: ① flash + workflow(성공 기준선), ② pro + 일반 서브에이전트(핸드오프상 성공 사례), ③ pro + workflow(실패).
  - 세션 로그(ZIP 다운로드)와 `~/.dsh-ko` 아래 호스트 로그에서 자식 실패 지점·`null` 반환 구조 확보.
- **성공 기준** 실패 요청의 원문(에러 payload 또는 null 응답)과 스택/로그 위치 특정.
- **검증 게이트** 없음(진단). 단, 실행은 **dsh-ko 프로필로만**(공식 dsh 무접촉).
- **산출물** `local-notes/pro-workflow-diagnosis.ko.md` §재현 기록
- **금지사항** API 키 출력·커밋 금지 · 진단 중 `settings.ko.yaml` 값 섣부른 변경 금지

### 카드 D2: 프로바이더/모델 식별자 대조
- **작업 내용**
  - 구성 불일치 의심 지점 검증: `settings.ko.yaml`은 `llm-deepseek` 섹션(baseURL `https://opencode.ai/zen/go/v1`, apiKeyEnv `OPENCODE_GO_API_KEY`)인데 `agent-default-model.provider`는 `deepseek-official`. 호스트가 `deepseek-official`을 내장 프로바이더로 해석하는지, `llm-deepseek` 오버라이드와 어떻게 결합되는지 코드에서 확인.
  - workflow 자식 에이전트가 모델 식별자를 검증·허용하는 경로(모델 allowlist/에이전트 구성 스키마)에서 `deepseek-v4-pro`가 탈락하는지 확인.
- **성공 기준** "식별자 문제" 또는 "구성 문제" 둘 중 하나로 가설 수렴 + 근거 코드 경로 기록.
- **검증 게이트** 읽기 전용 진단. 코드 수정 시에만 `pnpm run typecheck`.
- **산출물** 진단 문서 §식별자 대조
- **금지사항** upstream 제품 코드 대규모 패치 금지(프라이빗 포크는 구성 수준 수정 우선)

### 카드 D3: 요청 계층 검증
- **작업 내용**
  - D1에서 확보한 실패 요청과 성공 요청(flash)의 페이로드 diff: `thinking: enabled`/`reasoningEffort: max`/`maxTokens: 256000` 파라미터가 OpenCode Go 프록시에서 pro 모델에 대해 거부되는지.
  - 필요 시 `OPENCODE_GO_API_KEY` 환경변수를 사용해 zen/go 엔드포인트로 최소 probe(키 값은 셸 히스토리·문서에 남기지 않음).
- **성공 기준** null 실패의 원인 계층(클라이언트 구성 / 프로바이더 라우트 / 업스트림 API) 확정.
- **검증 게이트** 없음(외부 진단).
- **산출물** 진단 문서 §요청 계층
- **금지사항** 자격증명 파일 내용 문서화 금지

### 카드 D4: 결론·조치 및 핸드오프
- **작업 내용**
  - 원인이 구성이면 `settings.ko.yaml` 최소 수정(예: 프로바이더 키 정합) 후 D1 재현 케이스 재실행으로 종결 확인.
  - 원인이 업스트림이면 포크 문서에 known-issue 기록, workaround(예: workflow 자식은 flash 고정) 명시.
- **성공 기준** 재현 케이스 종결 또는 known-issue 문서화 완료.
- **검증 게이트** 구성 수정 시 `pnpm run typecheck`(yaml은 타입 검사 대상 아님 — 대신 dsh-ko 기동 + 웹 200 확인).
- **산출물** `local-notes/pro-workflow-diagnosis.ko.md` 최종판 + 최종 핸드오프 문서에 링크
- **금지사항** flash 기본 모델 변경 금지(확정 결론 전) · 공식 dsh 환경 무접촉

---

## 트랙 C — minimal-preset dispose hang 플레이크 관찰

### 카드 M1: 관찰 유지 (경량)
- **작업 내용**
  - 트랙 A의 T6 및 트랙 B 검증 중 발생하는 `DSH_SNAPSHOT=replay pnpm run test:web` 실행 결과를 로그 표(실행 # / 스위트 / dispose 타임아웃 여부 / 소요)로 기록.
  - **에스컬레이션 트리거: 전체 부하 중 afterAll dispose 120초 타임아웃이 2회 연속 재발**할 때만 신규 카드 개설 — dispose 단계별 타임스탬프 계측(agent-loop dispose 체인 → scope quiesceFiber → PTY close graceMs 구간) + PTY close 데드라인 강화 검토.
  - 그 전에는 계측 코드·설정 변경 일절 없음.
- **성공 기준** 관찰 표가 핸드오프 문서에 존재하고, 무재발이면 "부하 플레이크 판정 유지"로 종결 기록.
- **검증 게이트** 없음(관찰 전용).
- **산출물** 최종 핸드오프 문서 §dispose 관찰 로그
- **금지사항** 트리거 충족 전 계측·코드 수정 금지 · 단독 재실행으로 "완치" 선언 금지(단독 14.5초 통과는 이미 확인됨)

---

## 위험 관리

| 위험 | 영향 | 대응 |
|---|---|---|
| 기존 GUI 테스트 3761개 회귀 | 스냅샷·aria 어설션 불일치 | 카드마다 `pnpm vitest run packages/client/ui-trajectory` → T6에서 `test:gui` 전수. aria-label 번역 시 해당 어설션 픽스처 동시 갱신 |
| 로케일 키 `{placeholder}` 불일치 | korean-coverage.spec.ts 실패 | zh/en/ko 동시 추가 원칙 + 스펙이 자동 강제. 복수 문구는 키 분리 방식으로 회피 |
| ESM/타입 안전성 — 중간 상태 브로큰 커밋 | 핸드오프 원칙 위반 | T2(배선)와 T3~T5(치환)를 한 세션 내 연속 완주. 카드 커밋은 각자 typecheck 그린 상태에서만 |
| layout.ts 센티널 텍스트 결합 | 폴딩 로직 회귀 | T5에서 판별 필드 전환 또는 렌더 시점 매핑 중 택일, `layout.client.spec.ts` 선확인 |
| zh 사전 미비 확대 | 포크 diff 팽창 | 신규 키의 zh 값은 현행 영어 문구 유지 허용(업스트림 선례), 번역 품질 논쟁 차단 |
| lint 관례(max-len, arrow-parens, no-confusing-void-expression) | 커밋 직전 실패 | 카드마다 `pnpm run lint`. 직전 세션에 동일 스펙 파일에서 6건 전례 있음 |
| 포트 3080 점유 | 브라우저 검증 실패 | dsh-ko는 `--port 3081` 고정 |
| 진단 중 자격증명 노출 | 보안 | 키는 환경변수로만, 문서·로그·커밋에 남기지 않음 |

---

## 공통 금지사항 (모든 카드)

1. 기존 한국어/중국어/영어 사전 키 이름·값 변경 금지(신규 추가만).
2. 공식 dsh 설치(`/opt/homebrew/bin/dsh`, `~/.dsh`) 및 공식 자격증명 무접촉.
3. `local-tools/settings.ko.yaml` 외 구성 파일을 트랙 A 작업 중 변경 금지.
4. 타입 안전성을 깨는 중간 커밋 금지 — 모든 커밋은 `typecheck` 그린.
5. 감사 문서가 정한 미번역 기준(모델명·프로바이더 식별자, `JSON`/`ZIP`/`IN`/`OUT`, 코드·도구 출력, 사용자·모델 생성 데이터) 위반 금지.
6. 검증 미실행 완료 선언 금지. 실패 시 실패 출력 그대로 기록.

---

## 산출물 규격

모든 산출물은 `local-notes/` 아래 새 문서로 남깁니다:

- `local-notes/handoff-trajectory-ko.<YYYY-MM-DD>.md` — 트랙 A 최종: 키 인벤토리, `t` 전달 구조 변경 요약, 센티널 처리 결정과 근거, korean-coverage 갱신 불필요 판정 근거, 브라우저 검증 체크리스트, dispose 관찰 표, 커밋 해시.
- `local-notes/pro-workflow-diagnosis.ko.md` — 트랙 B: 재현 기록, 식별자 대조, 요청 계층 분석, 결론(구성 수정 diff 또는 known-issue).
- 완료 후 `git push origin local/korean-ui`는 사용자 확인 후 수행(기본: 커밋까지만).

## 게이트 명령 요약

| 시점 | 명령 |
|---|---|
| 카드마다 | `pnpm vitest run packages/client/ui-trajectory` · `pnpm run typecheck` · `pnpm run lint` |
| 로케일 무결성 | `pnpm vitest run packages/client/locale/tests` (korean-coverage.spec.ts 포함) |
| 최종(T6/D4) | `pnpm run test:gui` · `DSH_SNAPSHOT=replay pnpm run test:web` · `pnpm run doc-sync` |
| 브라우저 실검증 | `~/.local/bin/dsh-ko web --port 3081` → Trajectory 탭 ko 렌더링 체크리스트 |
