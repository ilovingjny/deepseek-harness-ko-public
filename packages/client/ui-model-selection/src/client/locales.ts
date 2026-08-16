/**
 * `model` namespace dictionaries.
 *
 * `trigger.selectAria` reads identically to `trigger.fallback` today and is
 * still a separate key: the visible fallback label and the accessible name of
 * an unset trigger are free to diverge per locale, and folding it into
 * `trigger.aria` would announce the degenerate "Select model, current Select
 * model".
 */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'command.description': '选择本会话使用的模型',
  'option.loadError': '目录加载失败：{message}',
  'trigger.fallback': '选择模型',
  'trigger.selectAria': '选择模型',
  'trigger.aria': '选择模型，当前 {model}',
  'trigger.ariaEffort': '选择模型，当前 {model}，推理等级 {effort}',
  'menu.aria': '模型与推理等级',
  'menu.model': '模型',
  'menu.effort': '推理等级',
  'effort.providerDefault': 'Default',
  'status.loading': '正在刷新模型列表…',
  'error.action': '模型操作失败：{message}',
  'action.reload': '重新加载',
  'warning.groupLoad': '{name} 加载失败：{message}',
  'empty.models': '没有可用的模型。',
  'blocked.composer': '当前模型不可用，请先选择模型',
  'empty.efforts': '当前模型未提供推理等级。',
} satisfies Record<string, string>

/** The model namespace key union. */
export type ModelKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'command.description': 'Select the model for this conversation',
  'option.loadError': 'Catalog failed to load: {message}',
  'trigger.fallback': 'Select model',
  'trigger.selectAria': 'Select model',
  'trigger.aria': 'Select model, current {model}',
  'trigger.ariaEffort': 'Select model, current {model}, reasoning effort {effort}',
  'menu.aria': 'Model and reasoning effort',
  'menu.model': 'Model',
  'menu.effort': 'Effort',
  'effort.providerDefault': 'Default',
  'status.loading': 'Refreshing model list…',
  'error.action': 'Model operation failed: {message}',
  'action.reload': 'Reload',
  'warning.groupLoad': '{name} failed to load: {message}',
  'empty.models': 'No models available.',
  'blocked.composer': 'This model is unavailable — select one to continue',
  'empty.efforts': 'This model provides no reasoning effort levels.',
} satisfies Record<ModelKey, string>

/** Korean dictionary. */
export const ko = {
  'command.description': '이 대화에서 사용할 모델 선택',
  'option.loadError': '카탈로그를 불러오지 못했습니다: {message}',
  'trigger.fallback': '모델 선택',
  'trigger.selectAria': '모델 선택',
  'trigger.aria': '모델 선택, 현재 {model}',
  'trigger.ariaEffort': '모델 선택, 현재 {model}, 추론 수준 {effort}',
  'menu.aria': '모델 및 추론 수준',
  'menu.model': '모델',
  'menu.effort': '추론 수준',
  'effort.providerDefault': '기본값',
  'status.loading': '모델 목록 새로 고치는 중…',
  'error.action': '모델 작업에 실패했습니다: {message}',
  'action.reload': '다시 불러오기',
  'warning.groupLoad': '{name}을(를) 불러오지 못했습니다: {message}',
  'empty.models': '사용 가능한 모델이 없습니다.',
  'blocked.composer': '현재 모델을 사용할 수 없습니다. 계속하려면 모델을 선택하세요',
  'empty.efforts': '현재 모델은 추론 수준을 제공하지 않습니다.',
} satisfies Record<ModelKey, string>
