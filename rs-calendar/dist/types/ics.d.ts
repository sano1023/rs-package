/** ICS の行折りを解除する（CRLF + SP/TAB の継続行） */
export function unfoldLines(text: any): string[];
/** テキスト値のエスケープ解除（\\n → 改行 等） */
export function unescapeText(value: any): string;
/** テキスト値のエスケープ */
export function escapeText(value: any): string;
/**
 * DTSTART/DTEND の値を解釈する。
 * @param {string} value '20260728' | '20260728T093000' | '20260728T003000Z'
 * @returns {{ min: number, allDay: boolean }|null} min は分シリアル値
 */
export function parseICSDate(value: string): {
    min: number;
    allDay: boolean;
} | null;
/** 'P1D' / 'PT1H30M' / 'PT45M' → 分数（簡易 DURATION） */
export function parseDuration(value: any): number | null;
/**
 * ICS テキストから VEVENT を取り出す。
 * @param {string} text
 * @returns {Array<object>} rs-calendar のイベント入力形式
 *   { id, title, description, location, start, end, allDay, rrule, exdates }
 *   start/end は分シリアル値。end は終日なら「最終日の翌日 0:00」（DTEND exclusive をそのまま保持）
 */
export function parseICS(text: string): Array<object>;
/**
 * イベント配列を ICS テキストにする。
 * @param {Array<object>} events 正規化済みイベント（events.js の normalizeEvent 形式）
 *   { id, title, description, location, start, end, allDay, rrule, exdates }
 * @param {{ prodId?: string, calName?: string }} [options]
 * @returns {string}
 */
export function buildICS(events: Array<object>, options?: {
    prodId?: string;
    calName?: string;
}): string;
