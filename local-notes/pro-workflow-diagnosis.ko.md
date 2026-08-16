# pro 모델 workflow 자식 null 실패 진단 — 최종판 (B1-D1~D3 + B2-D4)

- **카드:** t_3d766703 (B1-D1~D3, deepflash-coder) + t_4bf0f89c (B2-D4, default) — 진단·조치 전용, 코드 수정 없음
- **일시:** 2026-08-16 22:00~22:20 KST (D1~D3) / 22:30~ (D4 재실행·종결 확인)
- **환경:** Linux 서버 (이전 실패 기록은 macOS 핸드오프 기준)
- **브랜치:** local/korean-ui (D1~D3 커밋 ab5f5bdd7c 위, D4 커밋 별도)
- **관련 문서:** `local-notes/plan-2026-08-16-trajectory-ko.md` 트랙 B, `local-notes/handoff-2026-08-16.ko.md` §남은 일 3, `local-notes/handoff-trajectory-ko.2026-08-16.md` §트랙 B 링크

---

## 0. 결론 요약

| 항목 | 판정 |
|---|---|
| D1 재현 | **현재 환경에서 재현 불가** — 3종 대조군 모두 성공 |
| D2 식별자 대조 | `deepseek-official` = llm-deepseek가 등록하는 **정식 provider 라우트**. 구성 불일치 아님. `deepseek-v4-pro` 탈락 경로 없음 |
| D3 요청 계층 | zen/go 엔드포인트는 pro + `thinking enabled` + `reasoning_effort max` + `max_tokens 256000`을 **정상 수락** (HTTP 200 SSE) |
| 원인 가설 | **자격증명 계층**: 원래 실패(Mac)는 `OPENCODE_GO_API_KEY` 자격증명 부재 → `MISSING_CREDENTIAL` → workflow 자식 첫 요청 실패 → runtime null 반환으로 수렴 (근거: §4) |
| D4 종결 | **재현 케이스 종결 + known-issue 문서화 완료** — D4에서 대조군 ③(workflow+pro 명시) 재실행 성공(자식 request/header에 `deepseek-v4-pro` 확인), settings.ko.yaml은 수정 불필요(정상 구성), 런타임 `~/.dsh-ko/settings.yaml`이 재현 중 pro로 변경돼 있던 것을 소스와 정합(flash 복원). Mac 자격증명 부재는 known-issue로 기록 (§5.5) |

성공 기준("null 실패의 원인 계층 확정 또는 가설 수렴 + 근거 코드 경로 기록")은 **가설 수렴 + 근거 기록**으로 충족. D4 성공 기준("재현 케이스 종결 또는 known-issue 문서화 완료")은 **둘 다 충족**. flash 기본 모델은 settings.ko.yaml 기준 변경 없음(금지사항 준수).

---

## 1. 재현 기록 (D1)

### 1.1 재현 환경

- dsh-ko 웹 서버: `DSH_HOME=/home/yulsol/.dsh-ko pnpm dsh web --port 3081` (settings.ko.yaml = `~/.dsh-ko/settings.yaml` 동일 내용)
- 키: `~/.hermes/.env`의 `OPENCODE_GO_API_KEY`를 source로 로드 (키 값은 문서·로그·셸 히스토리에 미노출)
- 웹 RPC 직접 호출 (`POST /api/session.create`, `/api/session.prompt`, `/api/session.history`)로 재현

### 1.2 대조군 3종 결과

| # | 조합 | 호출 내용 | 자식 모델 (request/header) | 결과 |
|---|---|---|---|---|
| ① | flash + workflow | `agent('Reply with exactly: FLASH-OK', { model: 'deepseek-v4-flash' })` | deepseek-v4-flash | **성공** (childResult: FLASH-OK) |
| ② | pro 세션 + 일반 subagent | subagent 툴, 모델 미지정 | **deepseek-v4-flash** (selectModel이 자식에 미상속) | 성공 (SUB-OK) |
| ③ | flash 세션 + workflow (model 명시) | `agent('Reply with exactly: PING-OK', { model: 'deepseek-v4-pro' })` | **deepseek-v4-pro** | **성공** (childResult: PING-OK) |
| ③′ | pro 세션 + workflow (model 미지정) | `agent('Reply with exactly: PING-OK')` | **deepseek-v4-flash** (selectModel이 자식에 미상속) | 성공 (PING-OK) |

