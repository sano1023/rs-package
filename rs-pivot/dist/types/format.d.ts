/**
 * rs-pivot 数値フォーマット（純粋関数・DOM非依存）
 *
 * 日本語業務向けスマート初期設定: 桁区切りは既定でON。
 * decimals 未指定時は整数はそのまま・小数は2桁（末尾ゼロは省く）。
 */
/**
 * フォーマッタを作る。
 * @param {object} fmt { thousands?: boolean, decimals?: number, prefix?: string, suffix?: string }
 * @returns {(v:any) => string}
 */
export function makeFormatter(fmt?: object): (v: any) => string;
/**
 * 値フィールドのフォーマッタを解決する。
 * 優先順: 値フィールド自身の format → options.format[フィールド名] → 既定。
 * 件数系（count / countDistinct 等 countLike:true）はフィールドの¥等を適用せず桁区切りのみ。
 */
export function resolveFormatter(valueDef: any, formatOptions: any): (v: any) => string;
