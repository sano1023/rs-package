/**
 * rs-gantt スケジューリングエンジン（純粋関数群）
 *
 * 入力（tasks/links/calendar）→ 出力（更新されたタスク配列）の純関数で、Node 単体でテストできる。
 * v0.1 のスコープ: トポロジカルソート・循環検出・FS 依存の前倒し禁止（後続を先行の終了後へ押し出す）。
 * v0.2: 依存タイプ4種（FS/SS/FF/SF）+ lag の連鎖シフト（propagate）・クリティカルパス（computeCritical）。
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
 * 依存タイプ1本が後続に課す「最も早い開始日」（日シリアル値）を返す。
 * lag は営業日（負数=リード）。dur は後続タスクの営業日数（FF/SF で終了→開始の逆算に使う）。
 *   FS: 後続開始 ≥ 先行終了の翌営業日 + lag
 *   SS: 後続開始 ≥ 先行開始 + lag
 *   FF: 後続終了 ≥ 先行終了 + lag → 開始へ逆算
 *   SF: 後続終了 ≥ 先行開始 + lag → 開始へ逆算
 * @param {{type?:string, lag?:number}} link
 * @param {{start:number, end:number}} pred 先行の現在位置
 * @param {number} dur 後続の営業日数
 * @param {import('./calendar.js').Calendar} calendar
 */
export function impliedStart(link: {
    type?: string;
    lag?: number;
}, pred: {
    start: number;
    end: number;
}, dur: number, calendar: import("./calendar.js").Calendar): any;
/**
 * 自動スケジューリング（v0.2）: 依存タイプ4種 + lag の連鎖シフト（前倒し禁止）。
 * 依存順に各タスクを見て、全ての先行制約が課す最早開始より前に始まる後続を押し出す。
 * duration（営業日数）は維持し、先に動いたタスクの新位置が後続へ連鎖する。
 *
 * @param {Array} tasks  { id, _start, _end, milestone? }（日シリアル値）を持つ内部タスク
 * @param {Array} links  validateLinks 済み（循環なし）の依存リンク
 * @param {import('./calendar.js').Calendar} calendar
 * @returns {Array<{id, start, end}>} 変更があったタスクの新しい日程（日シリアル値）
 */
export function propagate(tasks: any[], links: any[], calendar: import("./calendar.js").Calendar): Array<{
    id: any;
    start: any;
    end: any;
}>;
/**
 * FS 依存の前倒し禁止（v0.1 互換の薄いラッパ）。FS リンクだけを propagate に渡す。
 * @deprecated 内部では propagate を使う。後方互換・単体テスト用に残す。
 */
export function enforceFS(tasks: any, links: any, calendar: any): {
    id: any;
    start: any;
    end: any;
}[];
/**
 * クリティカルパス（CPM: 前進/後退パスによる総余裕=0 のタスク/リンク）。
 * 現在スケジュール済みの開始/終了を「最早（ES/EF）」とみなし、後退パスで最遅（LS/LF）を求める。
 * 総余裕 LS−ES ≤ 0 のタスクをクリティカル、両端がクリティカルで拘束的なリンクをクリティカルとする。
 * サマリー/未スケジュール（_start==null）は対象外。
 *
 * @param {Array} tasks 内部タスク（_start/_end/milestone）
 * @param {Array} links validateLinks 済みリンク
 * @param {import('./calendar.js').Calendar} calendar
 * @returns {{ tasks: Set, links: Set, slack: Map<any, number> }}
 */
export function computeCritical(tasks: any[], links: any[], calendar: import("./calendar.js").Calendar): {
    tasks: Set<any>;
    links: Set<any>;
    slack: Map<any, number>;
};
