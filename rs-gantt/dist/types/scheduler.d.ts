/**
 * rs-gantt スケジューリングエンジン（純粋関数群）
 *
 * 入力（tasks/links/calendar）→ 出力（更新されたタスク配列）の純関数で、Node 単体でテストできる。
 * v0.1 のスコープ: トポロジカルソート・循環検出・FS 依存の前倒し禁止（後続を先行の終了後へ押し出す）。
 * 連鎖シフトの完全対応・4種依存タイプ・クリティカルパスは v0.2。
 */
/**
 * リンクの検証。存在しない ID への参照と循環に加わるリンクを除外して返す。
 * @returns {{ valid: Array, dropped: Array<{link, reason}> }}
 */
export function validateLinks(tasks: any, links: any): {
    valid: any[];
    dropped: Array<{
        link: any;
        reason: any;
    }>;
};
/**
 * トポロジカルソート（Kahn 法）。links は循環なしを前提（validateLinks 済みのものを渡す）。
 * @returns {Array} タスク ID の依存順配列
 */
export function topoSort(tasks: any, links: any): any[];
/**
 * FS 依存の前倒し禁止（v0.1 の autoSchedule）。
 * 各タスクを依存順に見て、FS 先行タスクの終了より前に始まる後続を
 * 「先行の終了の翌営業日 + lag（営業日）」まで押し出す。duration（営業日数）は維持する。
 *
 * @param {Array} tasks  { id, _start, _end }（日シリアル値）を持つ内部タスク。milestone は _start=_end
 * @param {Array} links  validateLinks 済みの FS リンク
 * @param {import('./calendar.js').Calendar} calendar
 * @returns {Array<{id, start, end}>} 変更があったタスクの新しい日程（日シリアル値）
 */
export function enforceFS(tasks: any[], links: any[], calendar: import("./calendar.js").Calendar): Array<{
    id: any;
    start: any;
    end: any;
}>;
