export function isFormula(v: any): boolean;
/** 列インデックス → A, B, ... Z, AA, AB ... */
export function colToLetter(i: any): string;
export function letterToCol(s: any): number;
/**
 * 数式を評価する。
 * @param {string} formula '=' で始まる数式文字列
 * @param {object} ctx { cell(colIndex, rowIndex) => value }
 * @returns 値 or FormulaError
 */
export function evaluate(formula: string, ctx: object): any;
/**
 * フィル・コピー時の相対参照シフト（$付き絶対参照は固定）。
 * 文字列リテラル内は変更しない。
 */
export function adjustRefs(formula: any, dRow: any, dCol: any): string;
/**
 * rs-grid 数式エンジン（純関数・依存ゼロ）
 *
 * Excel互換の数式文字列（先頭 '='）をトークナイズ → 再帰下降パース → 評価する。
 * - セル参照: A1 / $A$1（絶対参照）、範囲: A1:B10
 * - 演算子: + - * / ^ %（後置） & （文字列結合） = <> <= >= < >
 * - 関数: SUM AVERAGE MIN MAX COUNT COUNTA IF ROUND ABS INT MOD POWER SQRT
 *         AND OR NOT LEN CONCATENATE
 * - エラー: #NAME? #VALUE! #DIV/0! #REF! #CIRC!（循環参照は評価側で検出）
 *
 * 評価コンテキスト ctx:
 *   ctx.cell(colIndex, rowIndex) → 値（依存セルの計算値。範囲外は {error:'#REF!'}）
 */
export class FormulaError {
    constructor(code: any);
    code: any;
    toString(): any;
}
