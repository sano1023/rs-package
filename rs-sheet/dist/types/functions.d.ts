/** 数値へ変換。変換不能は #VALUE!、エラーはそのまま throw */
export function toNum(v: any): number;
/** 文字列へ変換 */
export function toStr(v: any): string;
/** 真偽値へ変換（IF の条件等） */
export function truthy(v: any): boolean;
/** Matrix をスカラー文脈で使う場合の収束。1x1 のみ許可 */
export function collapse(v: any): any;
/**
 * 引数列から数値を収集する（SUM/AVERAGE/MAX/MIN/COUNT 系の共通規則）。
 * - 直接引数: 数値・数値文字列・真偽値を数値化（不能は #VALUE!）
 * - 範囲(Matrix)の中身: 数値のみ採用（文字列・真偽・空は無視）。エラーは throw で伝播
 */
export function numbersIn(args: any): number[];
/**
 * 条件式（'>10' '<>x' 'A*' 10 等）→ 判定関数。ワイルドカード * ? 対応
 */
export function makeCriteria(criteria: any): (v: any) => boolean;
/**
 * ワークシート関数を登録する（公開API）。
 * @param {string} name 関数名（大文字小文字は区別しない）
 * @param {Function} fn 通常: (...値) => 値。raw: (args, ctx) => 値。lazy: (argNodes, ctx) => 値
 * @param {object} opts { minArgs=0, maxArgs=Infinity, lazy=false, acceptErrors=false, raw=false }
 */
export function defineFunction(name: string, fn: Function, opts?: object): void;
/** 範囲評価の結果（2次元の値行列） */
export class Matrix {
    /** @param {Array<Array>} values 2次元配列 */
    constructor(values: Array<any[]>);
    values: any[][];
    rows: number;
    cols: number;
    get(r: any, c: any): any;
    /** 全要素をフラットに列挙 */
    flat(): Generator<any, void, unknown>;
}
/** @type {Map<string, {fn, minArgs, maxArgs, lazy, acceptErrors, raw}>} */
export const registry: Map<string, {
    fn: any;
    minArgs: any;
    maxArgs: any;
    lazy: any;
    acceptErrors: any;
    raw: any;
}>;
