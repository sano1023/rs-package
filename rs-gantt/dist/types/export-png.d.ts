/**
 * ガントのタイムラインを canvas に描画して返す。
 * @param {import('./gantt.js').Gantt} gantt
 * @param {object} [opts]
 * @param {boolean} [opts.labels=true] 左に WBS/タスク名の列を描く
 * @param {number} [opts.labelWidth=240] ラベル列の幅(px)
 * @param {number} [opts.scale] 解像度倍率（既定 devicePixelRatio、最大2）
 * @param {string} [opts.background] 背景色（既定 白）
 * @returns {HTMLCanvasElement}
 */
export function renderToCanvas(gantt: import("./gantt.js").Gantt, opts?: {
    labels?: boolean | undefined;
    labelWidth?: number | undefined;
    scale?: number | undefined;
    background?: string | undefined;
}): HTMLCanvasElement;
