/** Copy dictionaries for the plugin inventory Settings section. */

/** Simplified Chinese dictionary and key source of truth. */
export const zh = {
  tab: '插件列表',
  loading: '正在读取插件…',
  error: '暂时无法读取插件。',
  retry: '重试',
  search: '搜索插件',
  catalog: '插件列表',
  empty: '暂无插件。',
  emptySearch: '没有匹配的插件。',
  enabledTag: '已启用',
  disabledTag: '已停用',
  configuration: '配置状态',
  cordis: 'Cordis 状态',
  unobserved: '未挂载',
  pending: '等待依赖',
  loadingPhase: '加载中',
  active: '已挂载',
  failed: '挂载失败',
  unloading: '卸载中',
} satisfies Record<string, string>

/** Plugin inventory locale key union. */
export type PluginInventoryLocaleKey = keyof typeof zh

/** English dictionary checked against the Chinese key set. */
export const en = {
  tab: 'Plugin list',
  loading: 'Reading plugins…',
  error: 'Plugins are temporarily unavailable.',
  retry: 'Retry',
  search: 'Search plugins',
  catalog: 'Plugin list',
  empty: 'No plugins are available.',
  emptySearch: 'No matching plugins.',
  enabledTag: 'Enabled',
  disabledTag: 'Disabled',
  configuration: 'Configuration',
  cordis: 'Cordis status',
  unobserved: 'Not mounted',
  pending: 'Waiting for dependencies',
  loadingPhase: 'Loading',
  active: 'Mounted',
  failed: 'Mount failed',
  unloading: 'Unloading',
} satisfies Record<PluginInventoryLocaleKey, string>

/** Korean dictionary. */
export const ko = {
  tab: '플러그인 목록',
  loading: '플러그인 읽는 중…',
  error: '플러그인을 읽을 수 없습니다.',
  retry: '다시 시도',
  search: '플러그인 검색',
  catalog: '플러그인 목록',
  empty: '사용 가능한 플러그인이 없습니다.',
  emptySearch: '일치하는 플러그인이 없습니다.',
  enabledTag: '사용 중',
  disabledTag: '사용 안 함',
  configuration: '구성 상태',
  cordis: 'Cordis 상태',
  unobserved: '마운트되지 않음',
  pending: '의존성 대기 중',
  loadingPhase: '불러오는 중',
  active: '마운트됨',
  failed: '마운트 실패',
  unloading: '언마운트 중',
} satisfies Record<PluginInventoryLocaleKey, string>
