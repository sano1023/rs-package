/** イベント1件の形を検証する */
export function isValidEvent(ev: any): boolean;
/**
 * セッションJSONを検証する。
 * @returns {{ok: boolean, errors: string[]}}
 */
export function validateSession(session: any): {
    ok: boolean;
    errors: string[];
};
/** セッション → JSON文字列 */
export function sessionToJSON(session: any): string;
/** JSON文字列 → セッション（検証込み。versionの不一致は明示エラー） */
export function sessionFromJSON(str: any): any;
/**
 * チャンクを組み立てる。seq=0 のみ meta / snapshot を含む。
 */
export function makeChunk(sessionId: any, seq: any, events: any, first: any): {
    version: number;
    sessionId: any;
    seq: any;
    events: any;
};
/**
 * チャンク列からセッションを復元する（順不同可・連番と一貫性を検証）。
 * @param {Array} chunks
 * @returns {object} session
 */
export function mergeChunks(chunks: any[]): object;
/**
 * 時刻 t 以下のイベントをすべて適用し終えた位置（次に適用すべきindex）を
 * 二分探索で返す。events は t 昇順であること。
 */
export function indexForTime(events: any, t: any): number;
/**
 * マウス移動の直線区間の間引き判定。
 * 直近2点 a → b があり、新しい点 p を足すとき、b が線分 a→p 上に
 * ほぼ載っている（許容 tol px）なら b は冗長 = b を p で置き換えてよい。
 * @param {{x,y}} a  2つ前の点
 * @param {{x,y}} b  直前の点
 * @param {{x,y}} p  新しい点
 * @param {number} [tol] 許容距離(px)
 */
export function isRedundantMove(a: {
    x: any;
    y: any;
}, b: {
    x: any;
    y: any;
}, p: {
    x: any;
    y: any;
}, tol?: number): boolean;
/**
 * rs-replay イベント/セッション/チャンクのユーティリティ
 *
 * セッションJSONスキーマ（REQUIREMENTS §3 決定事項）:
 *   {
 *     version: 1,
 *     meta: { startedAt, url, viewport: { w, h }, userAgent },
 *     snapshot: { node: {...} },
 *     events: [ { t, type, data }, ... ]   // t は記録開始からの相対ms・昇順
 *   }
 * チャンク: { version, sessionId, seq, events }（seq=0 のみ meta / snapshot を含む）
 *
 * このモジュールはDOMに依存しない純関数のみ（node:test で単体テスト可能）。
 */
export const SCHEMA_VERSION: 1;
export namespace EV {
    let MUTATION: string;
    let MOVE: string;
    let CLICK: string;
    let SCROLL: string;
    let INPUT: string;
    let RESIZE: string;
    let ROUTE: string;
    let ERROR: string;
}