세션 로그 위치 (모두 `~/.dsh-ko/sessions/--home-yulsol-work-deepseek-harness-ko--/`):

- ① 부모 `session-97843760-3ff0-4b09-9732-5e5702571c59` / 자식 `770754fa-f05c-4981-b09a-5b49da971a1c`
- ② 부모 `session-0b02e96b-d564-49b0-b405-655a769a42d7` (turn 2) / 자식 `d15626f3-9ee2-4afd-9846-e33c318df908`
- ③ 부모 `session-a820ae9b-7f1a-44bb-9280-326f04b36f0d` / 자식 `d684d9e7-f288-4e81-b9f3-6c458d4dab7d`
- ③′ 부모 `session-0b02e96b-…` (turn 1) / 자식 `568bd0f4-3d20-4079-b8d7-e2966c87757e`

### 1.3 workflow 툴 이벤트 타임라인 (③ workflow + pro 명시, 자식 성공 사례)

```
tool-workflow/run-start   runId=aae64509 …  name=diag-pro-workflow
tool-workflow/agent-start seq=1 label=probe childId=d684d9e7-…
tool-workflow/agent-end   seq=1 outcome=completed        ← 자식 완료
tool-workflow/run-end     stopReason=completed
tool/result               "workflow \"diag-pro-workflow\" completed (1 agent).
                          Return value: { \"childResult\": \"PING-OK\" }"
```

자식 세션 `d684d9e7-…`의 request/header:

```json
{"provider": "deepseek-official", "model": "deepseek-v4-pro",
 "maxTokens": 256000, "reasoningEffort": "max"}
```

→ 의심 파라미터(thinking enabled·reasoningEffort max·maxTokens 256000)가 **실제로 그대로 전송되어 성공**. 자식 assistant/message: `PING-OK`, usage `inputTokens 12525 / outputTokens 23 / reasoningTokens 18`.

### 1.4 원래 실패 기록과의 차이

원래 실패 (macOS 핸드오프, `handoff-2026-08-16.ko.md:54`):

> pro 모델 분석 시도 실패: workflow 툴로 `deepseek-v4-pro`(provider deepseek-official) 단일 에이전트를 호출했으나 자식 실패(null)로 종료됨. (참고: 일반 서브에이전트 분석은 성공)

원래 실패 환경(Mac)과 현재 환경(Linux)의 **환경 차이**:

| 항목 | 원래 실패 (Mac) | 현재 재현 (Linux) |
|---|---|---|
| 자격증명 출처 | `~/.dsh-ko/.credentials.yaml` = **공식 `~/.dsh/.credentials.yaml` 복사** (`handoff-2026-08-16.ko.md:17`) — 공식 키(DeepSeek 공식 API용)가 들어 있을 가능성 높음 | `OPENCODE_GO_API_KEY` 환경변수 (opencode.ai/zen/go 전용) |
| settings.ko.yaml | 동일 | 동일 |

→ `settings.ko.yaml`이 요구하는 키는 `OPENCODE_GO_API_KEY`인데, Mac의 `~/.dsh-ko/.credentials.yaml`에는 그 키가 **없었을 가능성**이 높다(공식 dsh 키만 복사됨). 이 경우 자식 요청이 `MISSING_CREDENTIAL`로 실패 → 자식 `stopReason ≠ completed` → workflow runtime이 `null` 반환 (코드 경로 §4.1).

---

## 2. 프로바이더/모델 식별자 대조 (D2)

### 2.1 `deepseek-official`의 정체 — 구성 불일치 아님

