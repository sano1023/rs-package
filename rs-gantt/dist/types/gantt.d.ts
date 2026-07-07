export class Gantt {
    constructor(target: any, options?: {});
    target: any;
    listeners: {};
    destroyed: boolean;
    rowHeight: number;
    calendar: Calendar;
    zoom: any;
    autoSchedule: boolean;
    readOnly: boolean;
    columnRegistry: Map<any, any>;
    columns: any[];
    overlays: any[];
    selectedId: any;
    selectedLinkId: any;
    undoStack: any[];
    redoStack: any[];
    grid: TaskGrid;
    timeline: Timeline;
    drag: DragController;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    _buildDOM(options: any): void;
    root: HTMLDivElement | undefined;
    gridEl: HTMLDivElement | undefined;
    gridWidth: any;
    splitterEl: HTMLDivElement | undefined;
    tlEl: HTMLDivElement | undefined;
    _bindEvents(): void;
    _onTlScroll: (() => void) | undefined;
    _onGridWheel: ((e: any) => void) | undefined;
    _onKeyDown: ((e: any) => void) | undefined;
    _normColumns(cols: any): any[];
    /** 入力タスク1件を内部表現へ正規化する */
    _normTask(raw: any): {
        id: any;
        name: string;
        parent: any;
        milestone: boolean;
        open: boolean;
        color: any;
        progress: number | null;
        _children: never[];
        _level: number;
        _wbs: string;
        _sumStart: null;
        _sumEnd: null;
    };
    /** タスク/リンク一式を差し替える（初期化・fromJSON 用） */
    _setData(tasks: any, links: any): void;
    _tasks: any;
    _byId: Map<any, any> | undefined;
    _links: any;
    _nextLinkId: number | undefined;
    /** 親子ツリー・WBS番号・階層レベルを構築する */
    _buildTree(): void;
    _roots: any[] | undefined;
    /** p が t の子孫か（親設定の循環ガード） */
    _isDescendant(p: any, t: any): boolean;
    /** サマリータスクの包絡期間（子孫の最小開始〜最大終了）を計算する */
    _computeSummaries(): void;
    /** 表示上の開始（own start が無いサマリーは子の包絡） */
    effStart(t: any): any;
    /** 表示上の終了 */
    effEnd(t: any): any;
    /** 折りたたみを反映した可視行（上から順） */
    visibleRows(): any[];
    /** 表示範囲（日シリアル値）を計算してスケールを作る */
    _makeScale(): TimeScale;
    render(): void;
    rows: any[] | undefined;
    scale: TimeScale | undefined;
    selectTask(id: any, { emitClick }?: {
        emitClick?: boolean | undefined;
    }): void;
    selectLink(id: any): void;
    _push(cmd: any): void;
    undo(): boolean;
    redo(): boolean;
    /** タスクの undo 用スナップショット（日程・属性のサブセット） */
    _snap(t: any): {
        name: any;
        start: any;
        end: any;
        duration: any;
        progress: any;
        parent: any;
        milestone: any;
        open: any;
        color: any;
    };
    _applySnap(id: any, s: any): void;
    getTask(id: any): any;
    /**
     * タスクを更新する。fields: { name, start, end, duration, progress, open, color, parent, milestone }
     * 日付は 'YYYY-MM-DD' / Date / タイムスタンプを受け付ける。undo 可能・change 発火。
     */
    updateTask(id: any, fields?: {}, opts?: {}): any;
    /** タスクを追加する（parent 指定可）。undo 可能 */
    addTask(raw: any): {
        id: any;
        name: string;
        parent: any;
        milestone: boolean;
        open: boolean;
        color: any;
        progress: number | null;
        _children: never[];
        _level: number;
        _wbs: string;
        _sumStart: null;
        _sumEnd: null;
    } | null;
    /** タスクを削除する（子孫と関連リンクも）。undo 可能 */
    removeTask(id: any): boolean;
    /** FS リンクを追加する。循環・重複・不正IDは警告して無視。undo 可能・linkAdd 発火 */
    addLink(raw: any): {
        id: any;
        from: any;
        to: any;
        type: any;
        lag: any;
    } | null;
    /** リンクを削除する（id または {from, to}）。undo 可能 */
    removeLink(idOrPair: any): boolean;
    /** 正規化された JSON を返す（fromJSON とのラウンドトリップ保証） */
    toJSON(): {
        tasks: any;
        links: any;
    };
    /** JSON からタスク/リンクを丸ごと復元する（undo 履歴はクリア） */
    fromJSON(json: any): this;
    /**
     * 休日にも予定を引けるようにする/営業日ベースへ戻す。
     * 既存タスクの日数は開始〜終了の実期間から現在のモードで数え直す（日付は動かさない）。
     * 営業日ベースへ戻すとき、休日上にある開始/終了はドラッグ等の次回編集時に稼働日へスナップされる。
     */
    setScheduleOnHolidays(v: any): void;
    getScheduleOnHolidays(): boolean;
    zoomTo(zoom: any): void;
    scrollToTask(id: any): void;
    _handleKey(e: any): void;
    scrollToRowIfNeeded(row: any): void;
    destroy(): void;
}
import { Calendar } from './calendar.js';
import { TaskGrid } from './grid.js';
import { Timeline } from './timeline.js';
import { DragController } from './drag.js';
import { TimeScale } from './timescale.js';
