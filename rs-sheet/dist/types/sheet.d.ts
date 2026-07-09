export class RSSheet {
    constructor(target: any, options?: {});
    target: any;
    options: {
        height: number;
        defaultColWidth: number;
        defaultRowHeight: number;
        headerWidth: number;
        headerHeight: number;
    };
    listeners: {};
    destroyed: boolean;
    s: number;
    engine: Engine;
    history: History;
    _batcher: RenderBatcher;
    _paintCount: number;
    _cellEls: Map<any, any>;
    _readOnly: boolean;
    _opSeq: number;
    _auditOn: boolean;
    _auditTrace: {
        target: any;
        precedents: {
            cells: any;
            ranges: any;
        };
        dependents: any[];
    } | null;
    anchor: {
        r: number;
        c: number;
    };
    focus: {
        r: number;
        c: number;
    };
    _editing: {
        row: any;
        col: any;
        initialRaw: any;
        refToken: null;
        refClicking: boolean;
    } | null;
    _drag: {
        kind: string;
        c: number;
        startX: any;
        startW: number;
        r?: undefined;
        startY?: undefined;
        startH?: undefined;
        sel?: undefined;
        to?: undefined;
        start?: undefined;
    } | {
        kind: string;
        r: number;
        startY: any;
        startH: number;
        c?: undefined;
        startX?: undefined;
        startW?: undefined;
        sel?: undefined;
        to?: undefined;
        start?: undefined;
    } | {
        kind: string;
        sel: {
            r0: number;
            r1: number;
            c0: number;
            c1: number;
        };
        to: null;
        c?: undefined;
        startX?: undefined;
        startW?: undefined;
        r?: undefined;
        startY?: undefined;
        startH?: undefined;
        start?: undefined;
    } | {
        kind: string;
        start: {
            r: number;
            c: number;
        };
        c?: undefined;
        startX?: undefined;
        startW?: undefined;
        r?: undefined;
        startY?: undefined;
        startH?: undefined;
        sel?: undefined;
        to?: undefined;
    } | {
        kind: string;
        c?: undefined;
        startX?: undefined;
        startW?: undefined;
        r?: undefined;
        startY?: undefined;
        startH?: undefined;
        sel?: undefined;
        to?: undefined;
        start?: undefined;
    } | null;
    _lastCopy: {
        text: string;
        r0: number;
        c0: number;
        raws: any[][];
    } | null;
    _composing: boolean;
    _lastTap: {
        t: number;
        r: number;
        c: number;
    };
    get model(): import("./model.js").SheetModel;
    get sheetData(): {
        name: any;
        rows: any;
        cols: any;
        cells: Map<string, object>;
        colMeta: Map<number, {
            width?: number;
        }>;
        rowMeta: Map<number, {
            height?: number;
        }>;
        merges: Array<{
            r0: any;
            c0: any;
            r1: any;
            c1: any;
        }>;
        freeze: {
            rows: number;
            cols: number;
        };
        condFormats: Array<{
            range: {
                r0: any;
                c0: any;
                r1: any;
                c1: any;
            };
            type: any;
        }>;
        validations: Array<{
            range: {
                r0: any;
                c0: any;
                r1: any;
                c1: any;
            };
        }>;
        cellTypes: Array<{
            range: {
                r0: any;
                c0: any;
                r1: any;
                c1: any;
            };
            type: any;
            options: any;
        }>;
        filter: null;
        hiddenRows: Set<number>;
    };
    loadOptions(options: any): void;
    /** 追加シートへ data/cells/formats/幅/高さ を流し込む（loadOptions のシート0処理と同等） */
    loadSpecInto(s: any, spec: any): void;
    buildDOM(): void;
    wrapper: any;
    proxy: any;
    scroller: any;
    canvas: any;
    colhdr: any;
    corner: any;
    colcells: any;
    rowhdr: any;
    body: any;
    cellLayer: any;
    selrect: any;
    fillPreview: any;
    cursorEl: any;
    fillHandle: any;
    auditSvg: any;
    editorWrap: any;
    editorInput: any;
    validationBtn: any;
    freezeTop: any;
    freezeTopInner: any;
    freezeLeft: any;
    freezeLeftInner: any;
    freezeCorner: any;
    freezeCornerInner: any;
    tabbar: any;
    status: any;
    menu: any;
    filterMenu: any;
    renderTabs(): void;
    /** シート名の変更をユーザーに促す（prompt が無ければ何もしない） */
    promptRenameSheet(i: any): void;
    rebuildOffsets(): void;
    _rowTops: any[] | undefined;
    _colLefts: any[] | undefined;
    rowH(r: any): number;
    colW(c: any): number;
    /** セル範囲のピクセル矩形（body 相対） */
    rectOf(r0: any, c0: any, r1: any, c1: any): {
        x: any;
        y: any;
        w: number;
        h: number;
    };
    /** body 相対座標 → セル */
    cellAt(x: any, y: any): {
        r: number;
        c: number;
    };
    visibleRange(): {
        r0: number;
        r1: number;
        c0: number;
        c1: number;
    };
    renderViewport(): void;
    _rendered: {
        r0: number;
        r1: number;
        c0: number;
        c1: number;
    } | undefined;
    renderCell(doc: any, r: any, c: any, rect?: null): any;
    /** (r,c) に割り当てられたセル型を返す（後勝ち・なければ null） */
    cellTypeAt(r: any, c: any): {
        type: any;
        options: any;
        def: object;
    } | null;
    /** (r,c) を含む結合領域を返す（なければ null） */
    mergeAt(r: any, c: any): {
        r0: any;
        c0: any;
        r1: any;
        c1: any;
    } | null;
    /** 条件付き書式の統計（min/max）を各ルールに用意する */
    prepareCondFormats(): void;
    _cfRules: any[] | undefined;
    /** (r,c) に適用される条件付き書式のスタイルを合成して返す */
    condStyleFor(r: any, c: any, value: any): {
        bg: any;
        bar: number;
        barColor: any;
        color: any;
        bold: boolean;
    };
    /** (r,c) に適用されるデータ検証を返す（なければ null） */
    validationAt(r: any, c: any): {
        range: {
            r0: any;
            c0: any;
            r1: any;
            c1: any;
        };
    } | null;
    /** オートフィルタのヘッダー行セルにドロップダウンボタンを描画する */
    renderFilterButtons(doc: any, r0: any, r1: any, c0: any, c1: any): void;
    renderFrozen(): void;
    paintFrozenCells(doc: any, inner: any, r0: any, r1: any, c0: any, c1: any): void;
    /** 値だけが変わったときの再描画（オフセット不変） */
    refreshCells(): void;
    /** セル値変更後の再描画を microtask に束ねて依頼する（差分描画） */
    scheduleRender(recalced: any): void;
    /** 保留中の再描画を即時に反映する（同期が要る箇所・テスト用） */
    flush(): void;
    /** 結合・条件付き書式があるシートは範囲全体の再計算が要るので全面再描画にする */
    needsFullRender(): boolean;
    /** 束ねられた再描画の実行本体（batcher から呼ばれる） */
    flushRender(ids: any, full: any): void;
    /** 可視範囲内の dirty セルだけ DOM を差し替える（10万セルでも触るのは変わった数個） */
    repaintDirty(dirty: any): void;
    /** 構造が変わったときの再描画 */
    refresh(): void;
    selRect(): {
        r0: number;
        r1: number;
        c0: number;
        c1: number;
    };
    applySelection(): void;
    _listValidation: {
        range: {
            r0: any;
            c0: any;
            r1: any;
            c1: any;
        };
    } | null | undefined;
    _lastSelKey: any;
    /** ステータスバー: 選択中の数値の合計・平均・個数 */
    updateStatus(sel: any): void;
    setSelection(anchor: any, focus?: any, scroll?: boolean): void;
    /** 矩形を、交差する全結合領域を含むまで拡張する（不動点まで） */
    expandRectToMerges(rect: any): {
        r0: any;
        c0: any;
        r1: any;
        c1: any;
    };
    scrollToCell(r: any, c: any): void;
    focusProxy(): void;
    bindEvents(): void;
    _onScroll: (() => void) | undefined;
    _scrollRaf: any;
    _onDocMouseMove: ((e: any) => void) | undefined;
    _onDocMouseUp: ((e: any) => void) | undefined;
    _onDocMouseDown: ((e: any) => void) | undefined;
    _touch: {
        x: any;
        y: any;
        moved: boolean;
    } | null | undefined;
    openListDropdown(): void;
    /** チェックボックスセルの値をトグルする */
    toggleCheckbox(r: any, c: any): void;
    /** 選択肢セルのドロップダウンを開く（options.values の一覧から選んで書き込む） */
    openChoiceDropdown(r: any, c: any, ct?: null): void;
    /** 列の一意な表示値（データ行）を返す */
    filterUniqueValues(colIndex: any): any[];
    cellText(r: any, c: any): any;
    showFilterMenu(colIndex: any, clientX: any, clientY: any): void;
    hideFilterMenu(): void;
    /** フィルタの非表示行を現在の条件から再計算する */
    recomputeFilter(): void;
    onMouseDown(e: any): void;
    onDocMouseMove(e: any): void;
    onDocMouseUp(): void;
    onKeyDown(e: any): void;
    selectAll(): void;
    moveFocus(dr: any, dc: any): void;
    openEditor(r: any, c: any, initial?: null): void;
    /** 数式入力モード中の参照クリック/ドラッグ挿入 */
    insertRefIntoEditor(r0: any, c0: any, r1?: null, c1?: null): void;
    commitEditor(): void;
    cancelEditor(): void;
    /** ユーザー操作としてセル変更を適用する（履歴 + change イベント）。再描画は microtask で束ねる */
    applyUserChanges(entries: any): any[];
    setCellUser(r: any, c: any, raw: any): any[];
    emitChange(changes: any): void;
    /** 変更イベントストリームを発火する（各 op に連番 seq を振って共同編集の順序付けに使う） */
    emitOps(ops: any): void;
    clearRange(sel: any): void;
    /** 選択範囲を TSV 化（数式は raw・値は表示テキスト） */
    selectionTSV(): string;
    doCopy(clipboardData: any): void;
    pasteTSV(text: any): void;
    applyFill(sel: any, to: any): void;
    /** 連続データの判定: ソースが2つ以上の数値なら等差ステップを返す */
    seriesStep(source: any): {
        last: any;
        step: number;
    } | null;
    fillValue(src: any, series: any, i: any, dRow: any, dCol: any): any;
    doStructural(fn: any): void;
    insertRows(index: any, count?: number): void;
    deleteRows(index: any, count?: number): void;
    insertCols(index: any, count?: number): void;
    deleteCols(index: any, count?: number): void;
    undo(): void;
    redo(): void;
    onContextMenu(e: any): void;
    showMenu(x: any, y: any, items: any): void;
    hideMenu(): void;
    execCopy(): void;
    execCut(): void;
    setFormatSel(fmt: any): void;
    toggleStyleSel(key: any): void;
    /** セル情報 { raw, value, text, format, style } */
    getCell(ref: any): {
        raw: any;
        value: any;
        text: any;
        format: any;
        style: any;
    } | null;
    /** raw を設定（数式は自動再計算・履歴に積む） */
    setCell(ref: any, raw: any): void;
    /** 範囲にフォーマットを設定（'D2:D4' / 'B2'） */
    setFormat(rangeRef: any, fmt: any): void;
    /** 範囲にスタイルを設定（{bold, italic, underline, color, bg, align}） */
    setStyle(rangeRef: any, style: any): void;
    /** {r0,c0,r1,c1} → 'A1:B2' 形式の文字列 */
    rangeRef(sel: any): string;
    /** 選択範囲 {r0,c0,r1,c1,ref} */
    getSelection(): {
        ref: string;
        r0: number;
        r1: number;
        c0: number;
        c1: number;
    };
    /** 'B2' / 'B2:D4' を選択 */
    select(rangeRef: any): void;
    /** 読み取り専用か */
    isReadOnly(): boolean;
    /**
     * 読み取り専用ビューの切替。true で全ての編集操作（入力・削除・ペースト・フィル・
     * 行列挿入削除・undo/redo・セル型トグル・コンテキストメニューの編集項目）を禁止する。
     * 選択・スクロール・コピー・数式監査といった閲覧操作はそのまま使える。
     * プログラム API（setCell 等）は共同編集の受信のためあえて禁止しない。
     */
    setReadOnly(v?: boolean): boolean;
    /**
     * 指定セル（省略時はフォーカス）の参照元(precedents)/参照先(dependents)を返す純粋データ。
     * @returns {{target, precedents:{cells,ranges}, dependents:Array}}
     */
    getAuditTrace(ref?: null): {
        target: any;
        precedents: {
            cells: any;
            ranges: any;
        };
        dependents: any[];
    };
    /** 数式監査の矢印表示を切り替える（省略時はトグル）。表示中フラグを返す */
    setAudit(on?: boolean): boolean;
    /** 数式監査のトグル */
    toggleAudit(): boolean;
    /** 監査中か */
    isAuditOn(): boolean;
    /** 監査中: フォーカスセルのトレースを取り直して矢印を描く */
    updateAudit(): void;
    /** 監査の矢印を消す */
    hideAudit(): void;
    /** 参照元/参照先の矢印を SVG で描画する（body 相対・active シート内のみ） */
    renderAuditArrows(): void;
    _auditUid: string | undefined;
    setColWidth(col: any, width: any): void;
    setRowHeight(row: any, height: any): void;
    /** モデル全体スナップショットで履歴に積む変更（結合・固定・書式・検証・フィルタ用） */
    modelMutation(fn: any): void;
    /** 範囲を1セルに結合（'B2:D2'）。既存の重なる結合は解除される */
    mergeCells(rangeRef: any): void;
    /** 範囲に交差する結合を解除 */
    unmergeCells(rangeRef: any): void;
    /** ウィンドウ枠固定: 先頭 rows 行・cols 列を固定（0で解除） */
    setFreeze(rows?: number, cols?: number): void;
    /** アクティブセルの左上でウィンドウ枠を固定する（Excel の「ウィンドウ枠の固定」相当） */
    freezeAtSelection(): void;
    /** 条件付き書式を追加。rule は {type:'colorScale'|'dataBar'|'cellValue', ...} */
    addConditionalFormat(rangeRef: any, rule: any): void;
    /** 条件付き書式をすべて解除 */
    clearConditionalFormats(): void;
    /** データ検証を設定。validation は {type:'list', values} | {type:'number', op, min, max} など */
    setValidation(rangeRef: any, validation: any): void;
    /** データ検証を解除（範囲省略で全解除） */
    clearValidation(rangeRef: any): void;
    /** オートフィルタを設定（先頭行をヘッダーとする）。既にあれば解除 */
    setFilter(rangeRef: any): void;
    /** オートフィルタと非表示行を解除 */
    clearFilter(): void;
    /** 列の許可値でフィルタを適用（allowedTexts=null で当該列のフィルタを解除） */
    applyColumnFilter(colIndex: any, allowedTexts: any): void;
    /** 範囲を keyCol（絶対列インデックス）で並べ替える */
    sortRange(rangeRef: any, keyCol: any, order?: string): void;
    /** フィルタ範囲を colIndex で並べ替える（ヘッダー行を除く） */
    sortRangeByColumn(colIndex: any, order: any): void;
    /**
     * 範囲にカスタムセル型を割り当てる（'checkbox' / 'select' / defineCellRenderer で登録した独自型）。
     * @param {string} rangeRef 'B2:B10'
     * @param {string} type レンダラ名
     * @param {object} [options] 型ごとのオプション（select は {values:[...]}）
     * @returns {boolean} 成功可否
     */
    setCellType(rangeRef: string, type: string, options?: object): boolean;
    /** 範囲に交差するカスタムセル型を解除する */
    clearCellType(rangeRef: any): void;
    /** rs-chart の生成関数を解決する（オプション → window.createRSChart の順。無ければ null） */
    resolveChartFactory(explicit: any): any;
    /** 範囲のセルを {v, t} 行列で取り出す（チャート化・エクスポート用） */
    rangeMatrix(rg: any): {
        v: any;
        t: any;
    }[][];
    /**
     * 選択（または指定）範囲を rs-chart でチャート化する（opt-in 連携・ハード依存なし）。
     * rs-chart（createRSChart）が無ければ明確なエラーを投げる。
     * @param {string} rangeRef 'A1:D5'（省略時は現在の選択範囲）
     * @param {string|HTMLElement} target 描画先
     * @param {object} [chartOptions] type/orientation/headers/categories + rs-chart の任意オプション
     * @returns {object} rs-chart インスタンス
     */
    chartFromRange(rangeRef: string, target: string | HTMLElement, chartOptions?: object): object;
    toJSON(): {
        version: number;
        activeSheet: number;
        sheets: {
            name: any;
            rows: any;
            cols: any;
            cells: {};
            colMeta: {};
            rowMeta: {};
        }[];
        namedRanges: {};
    };
    fromJSON(json: any): void;
    /** アクティブシートを切り替える */
    switchSheet(i: any): void;
    /** シートを追加してそこへ切り替える。追加インデックスを返す */
    addSheet(name: any): number;
    /** シートを削除する（最後の1枚は残す）。成功可否を返す */
    removeSheet(i?: number): boolean;
    /** シート名を変更する（数式内のシート参照も追従）。実際に付いた名前を返す */
    renameSheet(i: any, name: any): string | null;
    /** シート名一覧 */
    sheetNames(): any[];
    /** 名前付き範囲を定義する（definition='B2:B10' / 'Sheet2!A1:A10'）。成功可否を返す */
    defineName(name: any, definition: any): boolean;
    /** 名前付き範囲を削除する */
    deleteName(name: any): boolean;
    /** 定義済みの名前一覧 [{name, ref}]（ref は 'Sheet1!A1:A10' 形式） */
    listNames(): {
        name: string;
        ref: any;
    }[];
    /** アクティブ（または指定）シートを CSV 文字列にする。mode:'value'(既定 表示値) | 'raw'(数式そのもの) */
    exportCSV({ sheet, mode, delimiter }?: {
        sheet?: number | undefined;
        mode?: string | undefined;
        delimiter?: string | undefined;
    }): string;
    /** CSV 文字列を取り込む（origin から流し込む）。既定はアクティブシート */
    importCSV(text: any, { sheet, delimiter, origin, clear }?: {
        sheet?: number | undefined;
        delimiter?: string | undefined;
        origin?: string | undefined;
        clear?: boolean | undefined;
    }): {
        rows: number;
        cols: number;
    };
    /** ブック全体を JSON 文字列にする（namedRanges・全シート含む） */
    exportJSON(pretty?: boolean): string;
    /** JSON 文字列（または toJSON オブジェクト）を取り込む */
    importJSON(json: any): void;
    /** 一致セルを列挙する [{sheet,row,col,raw}]。既定はアクティブシート（allSheets で全シート） */
    find(query: any, opts?: {}): {
        sheet: any;
        row: any;
        col: any;
        raw: any;
    }[];
    /** 一括置換する。置換したセル数を返す（既定はアクティブシート） */
    replaceAll(query: any, replacement: any, opts?: {}): number;
    /** 使用範囲を静的な HTML テーブルにする（印刷・エクスポート用。書式/太字/背景/寄せを反映） */
    toHTMLTable(sheetIndex?: number): string;
    /** 現在のシートを別ウィンドウで開いて印刷ダイアログを出す */
    print(sheetIndex?: number): boolean;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    destroy(): void;
}
import { Engine } from './engine.js';
import { History } from './history.js';
import { RenderBatcher } from './batch.js';
