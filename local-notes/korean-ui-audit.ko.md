# 한국어 UI 정적 문구 감사

검사 범위: `packages/**/src/client` 아래의 TS/TSX 사용자 화면. 로케일 사전 자체, 테스트 픽스처, 프로토콜 값, 모델명, 명령어, 로그·개발자 오류 문구는 화면 번역 대상에서 제외했습니다.

## 이번 단계에서 로케일 좌석으로 옮긴 문구

- Cordis 실행·중지·삭제 카드의 `Inspect` 접근성 라벨을 `cordis.action.inspect`로 이동했습니다.
- 세션 로그 다운로드 버튼의 `Session log`를 `session-log-download.action.sessionLog`로 이동했습니다. 한국어 UI에서는 `세션 로그`로 표시하고, 파일 형식 `ZIP`은 기술 명칭으로 보존합니다.
- Skill 도구 카드의 제목과 `Inspect` 버튼을 `skill.row.title`, `skill.action.inspect`로 이동했습니다. 한국어에서는 각각 `스킬`, `상세 보기`로 표시합니다.
- 계획 모드 종료 실패 안내를 `plan.chip.exitFailed`로 이동했습니다. `/plan`과 `/plan off` 명령어는 그대로 둡니다.

## 의도적으로 보존한 영어 또는 기술 표기

- API URL 예시, 제공자·모델명, 세션·플러그인 식별자, 파일 확장자와 ZIP, `IN`/`OUT` 같은 입출력 표기, 코드·도구 출력은 번역하지 않습니다.
- 사용자가 직접 입력하거나 모델이 생성한 제목·요약·오류 메시지는 원문 데이터이므로 사전 번역을 적용하지 않습니다.
- `ui-trajectory`의 상세 시간선·이벤트 검사기에는 여전히 정적 영어 레이블이 있습니다. 이 패키지는 `TrajectoryTable`과 모든 테스트 호출부에 로케일 좌석을 추가해야 하므로, 이번 단계에서는 타입 안전한 중간 상태를 남기지 않기 위해 수정하지 않았습니다. 현재 알려진 예시는 `Input`, `Model`, `Tools`, `No timing data`, `Event details`, `Status`, `Provider`, `System Prompt`, `Tool Call` 등입니다.

## 남은 위험과 후속 작업

- 위 `ui-trajectory` 정적 문구는 한국어 선택 상태에서도 영어로 보일 수 있습니다. 다음 작업에서 `TrajectoryView`가 받은 `t`를 Timeline/Table 하위 컴포넌트와 테스트 픽스처까지 전달하고, 상세 사전 키를 추가해야 합니다.
- 전체 TSX 정규식 검색 결과에는 접근성 문구처럼 보이지만 실제로는 개발자용 카탈로그 설명이나 테스트 픽스처인 문자열도 섞여 있습니다. 이들은 사용자 화면에 노출되는 경로를 확인하기 전까지 번역하지 않는 것이 안전합니다.

## 확인

- `pnpm run typecheck` 통과 (`rc=0`)
- `ui-trajectory` 변경은 위 사유로 되돌린 뒤 확인했으며, 기존 테스트용 `packages/client/locale/tests/korean-coverage.spec.ts`는 건드리지 않았습니다.