- `packages/llm/llm-deepseek/src/index.ts:47` — `const PROVIDER = 'deepseek-official'`
- llm-deepseek 플러그인이 `ctx.llm.registerAdapter(['deepseek-official'], adapter)`로 **이 라우트를 직접 등록** (index.ts:256)
- 따라서 `settings.ko.yaml`의 `agent-default-model.provider: deepseek-official`은 "내장 프로바이더로 해석"이 아니라 **llm-deepseek 플러그인이 등록한 라우트를 정확히 가리킴**. 식별자 불일치 없음.
- `agent-default-model` 플러그인 (`packages/core/agent-default-model/src/index.ts:88-90`)은 `currentSelection()`으로 provider/model을 그대로 반환. 여기에 별도 검증 없음.

### 2.2 llm-deepseek 오버라이드 결합 방식

- `packages/llm/llm-deepseek/src/index.ts:270-275` — `installSettingsSection(ctx, NS, Config, config, …)`으로 `llm-deepseek` settings 섹션을 설치
- 어댑터는 `resolveAdapterOptions(config, env)` (index.ts:161)로 baseURL `https://opencode.ai/zen/go/v1`·apiKeyEnv `OPENCODE_GO_API_KEY`·defaults(`thinking enabled`, `reasoningEffort max`)·maxTokens 256000을 **매 요청마다 재해석** (adapter.ts `options()` thunk)
- 요청 직렬화: `serializeRequest` (serialize.ts:151) — `thinking: {type: 'enabled'}`, `reasoning_effort: 'max'`, `max_tokens: 256000`이 그대로 wire body에 실림 (실제 전송 확인 §3)

### 2.3 workflow 자식 모델 검증 경로 — deepseek-v4-pro 탈락 없음

workflow 자식 시작 경로 (코드 실사):

```
tool-workflow (packages/workflow/tool-workflow/src/index.ts:284 start)
→ workflow-worker-thread engine (index.ts:143 start)
→ worker runtime agent() (runtime.ts:250)
   opts.model → children.startAgent({ model }) (runtime.ts:280-281)
→ host startChild (host.ts:349) → subagents.start('spawn', { agentOptions: { model } }) (host.ts:352-365)
→ subagent-spawn-in-process (index.ts:48) → startInProcessRun
→ in-process-driver (index.ts:132) → ctx.agents.create({ agentOptions: resolveChildAgentOptions(parent, requested, depth) })
→ child-agent.ts:68-83 resolveChildAgentOptions: parent provider/model/maxTokens 상속 + requested 오버라이드
→ agent model-selection.ts installModelSelection: provider/model/effort → request config
→ DeepSeekAdapter.resolveModel (adapter.ts:175): catalog 미등록 모델도 fallback 허용 (adapter.ts:189-190)
```

- **모델 allowlist 없음**: `DeepSeekAdapter.resolveModel`은 catalog(`connection.models`)에 없는 모델도 `{ provider, id: model, name: model, inputModalities: ['text'] }` fallback으로 허용 (adapter.ts:189-190). `deepseek-v4-pro`가 탈락할 경로가 코드에 없음.
- 실제로 자식 request/header에 `model: deepseek-v4-pro`가 그대로 전달되어 성공 (§1.3).
- workflow 워커 스레드 환경은 scrubbed (`host.ts:33` — ambient credentials 없음)이지만, **자식 에이전트는 호스트 프로세스에서 시작**되므로 (`host.ts:352` `this.subagents.start` — 호스트 registry), 자식의 LLM 요청은 호스트 credentials를 사용한다. 워커 scrubbing은 자식 요청과 무관.

### 2.4 D2 성공 기준 판정

"식별자 문제" 또는 "구성 문제" 중 하나로 수렴해야 했으나, **둘 다 아님**으로 판정:

- 식별자 문제 ❌ — `deepseek-official`은 llm-deepseek가 등록한 정식 라우트, `deepseek-v4-pro`는 catalog에도 있고 fallback에도 허용
- 구성 문제 ❌ — settings.ko.yaml의 llm-deepseek 섹션과 agent-default-model은 정상 결합, 실제 요청도 성공
- → **자격증명 환경 문제**로 가설 이동 (§4)

