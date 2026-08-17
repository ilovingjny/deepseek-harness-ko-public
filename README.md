# DeepSeek Harness — Korean UI Locale Pack (ko-KR)

> **Unofficial** community fork. This repository is **not** an official DeepSeek distribution. It adds a Korean browser UI on top of the upstream [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness).
>
> 비공식 커뮤니티 포크입니다. 공식 DeepSeek 배포판이 아니며, 상위 프로젝트 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)에 한국어 브라우저 UI를 얹은 저장소입니다.

## What's included / 내용

- **Korean dictionary (`ko.ts`)** based on `packages/client/locale` — common buttons/menus, settings screens, system messages
  `packages/client/locale` 기반 한국어 사전 — 공통 버튼/메뉴·설정 화면·시스템 메시지 번역
- **ko-KR auto-detection** via `locale.preference: ko`
  `locale.preference: ko` 설정 시 ko-KR 자동 감지
- **`korean-coverage` test** that catches missing translation keys
  번역 누락을 잡는 korean-coverage 테스트
- **Ready-made OpenCode Go config (`local-tools/settings.ko.yaml`)** — set `OPENCODE_GO_API_KEY` once and connect DeepSeek V4 Flash (default) / V4 Pro via `https://opencode.ai/zen/go/v1`
  OpenCode Go 사용자를 위한 즉시 연결 설정 — API 키 하나로 DeepSeek V4 Flash(기본)/V4 Pro를 바로 연결

## Notes from the work / 작업 기록

Key inventory, translation process, and verification gates are all documented. We hope these notes help not only Korean users, but also people who want to translate Harness into **their own language** — the locale structure and test approach are designed to be easy to extend.

번역 키 인벤토리·진행 과정·검증 게이트를 문서로 남겨뒀어요. 이 기록이 한국어 사용자분들뿐 아니라 **다른 언어 번역을 시도하시는 분들에게도 참고 자료가 되었으면** 하는 바람입니다. 로케일 구조와 테스트 방식이 다른 언어로 확장하기 쉽게 되어 있어요.

## Safety / 안전성

- 0 existing dictionary key/value changed; only new keys added
  기존 사전 키·값 변경 0건, 신규 키 추가만
- Full test suite 3761 passing; locale + ui-trajectory 150 passed
  전체 테스트 3761개 유지, locale+ui-trajectory 150 passed

## Feedback

Feedback is always welcome — please open an issue or start a discussion!

피드백은 언제나 환영입니다 — 이슈나 디스커션으로 남겨주세요!

---

Upstream: [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) · License: [MIT](LICENSE)