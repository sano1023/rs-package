/**
 * occurrence 群を「週の帯」へ配置する（月ビュー・終日行用）。
 *
 * @param {Array<{start:number,end:number,key:string,event:object}>} occurrences
 * @param {number} weekStartDay 週の先頭の日シリアル値
 * @param {number} daysInWeek 週の日数（月ビュー=7）
 * @param {number} [maxLanes=Infinity] これを超えるレーンは hidden へ回す（"+n件" 表示用）
 * @returns {{
 *   segments: Array<{ occ: object, startCol: number, endCol: number, lane: number,
 *                     continuesBefore: boolean, continuesAfter: boolean }>,
 *   laneCount: number,
 *   hiddenByCol: number[],   // 各列の「表示しきれなかった」件数
 * }}
 */
export function layoutWeekBand(occurrences: Array<{
    start: number;
    end: number;
    key: string;
    event: object;
}>, weekStartDay: number, daysInWeek?: number, maxLanes?: number): {
    segments: Array<{
        occ: object;
        startCol: number;
        endCol: number;
        lane: number;
        continuesBefore: boolean;
        continuesAfter: boolean;
    }>;
    laneCount: number;
    hiddenByCol: number[];
};
/**
 * 1日の時間つき予定を列に割り当てる（時間グリッド用）。
 * 重なっている予定同士は同じ「クラスタ」になり、クラスタ内で列分割される。
 *
 * @param {Array<{start:number,end:number,key:string,event:object}>} occurrences その日の時間つき予定
 * @param {number} day 日シリアル値
 * @returns {Array<{ occ: object, top: number, bottom: number, col: number, cols: number }>}
 *   top/bottom は当日分（0〜1440）。日を跨ぐ場合はクリップされる
 */
export function layoutTimeGrid(occurrences: Array<{
    start: number;
    end: number;
    key: string;
    event: object;
}>, day: number): Array<{
    occ: object;
    top: number;
    bottom: number;
    col: number;
    cols: number;
}>;
/**
 * 月ビューのグリッド（週の配列）を作る。
 * @param {number} year
 * @param {number} month 1〜12
 * @param {number} [weekStart=0] 週の先頭曜日（0=日）
 * @returns {{ weeks: number[][], firstDay: number, lastDay: number }} 各週は日シリアル値7個
 */
export function monthGrid(year: number, month: number, weekStart?: number): {
    weeks: number[][];
    firstDay: number;
    lastDay: number;
};
import { MIN_PER_DAY } from './date-utils.js';
import { dayOfMinute } from './date-utils.js';
import { minuteOfDay } from './date-utils.js';
export { MIN_PER_DAY, dayOfMinute, minuteOfDay };
