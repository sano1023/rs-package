export class Gantt {
    constructor(target: any, options?: {});
    target: any;
    listeners: {};
    destroyed: boolean;
    rowHeight: number;
    virtualThreshold: any;
    viewport: {
        first: number;
        last: number;
        topPad: number;
        bottomPad: number;
        virtual: boolean;
    };
    calendar: Calendar;
    zoom: any;
    autoSchedule: boolean;
    readOnly: boolean;
    criticalPath: boolean;
    defaultLinkType: any;
    showFooter: boolean;
    _critical: {
        tasks: Set<any>;
        links: Set<any>;
        slack: Map<any, any>;
    };
    columnRegistry: Map<any, any>;
    columns: any[];
    overlays: any[];
    resources: any;
    resourceById: Map<any, any>;
    baseline: Map<any, any> | Map<any, {
        id: any;
        start: number;
        end: number;
        progress: number | null;
        milestone: boolean;
    }> | null;
    progressLine: boolean;
    showHistogram: boolean;
    histogramMode: string;
    view: string;
    schedulerOptions: any;
    _events: any;
    _eventById: Map<any, any>;
    selectedEventId: any;
    selectedId: any;
    selectedLinkId: any;
    undoStack: any[];
    redoStack: any[];
    grid: TaskGrid;
    timeline: Timeline;
    histogram: ResourceHistogram;
    drag: DragController;
    scheduler: SchedulerView;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    _buildDOM(options: any): void;
    root: HTMLDivElement | undefined;
    mainEl: HTMLDivElement | undefined;
    gridEl: HTMLDivElement | undefined;
    gridWidth: any;
    splitterEl: HTMLDivElement | undefined;
    tlEl: HTMLDivElement | undefined;
    histEl: HTMLDivElement | undefined;
    _bindEvents(): void;
    _onTlScroll: (() => void) | undefined;
    _onGridWheel: ((e: any) => void) | undefined;
    _onZoomWheel: ((e: any) => void) | undefined;
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
        assignees: {
            resource: any;
            units: number;
        }[];
        _children: never[];
        _level: number;
        _wbs: string;
        _sumStart: null;
        _sumEnd: null;
        _sumProgress: null;
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
    /** サマリータスクの包絡期間（子孫の最小開始〜最大終了）と進捗（営業日重み付き平均）を集計する */
    _computeSummaries(): void;
    /** 表示上の開始（own start が無いサマリーは子の包絡） */
    effStart(t: any): any;
    /** 表示上の終了 */
    effEnd(t: any): any;
    /** 表示上の進捗（サマリーは子から集計した _sumProgress） */
    effProgress(t: any): any;
    /** 折りたたみを反映した可視行（上から順） */
    visibleRows(): any[];
    /** 表示範囲（日シリアル値）を計算してスケールを作る */
    _makeScale(): TimeScale;
    render(): void;
    rows: any[] | undefined;
    scale: TimeScale | undefined;
    /** ビュー切替（'gantt' | 'scheduler'）。change / viewChange 発火 */
    setView(view: any): this;
    getView(): string;
    /** 入力イベント1件を内部表現へ正規化する（_start/_end は分シリアル値） */
    _normEvent(raw: any): {
        id: any;
        name: string;
        resource: any;
        color: any;
    };
    /** 日入力（'YYYY-MM-DD' 等）→ 日シリアル値 */
    _parseDay(input: any): number | null;
    /** 当日分入力（'HH:MM' / 数値[分] / 'YYYY-MM-DD HH:MM'）→ 当日分（0〜1440） */
    _parseMinuteOfDay(input: any): number;
    /** イベントの undo 用スナップショット */
    _snapEvent(e: any): {
        name: any;
        resource: any;
        start: any;
        end: any;
        color: any;
    };
    _applyEventSnap(id: any, s: any): void;
    /** イベントを1件取得（内部表現） */
    getEvent(id: any): any;
    /** イベント一覧（正規化コピー: {id,name,resource,start,end,color}） */
    getEvents(): any;
    /** イベント一式を差し替える */
    setEvents(list: any): this;
    /** イベントを追加する。undo 可能・eventAdd 発火 */
    addEvent(raw: any): {
        id: any;
        name: string;
        resource: any;
        color: any;
    } | null;
    /**
     * イベントを更新する。fields: { name, resource, start, end, duration, color }。
     * start/end は 'YYYY-MM-DD HH:MM' / Date / タイムスタンプ、_serial:true なら分シリアル値。undo 可能。
     */
    updateEvent(id: any, fields?: {}, opts?: {}): any;
    /** イベントを削除する。undo 可能 */
    removeEvent(id: any): boolean;
    /** スケジューラのイベントを選択する。selectionChange / eventClick 発火 */
    selectEvent(id: any, { emitClick }?: {
        emitClick?: boolean | undefined;
    }): void;
    /** 現在のスケジューラ段組みレイアウト（テスト・検査用） */
    getSchedulerLayout(): {
        byResource: Array<{
            id: any;
            laneCount: number;
            placements: Array<{
                event: any;
                lane: number;
            }>;
        }>;
        unresourced: Array<{
            event: any;
            lane: number;
        }>;
        maxLanes: number;
    } | null | undefined;
    /** 現在のスクロール位置から描画すべき可視行スライスを求める（閾値以下なら全行） */
    _computeViewport(): {
        first: number;
        last: number;
        topPad: number;
        bottomPad: number;
        virtual: boolean;
    };
    /** 縦スクロール時: 可視スライスが変わったら左右ペインの行だけを描き直す（ツリー/スケールは再計算しない） */
    _scheduleViewport(): void;
    _vraf: any;
    /** 可視スライスの行・バー・依存線だけを再描画する（オーバーレイ/ヘッダーは全高のまま据え置き） */
    _renderViewport(): void;
    /** タスクがクリティカルパス上か（criticalPath 有効時のみ意味を持つ） */
    isCriticalTask(id: any): boolean;
    /** リンクがクリティカルか */
    isCriticalLink(id: any): boolean;
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
        assignees: any;
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
        assignees: {
            resource: any;
            units: number;
        }[];
        _children: never[];
        _level: number;
        _wbs: string;
        _sumStart: null;
        _sumEnd: null;
        _sumProgress: null;
    } | null;
    /** タスクを削除する（子孫と関連リンクも）。undo 可能 */
    removeTask(id: any): boolean;
    /** 依存リンクを追加する。循環・重複・不正IDは警告して無視。undo 可能・linkAdd 発火 */
    addLink(raw: any): {
        id: any;
        from: any;
        to: any;
        type: any;
        lag: any;
    } | null;
    /** リンクを削除する（id または {from, to}）。undo 可能 */
    removeLink(idOrPair: any): boolean;
    /**
     * リンクの依存タイプ / lag を変更する（id または {from, to}）。undo 可能。
     * autoSchedule 有効なら変更に伴う連鎖シフトを同一コマンドに含める。
     * @param {any} idOrPair リンクID or {from, to}
     * @param {{ type?: 'FS'|'SS'|'FF'|'SF', lag?: number }} fields
     */
    updateLink(idOrPair: any, fields?: {
        type?: "FS" | "SS" | "FF" | "SF";
        lag?: number;
    }): any;
    /** タスクツリーを（開閉によらず）DFS 順に平坦化。_children/_level は _buildTree 済み前提 */
    _treeFlat(): any[];
    /** _tasks の並びと各タスクの parent をスナップ（並べ替えの undo 用） */
    _orderSnapshot(): {
        order: any;
        parents: Map<any, any>;
    };
    _restoreOrder(snap: any): void;
    /**
     * source サブツリーを ref に対して place の位置へ移動する（内部）。
     * @param {'before'|'after'|'child'} place child=ref の末子, before/after=ref の兄弟
     * @returns {boolean} 実際に動いたか
     */
    _reorderSubtree(sourceId: any, refId: any, place: "before" | "after" | "child"): boolean;
    /** 並べ替えを undo 可能なコマンドとして確定 */
    _commitReorder(sourceId: any, refId: any, place: any, label: any): boolean;
    /** 選択タスクを1段インデント（直前の兄弟の子にする）。Tab 相当 */
    indentTask(id: any): boolean;
    /** 選択タスクを1段アウトデント（親の後ろの兄弟にする）。Shift+Tab 相当 */
    outdentTask(id: any): boolean;
    /**
     * タスクを別位置へ移動する（行ドラッグ並べ替え用の公開 API）。
     * @param {any} sourceId 動かすタスク
     * @param {any} refId 基準タスク
     * @param {'before'|'after'|'child'} place
     */
    moveTask(sourceId: any, refId: any, place?: "before" | "after" | "child"): boolean;
    /** 正規化された JSON を返す（fromJSON とのラウンドトリップ保証） */
    toJSON(): {
        tasks: any;
        links: any;
    };
    /** JSON からタスク/リンク/リソース/ベースラインを丸ごと復元する（undo 履歴はクリア） */
    fromJSON(json: any): this;
    /**
     * Excel/スプレッドシートからコピーしたタブ区切りテキストをタスクツリーとして取り込む。
     * 名前セル先頭の空白（半角2つ/全角1つ/タブ1つ = 1段）または先頭の空列で階層化する。
     * @param {string} text TSV（1行目が見出しなら列を自動対応づけ・無ければ [名前,開始,終了,担当]）
     * @param {object} [opts]
     * @param {'replace'|'append'} [opts.mode='replace'] 全置換 or 既存の末尾へ追記
     * @param {any} [opts.parent] append 時に付ける親タスクID（既定はルート）
     * @returns {Array} パースしたレコード配列
     */
    importTSV(text: string, opts?: {
        mode?: "replace" | "append" | undefined;
        parent?: any;
    }): any[];
    /**
     * 現在のタスクを CSV 文字列にする（WBS/タスク名(字下げ)/開始/終了/日数/進捗/担当）。ツリー順（DFS）。
     * @param {object} [opts] tasksToMatrix / toCSV のオプション（bom は既定 true）
     * @returns {string}
     */
    exportCSV(opts?: object): string;
    /** CSV をファイルとしてダウンロードする（内容も返す） */
    downloadCSV(filename?: string, opts?: {}): string;
    /** タイムラインを canvas に描画して返す（画素検査・独自加工用） */
    renderCanvas(opts?: {}): HTMLCanvasElement;
    /** タイムラインを PNG にして dataURL を返す */
    exportPNG(opts?: {}): string;
    /** PNG をファイルとしてダウンロードする */
    downloadPNG(filename?: string, opts?: {}): void;
    /** 印刷ダイアログを開く（印刷CSSで A4横・ページ分割される） */
    print(): void;
    _download(blob: any, filename: any): void;
    _downloadDataURL(url: any, filename: any): void;
    /**
     * 休日にも予定を引けるようにする/営業日ベースへ戻す。
     * 既存タスクの日数は開始〜終了の実期間から現在のモードで数え直す（日付は動かさない）。
     * 営業日ベースへ戻すとき、休日上にある開始/終了はドラッグ等の次回編集時に稼働日へスナップされる。
     */
    setScheduleOnHolidays(v: any): void;
    getScheduleOnHolidays(): boolean;
    /** クリティカルパス（総余裕0のタスク/リンク）の強調表示を切り替える */
    setCriticalPath(v: any): this;
    getCriticalPath(): boolean;
    /** 自動スケジューリングの有効/無効を切り替える。有効化時は現在の依存違反を補正する */
    setAutoSchedule(v: any): this;
    /** ドラッグで新規作成する依存リンクの既定タイプ（FS/SS/FF/SF） */
    setDefaultLinkType(type: any): this;
    /** リソース定義一式を差し替える（既存割当はそのまま・未定義リソースへの割当は表示/集計されない） */
    setResources(list: any): this;
    /** リソースを1件取得 */
    getResource(id: any): any;
    /** タスクにリソースを割り当てる（units 既定 1）。undo 可能・assignChange 発火 */
    assignResource(taskId: any, resource: any, units?: number): any;
    /** タスクからリソースの割当を外す。undo 可能・assignChange 発火 */
    unassignResource(taskId: any, resource: any): any;
    /** 現在のタスク割当からリソースヒストグラム（日別割当合計・過負荷・ピーク）を計算する（純粋関数へ委譲） */
    getHistogram(range: any): {
        byResource: Array<{
            id: any;
            name: any;
            color: any;
            capacity: any;
            days: Map<number, number>;
            peak: number;
            overloadDays: number[];
        }>;
        maxLoad: number;
        range: object;
    };
    /** 下部リソースヒストグラムパネルの表示切替 */
    setResourceHistogram(v: any): this;
    getResourceHistogram(): boolean;
    /** ヒストグラムの表示モード（'load'=実数[人日] / 'util'=稼働率[%]） */
    setHistogramMode(mode: any): this;
    getHistogramMode(): string;
    /** 現在のスケジュールを計画ベースラインとして保存する（バー下に薄いバー・遅延日数列の基準） */
    captureBaseline(): this;
    /** ベースラインを破棄する */
    clearBaseline(): this;
    /** ベースラインが保存されているか */
    hasBaseline(): boolean;
    /** タスクのベースライン（{start,end,progress,milestone}）。無ければ null */
    getBaseline(id: any): any;
    /** 進捗ライン（イナズマ線）の表示切替 */
    setProgressLine(v: any): this;
    getProgressLine(): boolean;
    zoomTo(zoom: any): void;
    /** 1段ズームイン/アウト（Ctrl+ホイール用）。dir<0=細かく（拡大）, dir>0=粗く（縮小） */
    zoomStep(dir: any, anchorSerial: any): void;
    scrollToTask(id: any): void;
    _handleKey(e: any): void;
    scrollToRowIfNeeded(row: any): void;
    destroy(): void;
}
import { Calendar } from './calendar.js';
import { TaskGrid } from './grid.js';
import { Timeline } from './timeline.js';
import { ResourceHistogram } from './histogram.js';
import { DragController } from './drag.js';
import { SchedulerView } from './scheduler-view.js';
import { TimeScale } from './timescale.js';
