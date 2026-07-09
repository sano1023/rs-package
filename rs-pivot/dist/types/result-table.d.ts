/**
 * rs-pivot 結果テーブル
 *
 * テーブルモデル（buildTableModel の出力）を DOM に描画する。
 * 多段ヘッダ・小計/総計・セルダブルクリック（イベント委譲）・role/aria を担当する。
 *
 * v0.2:
 *  - 条件付き書式: データセルごとに cellRenderer(td, cell, ctx) を呼ぶ（ヒートマップ/データバー等）
 *  - 展開/折りたたみ: ヘッダ/行見出しのトグルクリックで onToggleCollapse(axis, path) を発火
 */
export class ResultTable {
    /**
     * @param {HTMLElement} host 描画先
     * @param {{ onCellDblClick?: (cell)=>void, onToggleCollapse?: (axis, path)=>void }} handlers
     */
    constructor(host: HTMLElement, handlers?: {
        onCellDblClick?: (cell: any) => void;
        onToggleCollapse?: (axis: any, path: any) => void;
    });
    host: HTMLElement;
    handlers: {
        onCellDblClick?: (cell: any) => void;
        onToggleCollapse?: (axis: any, path: any) => void;
    };
    model: any;
    cellRenderer: any;
    el: HTMLDivElement;
    warningEl: HTMLDivElement;
    wrapEl: HTMLDivElement;
    /** 条件付き書式のセルレンダラを設定する（null で解除） */
    setCellRenderer(fn: any): void;
    /** トグル（展開/折りたたみ）マーカーを th に付与する */
    _decorateToggle(th: any, cell: any): void;
    /** モデルを描画する */
    render(model: any): void;
    destroy(): void;
}
