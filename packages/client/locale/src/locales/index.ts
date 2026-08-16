/**
 * The common-namespace dictionaries. zh is the source of truth for the key
 * set (Chinese-first repo convention); en and ko are checked complete against
 * it — a missing or extra key in either translation is a compile error.
 */
export { zh } from './zh.ts'
export { en } from './en.ts'
export { ko } from './ko.ts'
export type { CommonKey } from './zh.ts'
