/** フォーマット文字列が日付系か（y/d/g/e トークン、または h:mm を含む） */
export function isDateFormat(fmt: any): boolean;
/**
 * 実値 → 表示文字列。
 * @param {*} value セルの実値（number/string/boolean/null/RSError）
 * @param {string|null} fmt フォーマット文字列
 */
export function formatValue(value: any, fmt: string | null): any;
/**
 * 入力文字列の型自動判定。
 * '1,234' '¥500' '50%' '2026/7/7' 等をフォーマット付き数値/日付にする。
 * 全角数字は半角に正規化して受け付ける。
 * @returns {{value, format?: string}} value: number|string|boolean|null
 */
export function detectInput(input: any): {
    value: any;
    format?: string;
};
/** 組み込みフォーマットの一覧（UI のフォーマットメニュー用） */
export const BUILTIN_FORMATS: {
    format: string;
    label: string;
}[];
