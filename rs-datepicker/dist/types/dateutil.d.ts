export function pad2(n: any): string;
/** 日付部分だけの複製（時刻は維持オプション） */
export function cloneDate(d: any): Date;
export function startOfDay(d: any): Date;
export function sameDay(a: any, b: any): boolean;
export function sameMonth(a: any, b: any): boolean;
export function addMonths(d: any, n: any): Date;
export function daysInMonth(year: any, month: any): number;
/** 日付キー（Map用） */
export function dayKey(d: any): string;
/** aがbより前の日か（時刻無視） */
export function beforeDay(a: any, b: any): boolean;
export function betweenDay(d: any, from: any, to: any): boolean;
/**
 * 月グリッド用の42日（6週）を返す。
 * firstDay: 週の始まり（0=日）
 */
export function monthGrid(year: any, month: any, firstDay?: number): Date[];
/**
 * トークンフォーマット: YYYY MM DD M D HH mm ddd（曜日短縮）
 */
export function formatDate(d: any, format: any, locale?: {
    months: string[];
    weekdays: string[];
    weekdaysLong: string[];
    firstDay: number;
    today: string;
    clear: string;
    apply: string;
    rangeSeparator: string;
    yearSuffix: string;
}): any;
/**
 * ゆるいパース: 2026/7/5, 2026-07-05, 2026.7.5, 2026年7月5日, 7/5(今年), 時刻付き
 * 失敗時は null。
 */
export function parseDate(text: any): Date | null;
export namespace JA_LOCALE {
    let months: string[];
    let weekdays: string[];
    let weekdaysLong: string[];
    let firstDay: number;
    let today: string;
    let clear: string;
    let apply: string;
    let rangeSeparator: string;
    let yearSuffix: string;
}
