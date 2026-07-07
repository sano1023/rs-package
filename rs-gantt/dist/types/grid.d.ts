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
    /** data-task-id は文字列になるため、元の id 型（数値/文字列）へ戻す */
    _rowId(rowEl: any): any;
    render(): void;
    renderHeader(): void;
    renderRows(): void;
    /** 選択状態だけ更新（再描画なし） */
    updateSelection(): void;
}
