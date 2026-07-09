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
/** 日シリアル値 + 当日分 → 分シリアル値 */
export function minutesToSerial(serial: any, minuteOfDay?: number): number;
/** 分シリアル値 → 日シリアル値 */
export function dayOfMinute(minSerial: any): number;
/** 分シリアル値 → 当日分（0〜1439） */
export function minuteOfDay(minSerial: any): number;
/**
 * 入力（'YYYY-MM-DD HH:MM' / 'YYYY-MM-DDTHH:MM(:SS)' / 'YYYY-MM-DD' / Date / タイムスタンプ）→ 分シリアル値。
 * 時刻が無ければ 00:00。解釈できなければ null。
 */
export function parseDateTime(input: any): number | null;
/** 分シリアル値 → 'YYYY-MM-DD HH:MM' */
export function formatDateTime(minSerial: any): string;
/** 分シリアル値 → 'HH:MM'（当日分のみ） */
export function formatTime(minSerial: any): string;
/** 今日の日シリアル値（ローカル日付基準） */
export function todaySerial(): number;
/** その月の日数 */
export function daysInMonth(y: any, m: any): number;
export const MIN_PER_DAY: 1440;
export const WEEKDAY_JP: string[];
