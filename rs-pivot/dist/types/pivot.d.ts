export class Pivot {
    /**
     * @param {string|HTMLElement} target コンテナ（セレクタ or 要素）
     * @param {object} options { data, slice, fiscalYear?, format?, aggregations?, fieldPanel?, detailModal?, maxCells? }
     */
    constructor(target: string | HTMLElement, options?: object);
    el: any;
    options: object;
    registry: Map<any, any>;
    listeners: Map<any, any>;
    destroyed: boolean;
    store: {
        count: number;
        records: object[];
        fieldNames: string[];
        fields: {
            name: string;
            type: any;
        }[];
        column: (n: any) => any;
        fieldType: (n: any) => any;
        distinctValues(n: any): any[];
    };
    sliceModel: SliceModel;
    rootEl: HTMLDivElement;
    fieldPanel: FieldPanel | null;
    resultTable: ResultTable;
    /** 再集計 + 再描画 */
    refresh(): this | undefined;
    result: {
        store: object;
        slice: object;
        options: any;
        fiscal: boolean;
        rowFields: any;
        colFields: any;
        valueDefs: any;
        rowRoot: {
            id: number;
            code: any;
            label: any;
            sortVal: any;
            depth: any;
            parent: any;
            children: Map<any, any>;
            childList: never[];
            cells: null;
        };
        colRoot: {
            id: number;
            code: any;
            label: any;
            sortVal: any;
            depth: any;
            parent: any;
            children: Map<any, any>;
            childList: never[];
            cells: null;
        };
        indices: number[];
        cellResult: (rowNode: any, colNode: any, vi: any) => any;
        recordsForCell: (rowNode: any, colNode: any) => any[];
    } | undefined;
    model: {
        empty?: string;
        headerRows?: any;
        bodyRows?: any;
        entries?: any;
        warning?: any;
    } | undefined;
    _onCellDblClick(cell: any): void;
    on(name: any, fn: any): this;
    off(name: any, fn: any): this;
    emit(name: any, payload: any): void;
    /** スライス定義（レイアウト）をプレーンなJSONで返す */
    toJSON(): {
        rows: {
            field: any;
        }[];
        columns: {
            field: any;
        }[];
        values: {
            field: any;
            agg: any;
        }[];
        filters: {
            field: any;
        }[];
        options: {
            fiscalYear: boolean;
            subtotals: boolean;
            grandTotals: boolean;
        };
    };
    /** スライス定義を復元する（未知キーは無視・後方互換） */
    fromJSON(json: any): this;
    /** データを入れ替える（スライスは維持。消えたフィールドは除去） */
    setData(records: any): this;
    /** CSV文字列を返す（既定は生値・BOMなし） */
    getCSV(opts?: {}): string;
    /** TSV文字列を返す */
    getTSV(opts?: {}): string;
    /** CSVをダウンロードする（BOM付きUTF-8・Excel対応） */
    exportCSV(filename?: string): this;
    /** TSVをダウンロードする（BOM付きUTF-8） */
    exportTSV(filename?: string): this;
    /** セルのフラット化ラベル（外部連携・デバッグ用） */
    cellLabel(entry: any, valueLabel: any): string;
    destroy(): void;
}
import { SliceModel } from './slice.js';
import { FieldPanel } from './field-panel.js';
import { ResultTable } from './result-table.js';