### 2.5 부수 발견: 세션 selectModel은 workflow/subagent 자식에 상속되지 않음

재현 중 확인된 별개 동작 (원래 실패와 직접 인과는 아직 불명, 기록용):

- 부모 세션을 `session.selectModel(provider=deepseek-official, model=deepseek-v4-pro)`로 전환한 뒤,
  - workflow 스크립트에서 `agent(prompt)` (model 미지정) → 자식 request/header = **deepseek-v4-flash** (③′)
  - subagent 툴 (모델 미지정) → 자식 request/header = **deepseek-v4-flash** (②)
- workflow 스크립트에서 `agent(prompt, { model: 'deepseek-v4-pro' })` **명시** 시에만 자식이 pro로 실행됨 (③)
- 코드 근거: `child-agent.ts:68-83` `resolveChildAgentOptions`는 `parent.options.provider/model/maxTokens`를 읽는데, 이 `parent.options`는 **에이전트 생성 시점(agent-default-model)의 값**이고, 세션 UI의 `selectModel`이 갱신하는 `ModelSelectionRef.current`(`model-selection.ts installModelSelection`)와는 별개 경로다. 자식 생성은 `parent.options` 기반이므로 세션 선택이 반영되지 않는다.
- 의미: "UI에서 pro를 고르고 workflow를 돌렸는데 자식이 pro로 갔을 것"이라는 기대는 코드상 성립하지 않는다. workflow 자식에 pro를 쓰려면 스크립트에서 `model: 'deepseek-v4-pro'`를 명시해야 한다.

---

## 3. 요청 계층 검증 (D3)

### 3.1 zen/go 엔드포인트 최소 probe

`OPENCODE_GO_API_KEY`로 `https://opencode.ai/zen/go/v1/chat/completions` 직접 POST (키 값은 출력·기록 없음):

```json
{
  "model": "deepseek-v4-pro",
  "messages": [{"role": "user", "content": "Reply with exactly: PROBE-OK"}],
  "stream": true,
  "stream_options": {"include_usage": true},
  "thinking": {"type": "enabled"},
  "reasoning_effort": "max",
  "max_tokens": 256000
}
```

**결과: HTTP 200, SSE 정상 스트리밍** — `data: {"model":"deepseek-v4-pro","choices":[…,"delta":{"content":null,"reasoning_content":"…"}}]` chunk 수신.

→ **파라미터 거부 아님.** `thinking enabled` / `reasoning_effort max` / `max_tokens 256000` 조합은 OpenCode Go 프록시에서 pro 모델에 대해 수락된다.

### 3.2 probe 중 관찰한 함정 (기록용)

- Python `urllib` 기본 User-Agent로는 **Cloudflare 403** (HTML "Access denied | opencode.ai used Cloudflare") — 파라미터 거부와 무관한 UA 차단
- dsh 어댑터는 `user-agent: deepseek-harness/<ver> (+https://github.com/deepseek-ai/deepseek-harness)`를 보내므로 (`packages/llm/llm/src/attribution.ts:40-55`) Cloudflare를 통과
- **진단 함정**: probe가 403을 받았다면 "파라미터 거부"로 오판할 뻔했음. UA를 dsh와 동일하게 맞춘 뒤 200 확인.

### 3.3 성공/실패 페이로드 diff

- 실패 페이로드(원래 Mac 실패)는 로그가 남아있지 않아 원문 확보 불가 (당시 세션 로그는 Linux 서버에 없음)
- 대신 현재 환경에서 성공한 페이로드(§1.3 request/header + §3.1 probe)를 확보: **의심 파라미터 3종이 전부 포함된 채 성공**
- 즉 페이로드 자체는 거부 사유가 될 수 없고, 남은 실패 원인은 페이로드 이전 단계(자격증명 해석)로 한정됨

---

## 4. 원인 계층 가설 (수렴)

### 4.1 가장 유력한 가설: 자격증명 계층 — `MISSING_CREDENTIAL` → 자식 null

코드 경로 (근거):

