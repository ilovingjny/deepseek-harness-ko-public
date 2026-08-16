# DeepSeek Harness 한국어 비공개 포크

이 저장소는 공식 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)를 기반으로 한국어 브라우저 UI와 개인용 `dsh-ko` 실행 환경을 관리하는 비공개 하류 저장소입니다. 공식 프로젝트나 공식 한국어 배포판이 아니며, 원본 `dsh` 설치를 대체하지 않습니다.

## 현재 제공하는 기능

- `zh`, `en`, `ko` 로케일 런타임과 `ko-KR` 브라우저 자동 감지
- 대화, 작업 공간, 계획, 목표, 서브에이전트, 백그라운드 작업, 모델·플러그인·권한 설정 등 주요 UI의 한국어 사전
- 모든 한국어 사전의 키와 `{placeholder}` 일치를 검사하는 AST 기반 회귀 테스트
- OpenCode Go를 통해 DeepSeek V4 Flash와 Pro를 사용하는 전용 설정
- 공식 `dsh`와 별개인 `dsh-ko` 명령 및 `~/.dsh-ko` 전용 홈
- 새 한국어 브라우저가 실제 조립된 웹 앱을 한국어로 여는 Playwright 검증

작업 성격에 따라 Flash와 Pro를 자동으로 바꾸는 모델 라우터는 아직 포함하지 않습니다. 현재 기본 모델은 Flash이며, 모델 선택은 기존 DSH 기능을 사용합니다.

## 설치 구조

| 항목 | 경로 또는 값 |
|---|---|
| 소스 저장소 | `/Users/yulsol/Documents/mac maintanance/deepseek-harness-ko` |
| 한국어 실행 명령 | `~/.local/bin/dsh-ko` |
| 한국어 전용 홈 | `~/.dsh-ko` |
| 한국어 설정 원본 | `local-tools/settings.ko.yaml` |
| 공식 실행 명령 | `/opt/homebrew/bin/dsh` |
| 공식 홈 | `~/.dsh` |

`dsh-ko`는 이 체크아웃에서 소스를 실행합니다. 인자가 없으면 `web` 프로필을 시작하며, `DSH_HOME`을 `~/.dsh-ko`로 고정해 공식 프로필과 설정을 건드리지 않습니다.

## 사용법

한국어 웹 UI를 시작합니다.

```sh
dsh-ko
```

다른 포트를 쓰려면 다음처럼 실행합니다.

```sh
dsh-ko web --port 3081
```

설치 상태를 확인합니다.

```sh
dsh --version
dsh-ko --version
dsh-ko web --help
```

검증 시점의 공식판은 `0.1.0-rc.6`, 한국어 소스판은 `0.1.0-rc.5`를 보고했습니다. 두 명령은 서로 다른 실행 파일과 Harness 홈을 사용합니다.

## OpenCode Go 설정

`local-tools/settings.ko.yaml`은 다음 모델을 `deepseek-official` 라우트에 등록합니다.

- `deepseek-v4-flash`: 기본 모델
- `deepseek-v4-pro`: 수동 선택 가능한 고성능 모델

API 주소는 `https://opencode.ai/zen/go/v1`이며, 키는 `OPENCODE_GO_API_KEY` 자격 증명 참조로만 읽습니다. 실제 키나 자격 증명 내용은 저장소에 커밋하지 않습니다.

## 업데이트

원격 한국어 브랜치를 fast-forward로 받은 뒤 의존성과 웹 산출물을 갱신합니다.

```sh
cd "/Users/yulsol/Documents/mac maintanance/deepseek-harness-ko"
git pull --ff-only origin local/korean-ui
pnpm install --frozen-lockfile
pnpm run build
```

원본 변경을 가져올 때는 `upstream/master`와의 충돌을 먼저 검토합니다. 로케일 타입이 `zh`와 `en`만 전제로 바뀌었거나 새 UI 패키지가 추가되면 한국어 사전과 `packages/client/locale/tests/korean-coverage.spec.ts`를 함께 갱신해야 합니다.

## 검증 기록

한국어판 마일스톤 `7231370053`과 handoff 보강 `3c604c6279`에서 다음 결과를 기록했습니다.

| 검증 | 결과 |
|---|---|
| 한국어 집중 테스트 | 855 passed |
| GUI 테스트 | 3,761 passed, 4 skipped |
| 타입 검사 | 통과 |
| lint | 2,461 files, 오류·경고 0건 |
| 문서 검사 | 28 passed |
| 웹 replay e2e | 254 passed, 15 skipped |

`ko-KR` 실제 브라우저에서는 `설정`, `한국어`, `English`, `中文` 표시와 주요 화면의 중국어 잔여물 부재를 확인했습니다. 자세한 실행 증거와 플레이크 판정은 [최종 handoff](local-notes/handoff-2026-08-16.ko.md)에 있습니다.

## 알려진 제한

- `ui-trajectory` 상세 화면에는 `Input`, `Model`, `Tools`, `No timing data`, `Event details`, `Status`, `Provider`, `System Prompt`, `Tool Call` 같은 정적 영어 문구가 남아 있습니다. 하위 컴포넌트와 테스트 픽스처 전체에 번역 함수를 전달해야 하므로 별도 작업으로 분리했습니다.
- 전체 웹 테스트에서 minimal-preset 종료가 한 차례 120초를 넘었으나 단독 실행과 최종 전체 실행에서는 재현되지 않았습니다. 현재는 부하 플레이크로 분류하며, 두 번 연속 재발할 때 dispose 단계 계측을 시작합니다.
- Pro 모델을 workflow 자식 에이전트로 직접 호출한 시도는 `null` 실패로 끝났습니다. 모델·프로바이더 식별자 또는 에이전트 구성 검증이 별도 필요합니다.

정적 영어 감사 목록은 [한국어 UI 감사 기록](local-notes/korean-ui-audit.ko.md)을 참고합니다.
