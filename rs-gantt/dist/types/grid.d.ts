/**
 * rs-gantt 左ペイン: タスクツリーグリッド
 *
 * WBS番号・折りたたみトグル・組み込み/カスタム列・列幅ドラッグ。
 * role="treegrid" + aria-level / aria-expanded / aria-selected のアクセシビリティ対応。
 * 縦スクロールはタイムライン側（rsgt-tl）と同期する。
 */
export class TaskGrid {
    constructor(gantt: any);
    gantt: any;
    headerEl: HTMLDivElement;
    scrollEl: HTMLDivElement;
    bodyEl: HTMLDivElement;
    footerEl: HTMLDivElement;
    _suppressClick: boolean;
    _reorder: {
        id: any;
        rowEl: any;
        startX: any;
        startY: any;
        moved: boolean;
        target: null;
        place: null;
    } | null;
    _onRowDown: (e: any) => void;
    /** data-task-id は文字列になるため、元の id 型（数値/文字列）へ戻す */
    _rowId(rowEl: any): any;
    render(): void;
    renderHeader(): void;
    renderRows(): void;
    /** 仮想スクロールの上下スペーサ（描画しない行の高さを確保する空 div） */
    _spacer(height: any): HTMLDivElement;
    /** 集計フッター行（列に footer があり showFooter 有効なとき） */
    renderFooter(): void;
    /** 選択状態だけ更新（再描画なし） */
    updateSelection(): void;
    _rowDown(e: any): void;
    _onRowMove: ((ev: any) => void) | undefined;
    _onRowUp: ((ev: any) => void) | undefined;
    _rowMove(e: any): void;
    _indicator: HTMLDivElement | null | undefined;
    _prevTargetEl: Element | null | undefined;
    _rowUp(): void;
    destroy(): void;
}