```
llm-deepseek resolveApiKey (index.ts:225-246)
  → credentials.resolve(OPENCODE_GO_API_KEY)
     (credentials-local: index.ts:309-317 — env > $DSH_HOME/.credentials.yaml > .env fallback)
  → 어디에도 키 없으면:
  → throw new LlmError('llm-deepseek: no API key for provider route "deepseek-official"…', 'MISSING_CREDENTIAL')
  → 자식 에이전트 첫 LLM 요청이 이 오류로 실패 → 자식 run의 stopReason ≠ 'completed'
  → workflow worker runtime agent(): runtime.ts:331-338
     "A child that failed for its own reasons resolves null"
  → return null  (runtime.ts:338)
```

핸드오프의 Mac 환경: `~/.dsh-ko/.credentials.yaml` = 공식 `~/.dsh/.credentials.yaml` 복사. 공식 파일에는 DeepSeek 공식 API 키(`DEEPSEEK_API_KEY` 계열)가 있고 `OPENCODE_GO_API_KEY`는 없었을 가능성이 높다. settings.ko.yaml이 요구하는 키는 `OPENCODE_GO_API_KEY`이므로, **Mac에서 dsh-ko가 pro 자식을 실행하면 자격증명 미해결 → MISSING_CREDENTIAL → 자식 null**이 정확히 설명된다.

"일반 서브에이전트 분석은 성공" 기록과의 정합성: subagent 툴도 같은 `ctx.agents.create` 경로를 쓰므로, **같은 시점에 같은 자격증명 상태였다면** subagent도 실패했어야 한다. 다만:
- 일반 subagent 자식은 기본 모델(flash)로 실행됨 (이번 재현 ②에서 확인: 자식 request/header가 `deepseek-v4-flash`) — flash든 pro든 키는 동일하게 필요하므로 키 부재 시 둘 다 실패
- 따라서 "subagent는 성공했다"는 기록은 당시 **키가 존재했다**는 뜻일 수도 있고, 다른 경로(예: 환경변수 export된 세션)에서 실행됐을 수도 있음
- 이 정합성 불완전으로 인해 가설은 "확정"이 아닌 "수렴"으로 유지

### 4.2 대안 가설 (정합성 문제 시)

- 일시적 업스트림 오류 (pro 요청 시점의 5xx/rate limit) — 로그 소실로 검증 불가
- Mac에서 `~/.dsh-ko/settings.yaml`이 `local-tools/settings.ko.yaml`과 다른 내용이었을 가능성 — 현재 Linux `~/.dsh-ko/settings.yaml`은 settings.ko.yaml과 동일 확인, Mac은 미확인

### 4.3 D3 성공 기준 판정

"클라이언트 구성 / 프로바이더 라우트 / 업스트림 API" 중 어디도 거부 지점이 없음을 실증 (§2, §3). 남은 후보는 **자격증명(클라이언트 구성의 하위 계층)**.

---

## 5. 결론 및 후속 (D4 완료)

### 5.1 결론 (D1~D3)

1. **현재 구성(OPENCODE_GO_API_KEY 로드)에서는 null 실패가 재현되지 않는다.** 3종 대조군 모두 성공. workflow 자식에 pro를 쓰려면 스크립트에서 `model: 'deepseek-v4-pro'` 명시가 필요하고(§2.5), 명시 시 정상 성공한다(③).
2. **코드·엔드포인트 실증 결과, 프로바이더 라우트/모델 식별자/요청 파라미터 어디에도 거부 지점이 없다.**
3. **가장 유력한 원인은 자격증명**: 원래 실패 환경(Mac)이 공식 `~/.dsh` 키를 복사해 `OPENCODE_GO_API_KEY`가 없었을 때 `MISSING_CREDENTIAL` → workflow 자식 null.

### 5.2 D4 재실행 기록 (2026-08-16 22:30~, 종결 확인)

