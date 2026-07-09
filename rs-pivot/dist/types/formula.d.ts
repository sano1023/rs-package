/**
 * 式をコンパイルする。
 * @param {string} expression 例: '売上 - 原価' / '(売上 - 原価) / 売上 * 100'
 * @returns {{ fields: string[], evaluate: (lookup:(name:string)=>any)=>number|null }}
 */
export function compileFormula(expression: string): {
    fields: string[];
    evaluate: (lookup: (name: string) => any) => number | null;
};
/**
 * 式が妥当かどうか（UI用）。妥当なら null、不正ならエラーメッセージ。
 */
export function validateFormula(expression: any): any;
