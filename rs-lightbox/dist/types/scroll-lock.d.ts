/**
 * 本文スクロールをロックする。既にロック済みなら参照カウントを増やすだけ。
 * @param {Document} doc
 */
export function lockScroll(doc: Document): void;
/**
 * ロックを解除する。参照カウントが 0 になったときだけ実際に復元する。
 * @param {Document} doc
 */
export function unlockScroll(doc: Document): void;
/**
 * このインスタンスがロックしているか（destroy 時の後始末判定用）に依存せず、
 * 強制的に1カウント解除するためのヘルパ。unlockScroll と同一。
 * @param {Document} doc
 */
export function isScrollLocked(doc: Document): boolean;