| 항목 | 내용 |
|---|---|
| 실행 환경 | `DSH_HOME=/home/yulsol/.dsh-ko ~/.local/bin/dsh-ko web --port 3081` + `OPENCODE_GO_API_KEY` (env 로드) |
| 검증 게이트 | dsh-ko 기동 + 웹 HTTP 200 확인 ✅ |
| 재현 케이스 ③ | `agent("Reply with exactly: PING-OK", { model: "deepseek-v4-pro" })` — **성공** |
| 자식 세션 | `c2dd6e33-7726-4a40-9223-f41694184dad` — request/header `{"provider": "deepseek-official", "model": "deepseek-v4-pro", "maxTokens": 256000, "reasoningEffort": "max"}` |
| 이벤트 | `tool-workflow/run-start` → `agent-start` → `agent-end outcome=completed` → `run-end stopReason=completed` → `tool/result` "Return value: {\"childResult\": \"PING-OK\"}" |
| 판정 | **null 실패 재현 불가 — 재현 케이스 종결.** 원인 계층(자격증명) 가설 유지 |

### 5.3 D4 구성 정합 (settings.ko.yaml vs 런타임)

- `local-tools/settings.ko.yaml`은 **수정 불필요** — `llm-deepseek.apiKeyEnv: OPENCODE_GO_API_KEY` + `agent-default-model.provider: deepseek-official` 정합(§2.1), flash 기본 유지.
- 다만 D1~D3 재현 과정에서 `~/.dsh-ko/settings.yaml`(런타임)의 `agent-default-model.model`이 `deepseek-v4-pro`로 변경돼 있던 것을 발견. **소스(settings.ko.yaml)와 동일하게 `deepseek-v4-flash`로 복원** 후 재실행. (yaml은 typecheck 대상 아님 — 검증 게이트는 dsh-ko 기동 + 웹 200으로 수행)

### 5.4 known-issue (Mac 자격증명 부재)

- **현상:** dsh-ko에서 workflow 툴로 `deepseek-v4-pro` 단일 에이전트를 호출 시 자식 실패(null)로 종료 (Mac 핸드오프 기록).
- **원인:** `~/.dsh-ko/.credentials.yaml`(또는 환경변수)에 `OPENCODE_GO_API_KEY`가 없으면 `MISSING_CREDENTIAL` → 자식 첫 요청 실패 → workflow runtime이 null 반환 (코드 경로 §4.1). settings.ko.yaml이 요구하는 키가 자격증명 계층에 존재해야 함.
- **workaround:**
  1. dsh-ko 프로필(`~/.dsh-ko/.credentials.yaml` 또는 환경변수)에 `OPENCODE_GO_API_KEY` 설정 — 키 ref만 존재 확인, 값 노출 금지.
  2. workflow 자식에 pro를 쓰려면 스크립트에서 `model: 'deepseek-v4-pro'` **명시 필수** (세션 selectModel은 자식에 미상속, §2.5).
  3. 긴급 시: workflow 자식은 기본값(flash) 또는 `model: 'deepseek-v4-flash'` 명시로 유지.

### 5.5 D4 성공 기준 판정

- 재현 케이스 종결: ✅ (5.2, pro+workflow 성공)
- known-issue 문서화: ✅ (5.4)
- flash 기본 모델 변경: 없음 (settings.ko.yaml 불변, 런타임은 소스와 정합 복원)
- 공식 dsh 환경(`~/.dsh`): 무접촉 유지

---

## 6. 금지사항 준수 확인

- API 키 값 출력·커밋: 없음 (probe는 환경변수만 사용, 출력에서 키 문자열 제거)
- settings.ko.yaml 값 변경: 없음 (읽기만, D4에서도 수정 없음 — 런타임 ~/.dsh-ko/settings.yaml만 소스와 정합 복원)
- 공식 dsh 환경(`~/.dsh`): 무접촉 (존재 자체도 확인하지 않음)
- 자격증명 파일 내용 문서화: 없음 (파일 존재/부재만 확인)
- 코드 수정: 없음 (진단·조치 전용, 문서만)
- flash 기본 모델 변경: 없음 (settings.ko.yaml `agent-default-model.model: deepseek-v4-flash` 유지)
