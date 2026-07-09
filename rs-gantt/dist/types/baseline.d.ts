/**
 * rs-gantt ベースライン（計画スナップショット）比較（純粋関数群）
 *
 * 計画時点の日程を保存し、現在の日程との差（遅延日数）を営業日で計算する。
 * DOM に依存しないため Node 単体でテストできる。
 */
/**
 * 現在のスケジュールをベースラインとして切り出す。
 * @param {Array} tasks 内部タスク（_start/_end/progress/milestone を持つ）
 * @returns {Array<{id, start:number, end:number, progress:number|null, milestone:boolean}>}
 *          （日シリアル値。未スケジュール _start==null は除外）
 */
export function captureBaseline(tasks: any[]): Array<{
    id: any;
    start: number;
    end: number;
    progress: number | null;
    milestone: boolean;
}>;
/**
 * 終了日の差を営業日数で返す（正=遅延・負=前倒し・0=計画通り）。
 * 例: 金→翌月 = +1、1営業週ぶんの後ろ倒し = +5。
 * @param {number|null} baseEnd 計画終了（日シリアル値）
 * @param {number|null} curEnd 現在終了（日シリアル値）
 * @param {import('./calendar.js').Calendar} calendar
 */
export function endDelta(baseEnd: number | null, curEnd: number | null, calendar: import("./calendar.js").Calendar): number;
/**
 * ベースラインと現在タスクの差分（開始・終了・期間）。遅延日数列や表示に使う。
 * @returns {{startDelta:number, endDelta:number, durationDelta:number}}
 */
export function baselineVariance(baseEntry: any, task: any, calendar: any): {
    startDelta: number;
    endDelta: number;
    durationDelta: number;
};
