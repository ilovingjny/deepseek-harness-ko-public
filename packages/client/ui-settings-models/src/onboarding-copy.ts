/** Durable settings namespace for product-wide GUI onboarding facts. */
export const WELCOME_NOTICE_SETTINGS_NAMESPACE = 'ui-onboarding'

/** Field storing the last welcome notice version the user acknowledged. */
export const WELCOME_NOTICE_ACK_FIELD = 'welcomeNoticeVersion'

/**
 * Bump only when the notice changes materially and every user should see it
 * again. The acknowledgement is compared for exact equality.
 */
export const WELCOME_NOTICE_VERSION = '2026-08-13.1'

/** The complete editable internal-testing notice in every supported GUI locale. */
export const WELCOME_NOTICE_COPY = {
  zh: {
    title: '内测声明',
    body: 'DeepSeek Harness 目前的 0.1 版本仍处在面向 Harness 开发者进行测试的阶段，还有许多地方需要持续改进和打磨，希望听取广大开发者的反馈建议。预计 DeepSeek Harness 的核心插件以及基础 API 都会在接下来的一段时间内快速迭代、持续演化。\n\n我们期待与全球开发者一起，在开源、开放、可复用、可组合的基础设施之上，共同探索智能上限。欢迎全球 Harness 开发者加入 DSH 插件生态。',
    continueLabel: '继续',
  },
  en: {
    title: 'Internal Testing Notice',
    body: "DeepSeek Harness 0.1 remains in testing for Harness developers. Many areas need further improvement, and we welcome feedback from the developer community. DeepSeek Harness's core plugins and foundational APIs will continue to evolve rapidly over the coming months.\n\nWe look forward to exploring the limits of intelligence with developers around the world, building on open-source, open, reusable, and composable infrastructure. We welcome Harness developers everywhere to join the DSH plugin ecosystem.",
    continueLabel: 'Continue',
  },
  ko: {
    title: '내부 테스트 안내',
    body: 'DeepSeek Harness 0.1은 아직 Harness 개발자를 대상으로 테스트 중입니다. 계속 개선하고 다듬어야 할 부분이 많으니 개발자 여러분의 의견을 기다립니다. DeepSeek Harness의 핵심 플러그인과 기반 API는 앞으로도 빠르게 발전해 나갈 예정입니다.\n\n오픈 소스 기반의 개방적이고 재사용 가능하며 조합 가능한 인프라 위에서, 전 세계 개발자와 함께 지능의 한계를 탐구하고자 합니다. 어디서든 Harness 개발자 여러분의 DSH 플러그인 생태계 참여를 환영합니다.',
    continueLabel: '계속',
  },
} as const
