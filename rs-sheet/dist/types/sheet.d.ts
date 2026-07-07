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
    };
    loadOptions(options: any): void;
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
    editorWrap: any;
    editorInput: any;
    status: any;
    menu: any;
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
    renderCell(doc: any, r: any, c: any): any;
    /** 値だけが変わったときの再描画（オフセット不変） */
    refreshCells(): void;
    /** 構造が変わったときの再描画 */
    refresh(): void;
    selRect(): {
        r0: number;
        r1: number;
        c0: number;
        c1: number;
    };
    applySelection(): void;
    _lastSelKey: any;
    /** ステータスバー: 選択中の数値の合計・平均・個数 */
    updateStatus(sel: any): void;
    setSelection(anchor: any, focus?: any, scroll?: boolean): void;
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
    /** ユーザー操作としてセル変更を適用する（履歴 + change イベント） */
    applyUserChanges(entries: any): any[];
    setCellUser(r: any, c: any, raw: any): any[];
    emitChange(changes: any): void;
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
    setColWidth(col: any, width: any): void;
    setRowHeight(row: any, height: any): void;
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
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    destroy(): void;
}
import { Engine } from './engine.js';
import { History } from './history.js';
