/** {min} などのプレースホルダを展開する */
export function formatMessage(template: any, params?: {}): string;
/**
 * バリデータを定義する（組み込みも同じAPIで登録されている）。
 * fn(value, rule, ctx) が true を返せば合格。文字列を返せばその文字列がエラーメッセージ。
 * false を返した場合は rule.message → 既定メッセージの順で使う。
 * ctx = { q, answers, messages }
 */
export function defineValidator(name: any, fn: any): any;
export function getValidator(name: any): any;
/**
 * blur 時の正規化。質問タイプ・charset に応じて値を整える（純粋関数）。
 * @returns 正規化後の値
 */
export function normalizeValue(q: any, value: any): any;
/**
 * 1質問の検証（純粋関数）。
 * @param {object} q 質問定義
 * @param {*} value 正規化済みの回答値
 * @param {object} ctx { answers, messages } messages は全体上書き用
 * @returns {string[]} エラーメッセージ配列（空なら合格）
 */
export function validateQuestion(q: object, value: any, ctx?: object): string[];
export namespace DEFAULT_MESSAGES {
    let required: string;
    let pattern: string;
    let rangeMin: string;
    let rangeMax: string;
    let rangeBetween: string;
    let lengthMin: string;
    let lengthMax: string;
    let number: string;
    let email: string;
    let tel: string;
    let postal: string;
    let charset: string;
    let minSelect: string;
    let maxSelect: string;
    let date: string;
    let matrixAll: string;
}
