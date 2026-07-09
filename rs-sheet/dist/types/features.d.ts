/** '#rrggbb' / '#rgb' → {r,g,b}。不正なら null */
export function hexToRgb(hex: any): {
    r: number;
    g: number;
    b: number;
} | null;
/** {r,g,b} → '#rrggbb' */
export function rgbToHex({ r, g, b }: {
    r: any;
    g: any;
    b: any;
}): string;
/** 2色を t(0..1) で補間した '#rrggbb' */
export function lerpColor(c1: any, c2: any, t: any): any;
/** 数値配列から {min, max}（数値なしは null） */
export function rangeStats(values: any): {
    min: number;
    max: number;
} | null;
/**
 * カラースケールの背景色。
 * @param {number} value
 * @param {{min:number,max:number}} stats
 * @param {{minColor, maxColor, midColor?}} opts
 */
export function colorScaleBg(value: number, stats: {
    min: number;
    max: number;
}, opts: {
    minColor: any;
    maxColor: any;
    midColor?: any;
}): any;
/** データバーの充填率（0..1）。負値も 0..1 に正規化（min..max の線形） */
export function dataBarRatio(value: any, stats: any): number;
/**
 * セル値ルールの判定。
 * @param {*} value セルの評価済み実値
 * @param {{op, value, value2?}} rule op: > >= < <= = <> between notBetween contains notContains
 * @returns {boolean}
 */
export function evalCellValueRule(value: any, rule: {
    op: any;
    value: any;
    value2?: any;
}): boolean;
/**
 * 値が検証ルールを満たすか。
 * @param {*} value セルの実値
 * @param {object} v {type:'list', values:[...]} | {type:'number', op, min, max?} | {type:'textLength', ...}
 * @returns {{ok:boolean, message:string}}
 */
export function validateValue(value: any, v: object): {
    ok: boolean;
    message: string;
};
/** 型を考慮した昇順比較。空 < 数値 < 文字列 < 真偽（Excel順）。ソートに使う */
export function compareValues(a: any, b: any): number;
/**
 * 行配列（[{key, cells:[...]}, ...]）をキーで安定ソートして返す。
 * @param {Array<{key, cells}>} rows
 * @param {'asc'|'desc'} order
 */
export function sortRowsByKey(rows: Array<{
    key: any;
    cells: any;
}>, order?: "asc" | "desc"): {
    key: any;
    cells: any;
}[];
