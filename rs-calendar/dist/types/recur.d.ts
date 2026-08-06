/**
 * RRULE 文字列を解析する。
 * @param {string|object} src 'FREQ=WEEKLY;BYDAY=MO' または解析済みオブジェクト
 * @returns {{ freq: string, interval: number, count: number|null, until: number|null,
 *             byday: Array<{ord: number|null, dow: number}>|null, bymonthday: number[]|null, bymonth: number[]|null }}
 */
export function parseRRule(src: string | object): {
    freq: string;
    interval: number;
    count: number | null;
    until: number | null;
    byday: Array<{
        ord: number | null;
        dow: number;
    }> | null;
    bymonthday: number[] | null;
    bymonth: number[] | null;
};
/** ルールを RRULE 文字列に戻す（ICS 書き出し用） */
export function ruleToString(rule: any): string;
/**
 * RRULE を展開して occurrence の開始日（日シリアル値・昇順）を返す。
 * dtstart 自身も（範囲内なら）含まれる。COUNT は dtstart を 1 個目として数える。
 *
 * @param {object|string} ruleSrc parseRRule に渡せるもの
 * @param {number} dtstart 初回の日シリアル値
 * @param {number} rangeStart 取得範囲（日シリアル値・含む）
 * @param {number} rangeEnd 取得範囲（日シリアル値・含む）
 * @param {number[]} [exdates] 除外日（日シリアル値）
 * @returns {number[]}
 */
export function expandRRule(ruleSrc: object | string, dtstart: number, rangeStart: number, rangeEnd: number, exdates?: number[]): number[];
