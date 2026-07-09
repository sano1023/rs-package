/**
 * スクロール位置とビューポート高から、描画すべき行スライスと上下スペーサ高を求める。
 *
 * @param {number} scrollTop     縦スクロール量(px)
 * @param {number} viewportHeight 可視領域の高さ(px)
 * @param {number} rowHeight     1行の高さ(px, 固定)
 * @param {number} total         全行数
 * @param {number} [overscan]    可視域外に余分に描く行数
 * @returns {{ first:number, last:number, topPad:number, bottomPad:number, count:number }}
 *   first..last は描画する行インデックス（両端含む・total===0 のとき last=-1）。
 *   topPad/bottomPad は上下スペーサの高さ(px)。topPad + count*rowHeight + bottomPad === total*rowHeight。
 */
export function computeVisibleRange(scrollTop: number, viewportHeight: number, rowHeight: number, total: number, overscan?: number): {
    first: number;
    last: number;
    topPad: number;
    bottomPad: number;
    count: number;
};
/**
 * rs-gantt 仮想スクロール（v0.4）
 *
 * rs-grid と同じ「上下スペーサ + 可視スライス描画」方式のための純粋関数。
 * 行高は固定（既定 32px）。左ペイン（ツリーグリッド）と右ペイン（タイムライン）で
 * まったく同じ可視レンジを共有することで、縦スクロールを同期させる。
 *
 * この関数は DOM に触れないため Node 単体でテストできる。
 */
/** 可視域の外側に余分に描く行数（スクロール時のちらつき防止） */
export const DEFAULT_OVERSCAN: 8;
