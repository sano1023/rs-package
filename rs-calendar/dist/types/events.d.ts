/**
 * イベント入力を正規化する。
 * @param {object} input
 *   { id?, title, start, end?, allDay?, color?, rrule?, exdates?, editable?, ...meta }
 *   start/end: 'YYYY-MM-DD'（終日扱い） / 'YYYY-MM-DD HH:MM' / Date / 分シリアル値
 * @returns {object} 正規化済みイベント
 */
export function normalizeEvent(input: object): object;
/** イベント配列を正規化する */
export function normalizeEvents(list: any): object[];
/**
 * 表示範囲の occurrence を作る（繰り返しを展開・範囲外を除外・開始順）。
 * @param {object[]} events 正規化済みイベント
 * @param {number} rangeStartDay 日シリアル値（含む）
 * @param {number} rangeEndDay 日シリアル値（含む）
 * @returns {Array<{ event: object, start: number, end: number, key: string }>}
 */
export function occurrencesInRange(events: object[], rangeStartDay: number, rangeEndDay: number): Array<{
    event: object;
    start: number;
    end: number;
    key: string;
}>;
