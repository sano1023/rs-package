/**
 * rs-player ライブ配信ユーティリティ（DOM非依存の純粋関数）
 *
 * ライブ判定・シーク可能な DVR 窓の算出・ライブエッジ判定・ピッチ保持の適用。
 * PlayerCore からこれらを使い、UI（LIVEバッジ・シークバー）は core のイベント購読で描画する。
 */
/**
 * TimeRanges 風オブジェクト（video.seekable 等）から DVR 窓を求める。
 * seekable が空なら duration をフォールバックに [0, duration] を返す。
 * @param {{length:number, start:(i:number)=>number, end:(i:number)=>number}} seekable
 * @param {number} [fallbackDuration]
 * @returns {{start:number, end:number, duration:number}}
 */
export function dvrWindow(seekable: {
    length: number;
    start: (i: number) => number;
    end: (i: number) => number;
}, fallbackDuration?: number): {
    start: number;
    end: number;
    duration: number;
};
/** ライブエッジ（seekable の末尾）の秒位置 */
export function liveEdgeTime(seekable: any, fallbackDuration: any): number;
/**
 * currentTime がライブエッジ付近か（threshold 秒以内なら true）。
 * @param {number} currentTime
 * @param {number} edge ライブエッジ秒
 * @param {number} [threshold=3]
 */
export function atLiveEdge(currentTime: number, edge: number, threshold?: number): boolean;
/**
 * ライブ配信かどうかを判定する。
 * 明示指定（forced=true/false）を最優先。無ければアダプタのライブ報告 → duration===Infinity で判定。
 * @param {{forced?:boolean, duration?:number, adapterLive?:boolean}} arg
 * @returns {boolean}
 */
export function detectLive({ forced, duration, adapterLive }?: {
    forced?: boolean;
    duration?: number;
    adapterLive?: boolean;
}): boolean;
/**
 * <video> にピッチ保持設定を適用する（標準 + ベンダープレフィックス）。
 * 倍速再生時に声のピッチを保つ（false で "早口" のピッチ変化を許す）。
 * @param {HTMLVideoElement} video
 * @param {boolean} on
 */
export function applyPreservesPitch(video: HTMLVideoElement, on: boolean): boolean;
