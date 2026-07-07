export function isError(v: any): v is RSError;
/**
 * rs-sheet エラー型 — 数式エラーを第一級の値として扱う
 *
 * エラーは例外ではなく「値」としてセルに入り、演算子・関数を素通しで伝播する。
 * IFERROR / ISERROR / COUNT 系だけが捕捉できる（functions.js 側の実装）。
 */
/** Excel互換のエラーコード一覧 */
export const ERROR_CODES: string[];
export class RSError {
    /** @param {string} code '#DIV/0!' 等 */
    constructor(code: string);
    code: string;
    toString(): string;
}
/** よく使うエラーはシングルトンを使い回す */
export const ERR: {
    [k: string]: RSError;
};
