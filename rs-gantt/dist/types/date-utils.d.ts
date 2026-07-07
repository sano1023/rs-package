/** y/m/d（m は 1〜12）→ 日シリアル値 */
export function ymdToSerial(y: any, m: any, d: any): number;
/** 日シリアル値 → { y, m, d }（m は 1〜12） */
export function serialToYMD(serial: any): {
    y: number;
    m: number;
    d: number;
};
/**
 * 入力（'YYYY-MM-DD' 文字列 / Date / タイムスタンプ）→ 日シリアル値。
 * 解釈できなければ null を返す。
 */
export function parseDate(input: any): number | null;
/** 日シリアル値 → 'YYYY-MM-DD' */
export function formatDate(serial: any): string;
/** 曜日（0=日 〜 6=土）。1970-01-01 は木曜（=4） */
export function dayOfWeek(serial: any): number;
/** 今日の日シリアル値（ローカル日付基準） */
export function todaySerial(): number;
/** その月の日数 */
export function daysInMonth(y: any, m: any): number;
export const WEEKDAY_JP: string[];
