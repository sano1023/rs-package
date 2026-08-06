/**
 * 式文字列をトークン列にする。
 * @param {string} src
 * @returns {Array<{type:string, value:any, pos:number}>}
 */
export function tokenize(src: string): Array<{
    type: string;
    value: any;
    pos: number;
}>;
/**
 * 式文字列を AST にする。
 * @param {string} src
 * @returns {object} AST ルートノード
 */
export function parse(src: string): object;
/**
 * オブジェクトからドットパスで値を取り出す（危険なキーは解決しない）。
 * @param {any} obj
 * @param {string[]} path
 * @returns {any}
 */
export function getPath(obj: any, path: string[]): any;
/**
 * AST を評価する。
 * @param {object} node
 * @param {{row?:object, params?:object, vars?:object, agg?:(name:string,field:string|null,scope:string|null)=>any}} ctx
 * @returns {any}
 */
export function evaluate(node: object, ctx?: {
    row?: object;
    params?: object;
    vars?: object;
    agg?: (name: string, field: string | null, scope: string | null) => any;
}): any;
/**
 * 式文字列を評価する。構文エラー・実行時エラーは呼び出し側で表示できるよう投げる。
 * @param {string} src
 * @param {object} ctx
 * @returns {any}
 */
export function evaluateExpression(src: string, ctx: object): any;
/**
 * `{{ }}` を含むテキストを解決する。式が無ければ元の文字列をそのまま返す。
 * 式の評価に失敗しても帳票全体を落とさず、`{{!エラー}}` を埋め込む（デザイナで気づけるように）。
 * @param {string} text
 * @param {object} ctx
 * @param {{ onError?: (err: Error, src: string) => void }} [options]
 * @returns {string}
 */
export function renderTemplate(text: string, ctx: object, options?: {
    onError?: (err: Error, src: string) => void;
}): string;
/**
 * `{{ }}` を含むテキストから、値を1つだけ取り出す（書式適用のため文字列化しない）。
 * テキスト全体がちょうど1つの式のときだけ生値を返し、それ以外は null。
 * @param {string} text
 * @returns {string|null} 式本体
 */
export function soleExpression(text: string): string | null;
/** テスト用: AST キャッシュを空にする */
export function clearExpressionCache(): void;
export namespace BUILTINS {
    export function round(n: any, digits?: number): number;
    export function floor(n: any, digits?: number): number;
    export function ceil(n: any, digits?: number): number;
    export function abs(n: any): number;
    export function min(...a: any[]): number;
    export function max(...a: any[]): number;
    export function len(v: any): number;
    export function trim(v: any): string;
    export function upper(v: any): string;
    export function lower(v: any): string;
    export function substr(v: any, start: any, length: any): string;
    export function replace(v: any, from: any, to: any): string;
    export function concat(...a: any[]): string;
    export function num(v: any): number;
    export function str(v: any): string;
    export function _if(cond: any, a: any, b: any): any;
    export { _if as if };
    export function coalesce(...a: any[]): any;
    export function not(v: any): boolean;
    export function tax(amount: any, rate?: number, mode?: string): number;
}
