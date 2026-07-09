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
    calculatedFields: any[];
    cellRenderer: any;
    _charts: any[];
    _renderWaiters: any[];
    store: {
        count: number;
        records: object[];
        fieldNames: any[];
        calcFieldNames: any[];
        fields: {
            name: any;
            type: any;
            calc: boolean;
        }[];
        column: (n: any) => any;
        fieldType: (n: any) => any;
        distinctValues(n: any): any[];
    };
    worker: boolean;
    _workerReqId: number;
    workerClient: PivotWorkerClient | undefined;
    _workerReady: Promise<any> | undefined;
    sliceModel: SliceModel;
    templates: ReportTemplates;
    _lastTemplate: string | null;
    _templateApi: {
        list: () => any[];
        current: () => string | null;
        apply: (name: any) => boolean;
        save: (name: any) => boolean;
        remove: (name: any) => boolean;
    };
    rootEl: HTMLDivElement;
    fieldPanel: FieldPanel | null;
    resultTable: ResultTable;
    /** 集計に用いるスライスを返す（フラットモードでは列を行に畳んで一覧表化） */
    _sliceForAggregation(): {
        rows: {
            dateGroup: any;
            field: any;
            sort: any;
            topN: {
                n: number;
            } | null;
        }[];
        columns: {
            dateGroup: any;
            field: any;
            sort: any;
            topN: {
                n: number;
            } | null;
        }[];
        values: {
            field: any;
            agg: any;
            label: any;
            format: any;
            showAs: any;
        }[];
        filters: {
            field: any;
            include: any[] | null;
            exclude: any[] | null;
        }[];
        options: {
            fiscalYear: boolean;
            subtotals: boolean;
            grandTotals: boolean;
            flat: boolean;
            collapsed: {
                rows: string[][];
                columns: string[][];
            };
            valuePlacement: string;
        };
    };
    /** 再集計 + 再描画。worker:true では集計を Worker で回し非同期に描画する */
    refresh(): this;
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
    } | {
        store: object;
        slice: object;
        options: any;
        fiscal: any;
        rowFields: any;
        colFields: any;
        valueDefs: any;
        rowRoot: any;
        colRoot: any;
        indices: {
            length: any;
        };
        cellResult: (rowNode: any, colNode: any, vi: any) => any;
        recordsForCell: (rowNode: any, colNode: any) => any[];
    } | undefined;
    /** 集計結果からテーブルモデルを組んで描画し、連携チャートを更新する */
    _buildAndRender(state: any): void;
    model: {
        headerRows: {
            text: any;
            colSpan: number;
            rowSpan: number;
            kind: string;
        }[][];
        bodyRows: {
            kind: string;
            node: any;
            headerCells: {
                text: any;
                colSpan: number;
                rowSpan: number;
            }[];
        }[];
        entries: {
            node: any;
            kind: string;
        }[];
        columns: any;
        valueDefs: any;
        rowFields: any;
        colFields: never[];
        RH: number;
        warning: string | null;
        stats: {
            min: number;
            max: number;
            count: number;
        }[];
        flat: boolean;
    } | {
        headerRows: {
            text: string;
            colSpan: number;
            rowSpan: any;
            kind: string;
        }[][];
        bodyRows: {
            kind: string;
            node: any;
            headerCells: {
                text: string;
                colSpan: number;
                rowSpan: number;
            }[];
        }[];
        entries: any;
        columns: {
            entry: any;
            vi: number;
        }[];
        valueDefs: any;
        rowFields: any;
        colFields: any;
        RH: number;
        warning: string | null;
        stats: {
            min: number;
            max: number;
            count: number;
        }[];
        flat: boolean;
        valuePlacement: string;
    } | {
        empty: string;
        headerRows?: undefined;
        bodyRows?: undefined;
        entries?: undefined;
        columns?: undefined;
        valueDefs?: undefined;
        rowFields?: undefined;
        colFields?: undefined;
        RH?: undefined;
        warning?: undefined;
        stats?: undefined;
        flat?: undefined;
        valuePlacement?: undefined;
    } | {
        headerRows: (({
            text: string;
            colSpan: any;
            rowSpan: any;
            kind: string;
            toggle?: undefined;
            axis?: undefined;
            path?: undefined;
        } | {
            text: any;
            colSpan: any;
            rowSpan: number;
            kind: string;
            toggle: string;
            axis: string;
            path: any[];
        })[] | {
            text: any;
            colSpan: number;
            rowSpan: number;
            kind: string;
        }[])[];
        bodyRows: {
            kind: string;
            node: any;
            headerCells: {
                text: string;
                colSpan: number;
                rowSpan: number;
            }[];
        }[];
        entries: {
            node: any;
            kind: string;
        }[];
        columns: {
            entry: {
                node: any;
                kind: string;
            };
            vi: number;
        }[];
        valueDefs: any;
        rowFields: any;
        colFields: any;
        RH: number;
        warning: string | null;
        stats: {
            min: number;
            max: number;
            count: number;
        }[];
        flat: boolean;
        valuePlacement: string;
        empty?: undefined;
    } | undefined;
    /** Worker で集計 → 復元 → 描画（後方互換のためメインスレッド失敗時はフォールバック） */
    _refreshViaWorker(): void;
    /** 次の描画完了で解決する Promise（worker:true の非同期描画待ちに使う） */
    whenRendered(): Promise<any>;
    _flushRenderWaiters(): void;
    /** 条件付き書式のセルレンダラを設定する（heatmap()/dataBar() 等・null で解除） */
    setCellRenderer(fn: any): this;
    /** 計算フィールドを設定する（[{ name, expression }]）。データを保ったまま列を再構築 */
    setCalculatedFields(defs: any): this;
    _onCellDblClick(cell: any): void;
    /**
     * 現在のスライスを rs-chart のチャートにする（v0.3）。再スライスで自動更新。
     * @param {string|HTMLElement} target チャートのコンテナ
     * @param {object} opts { type?, value?, createChart?, ...rs-chart オプション }
     * @returns rs-chart インスタンス
     */
    chart(target: string | HTMLElement, opts?: object): any;
    _resolveChartFactory(opts: any): any;
    _resolveGridFactory(): any;
    /** 連携中の rs-chart を現在のスライスで更新する（再スライスのたびに呼ばれる） */
    _updateCharts(): void;
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
            flat: boolean;
            collapsed: {
                rows: string[][];
                columns: string[][];
            };
            valuePlacement: string;
        };
    };
    /** スライス定義を復元する（未知キーは無視・後方互換） */
    fromJSON(json: any): this;
    /** 現在のスライスを名前付きテンプレートとして保存する（同名は上書き・localStorage併用可） */
    saveTemplate(name: any): boolean;
    /** 名前付きテンプレートを呼び出してスライスを復元する（表が丸ごと入れ替わる） */
    applyTemplate(name: any): boolean;
    /** 名前付きテンプレートを削除する */
    deleteTemplate(name: any): boolean;
    /** 保存済みテンプレート名の一覧を返す */
    getTemplates(): any[];
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
import { PivotWorkerClient } from './worker-client.js';
import { SliceModel } from './slice.js';
import { ReportTemplates } from './report-templates.js';
import { FieldPanel } from './field-panel.js';
import { ResultTable } from './result-table.js';
