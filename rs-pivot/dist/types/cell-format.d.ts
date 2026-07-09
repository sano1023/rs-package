/**
 * ヒートマップ着色レンダラを作る。
 * @param {object} opts { vi?, min?: '#hex', max?: '#hex', includeTotals?: boolean }
 * @returns {(td, cell, ctx) => void}
 */
export function heatmap(opts?: object): (td: any, cell: any, ctx: any) => void;
/**
 * データバー（セル内の横棒）レンダラを作る。
 * @param {object} opts { vi?, color?: '#hex', includeTotals?: boolean }
 * @returns {(td, cell, ctx) => void}
 */
export function dataBar(opts?: object): (td: any, cell: any, ctx: any) => void;
/** 複数のレンダラを1つに合成する（順に適用） */
export function combineRenderers(...renderers: any[]): (td: any, cell: any, ctx: any) => void;
