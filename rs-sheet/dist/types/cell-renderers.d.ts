/** セル値がチェック状態か（TRUE / 1 / 'true' などを真とみなす） */
export function checkboxChecked(value: any): boolean;
/** チェックボックスをトグルした後に書き込む raw（真偽は TRUE/FALSE の数式リテラル） */
export function toggledCheckboxRaw(value: any): "TRUE" | "FALSE";
/** 選択肢を配列に正規化する（options.values / options.choices / 配列そのもの を許容） */
export function choiceValues(options: any): string[];
/**
 * カスタムセルレンダラを登録する（組み込みも同じAPIで実装）。
 * @param {string} name
 * @param {object} def render(el, ctx) 必須。editor / onActivate / options は任意
 * @returns {object} 登録した def
 */
export function defineCellRenderer(name: string, def: object): object;
/** 登録済みレンダラを取得する（未登録なら null） */
export function getCellRenderer(name: any): object | null;
/** チェックボックスのグリフ（☑ / ☐） */
export const CHECKBOX_ON: "\u2611";
export const CHECKBOX_OFF: "\u2610";
/** @type {Map<string, object>} セルレンダラ登録簿 */
export const cellRendererRegistry: Map<string, object>;
