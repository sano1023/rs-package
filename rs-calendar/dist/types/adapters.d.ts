/**
 * rs-gantt のタスク配列をカレンダーの終日イベントへ変換する。
 * サマリータスク（start なし）とマイルストーン以外を対象にし、duration（稼働日数ではなく
 * 暦日として単純加算）を end に展開する。
 *
 * @param {Array<object>} tasks rs-gantt の tasks
 * @param {{ color?: string, milestoneColor?: string }} [options]
 * @returns {object[]} createRSCalendar の events に渡せる配列
 */
export function eventsFromGanttTasks(tasks: Array<object>, options?: {
    color?: string;
    milestoneColor?: string;
}): object[];
/**
 * カレンダーのイベントを rs-gantt のタスク配列へ変換する（終日・時間つきの両方対応）。
 * @param {object[]} events 正規化済み or 入力形式のイベント
 * @returns {Array<object>} rs-gantt の tasks に渡せる配列
 */
export function ganttTasksFromEvents(events: object[]): Array<object>;
/**
 * rs-report で印刷できる「月間予定表」を組み立てる。
 *
 *   const { template, data } = monthlyReportData(cal.getEvents(), 2026, 7);
 *   createRSReport('#print', { template, data });   // または renderReport(template, data)
 *
 * 1行 = 1日（曜日・祝日名・予定を「、」区切り）。土日祝は行に色がつく。
 *
 * @param {object[]} events 正規化済み or 入力形式のイベント
 * @param {number} year
 * @param {number} month 1〜12
 * @param {{ title?: string }} [options]
 * @returns {{ template: object, data: { rows: object[], params: object } }}
 */
export function monthlyReportData(events: object[], year: number, month: number, options?: {
    title?: string;
}): {
    template: object;
    data: {
        rows: object[];
        params: object;
    };
};
