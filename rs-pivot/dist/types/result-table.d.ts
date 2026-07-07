/**
 * rs-pivot 結果テーブル
 *
 * テーブルモデル（buildTableModel の出力）を DOM に描画する。
 * 多段ヘッダ・小計/総計・セルダブルクリック（イベント委譲）・role/aria を担当する。
 */
export class ResultTable {
    /**
     * @param {HTMLElement} host 描画先
     * @param {{ onCellDblClick?: (cell) => void }} handlers
     */
    constructor(host: HTMLElement, handlers?: {
        onCellDblClick?: (cell: any) => void;
    });
    host: HTMLElement;
    handlers: {
        onCellDblClick?: (cell: any) => void;
    };
    model: any;
    el: HTMLDivElement;
    warningEl: HTMLDivElement;
    wrapEl: HTMLDivElement;
    /** モデルを描画する */
    render(model: any): void;
    destroy(): void;
}
