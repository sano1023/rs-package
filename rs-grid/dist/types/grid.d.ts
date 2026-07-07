export class Grid {
    constructor(target: any, options?: {});
    target: any;
    options: {};
    listeners: {};
    destroyed: boolean;
    columns: any;
    focus: {
        r: number;
        c: number;
    };
    anchor: {
        r: number;
        c: number;
    };
    editing: {
        r: any;
        c: any;
        input: any;
        initial: any;
    } | null;
    sortState: {
        col: number;
        dir: null;
    };
    sortKeys: any[];
    merges: any[];
    comments: Map<any, any>;
    _history: any[];
    _hIndex: number;
    _drag: {
        kind: string;
        c: number;
        startX: any;
        startW: any;
        moved?: undefined;
        vr?: undefined;
        startY?: undefined;
    } | {
        kind: string;
        c: number;
        startX: any;
        moved: boolean;
        startW?: undefined;
        vr?: undefined;
        startY?: undefined;
    } | {
        kind: string;
        vr: number;
        startY: any;
        moved: boolean;
        c?: undefined;
        startX?: undefined;
        startW?: undefined;
    } | {
        kind: string;
        c?: undefined;
        startX?: undefined;
        startW?: undefined;
        moved?: undefined;
        vr?: undefined;
        startY?: undefined;
    } | {
        kind: string;
        c?: undefined;
        startX?: undefined;
        startW?: undefined;
        moved?: undefined;
        vr?: undefined;
        startY?: undefined;
    } | null;
    _filters: Map<any, any>;
    _view: number[] | null;
    fixedColumns: any;
    _calcVersion: number;
    _calcCache: Map<any, any>;
    _hasFormulas: any;
    /** ヘッダーの高さ（ネストヘッダー時は2段） */
    headerH(): number;
    /** 表示行数（フィルタ適用後） */
    vlen(): any;
    /** 表示行インデックス → データ行インデックス */
    di(vr: any): any;
    /** 表示行インデックス → 行オブジェクト */
    vrow(vr: any): any;
    /** フィルタを評価してビューを再構築する */
    rebuildView(): void;
    setDataInternal(rows: any): void;
    data: any;
    _originalOrder: any;
    buildDOM(): void;
    wrapper: any;
    proxy: any;
    scroller: any;
    table: any;
    colgroup: any;
    thead: any;
    tbody: any;
    editorWrap: any;
    fillHandle: any;
    statusBar: any;
    menu: any;
    renderColgroup(): void;
    renderHeader(): void;
    visibleRange(): {
        first: number;
        count: number;
    };
    renderRows(): void;
    _rendered: {
        first: number;
        count: number;
    } | undefined;
    renderRow(r: any): HTMLTableRowElement;
    /** セル内容の描画（カスタムレンダラ・組み込みレンダラ・フォーマット） */
    renderCellContent(td: any, col: any, v: any, row: any, dr: any): void;
    /** 見えているセルの選択クラスを更新（仮想化のため毎回可視分だけ） */
    applySelection(): void;
    /** Excel風ステータスバー: 選択中の数値の合計・平均・個数 */
    updateStatus(): void;
    selectionRect(): {
        r0: number;
        r1: number;
        c0: number;
        c1: number;
    };
    /** フォーカスセルの右下にフィルハンドルを置く */
    positionFillHandle(): void;
    colLeft(c: any): number;
    /** コンテンツx座標 → 列インデックス */
    colFromX(x: any): number;
    bindEvents(): void;
    _onScroll: (() => void) | undefined;
    _scrollRaf: any;
    _onDocMouseMove: ((e: any) => void) | undefined;
    _fillPreview: {
        r1: number;
    } | {
        r1: number;
    } | null | undefined;
    _onDocMouseUp: (() => void) | undefined;
    _suppressHeaderClick: boolean | undefined;
    _composing: boolean | undefined;
    _commentHover: HTMLDivElement | null | undefined;
    _onDocDown: ((e: any) => void) | undefined;
    focusProxy(): void;
    handleKey(e: any): void;
    toggleCheckbox(): void;
    scrollToCell(r: any, c: any): void;
    selectAll(): void;
    openEditor(r: any, c: any, initial?: null): void;
    commitEditor(): void;
    cancelEditor(): void;
    moveFocus(dr: any, dc: any): void;
    setValue(r: any, key: any, v: any, { history, silent }?: {
        history?: boolean | undefined;
        silent?: boolean | undefined;
    }): void;
    /** 複数セルの一括変更（1履歴・1イベント） */
    setValues(entries: any): void;
    /** 数式セルの計算値（バージョン付きメモ化・循環参照検出） */
    computedValue(r: any, c: any): any;
    _evalStack: Set<any> | undefined;
    invalidateCalc(): void;
    refreshCell(r: any, key: any): void;
    pushHistory(entry: any): void;
    undo(): void;
    redo(): void;
    applyHistory(entry: any, dir: any): void;
    snapshotStructure(): {
        data: any[];
        columns: any;
        originalOrder: any[];
        merges: any[];
    };
    structuralChange(fn: any): void;
    selectionTSV(): string;
    pasteTSV(text: any): void;
    clearSelection(): void;
    applyFill(toRow: any): void;
    toggleSort(c: any, additive?: boolean): void;
    /** ソート適用。additive=true（Shift+クリック）で複数キーに追加 */
    applySort(c: any, dir: any, additive?: boolean): void;
    runSort(): void;
    showMenu(e: any): void;
    /** メニューを wrapper 内に収まるよう配置（下端・右端では反転/クランプ） */
    positionMenu(e: any): void;
    hideMenu(): void;
    emptyRow(): {};
    insertRow(at: any): void;
    deleteRows(from: any, to?: any): void;
    /** ビュー範囲の行を削除（フィルタ中は飛び飛びのデータ行を個別に削除） */
    deleteRowsView(vFrom: any, vTo: any): void;
    insertCol(at: any, def?: {}): void;
    deleteCol(at: any): void;
    showDragLine(kind: any, pos: any): void;
    _dragLine: HTMLDivElement | undefined;
    hideDragLine(): void;
    /** 行を移動（フィルタ・ソートなしの時のみ呼ばれる。vr=データ行と一致） */
    moveRow(from: any, to: any): void;
    /** 列を移動（フィルタ・ソートキー・結合のインデックスを再マップ） */
    moveColumn(from: any, to: any): void;
    /** ビューがデータと一致しているか（フィルタ・ソートが無い状態。結合の描画条件） */
    isIdentityView(): boolean;
    /** データ座標 (dr, c) を含む結合を返す */
    mergeAt(dr: any, c: any): any;
    /** 現在の選択範囲を結合（マスター=左上。他セルの値はクリア） */
    mergeSelection(): void;
    /** 選択範囲に重なる結合を解除 */
    unmergeSelection(): void;
    /** プログラムからの結合（履歴なし・初期セットアップ用） */
    mergeCells(r: any, c: any, rs: any, cs: any): void;
    getMerges(): any[];
    /** コメントは行オブジェクト参照でキー付け（ソート・挿入後も追従する） */
    commentOf(row: any, key: any): any;
    setComment(dr: any, key: any, text: any): void;
    getComment(dr: any, key: any): any;
    removeComment(dr: any, key: any): void;
    /** コメント編集ポップアップ */
    openCommentEditor(vr: any, c: any): void;
    _commentPop: HTMLDivElement | null | undefined;
    closeCommentPop(): void;
    /** 表示値（フィルタ・CSV・検索で使う文字列） */
    displayValue(dr: any, c: any): any;
    openColMenu(c: any, e: any): void;
    /** フィルタ設定（filter: {type:'values', set} / {type:'cond', op, value} / null=解除） */
    setFilter(c: any, filter: any): void;
    clearFilters(): void;
    hideColumn(c: any): void;
    showAllColumns(): void;
    setFixedColumns(n: any): void;
    /** 全セルを検索してハイライト。最初のヒットへ移動し、ヒット数を返す */
    search(query: any): number;
    _searchQ: string | null | undefined;
    clearSearch(): void;
    /** CSV文字列（フィルタ後のビュー・数式は計算値。view:false で全行） */
    getCsv({ view, header }?: {
        view?: boolean | undefined;
        header?: boolean | undefined;
    }): string;
    /** JSON（行オブジェクト配列・数式は計算値。view:false で全行） */
    getJson({ view }?: {
        view?: boolean | undefined;
    }): {}[];
    exportCsv(filename?: string, opts?: {}): void;
    exportJson(filename?: string, opts?: {}): void;
    downloadBlob(blob: any, filename: any): void;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    getData(): any;
    setData(rows: any): void;
    getValue(r: any, key: any): any;
    getSelection(): {
        r0: number;
        r1: number;
        c0: number;
        c1: number;
    };
    selectCell(r: any, c: any): void;
    destroy(): void;
}
