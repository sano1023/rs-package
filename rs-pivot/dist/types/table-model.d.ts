/**
 * テーブルモデルを構築する。
 * @param {object} result aggregate() の戻り値
 * @param {object} opts { formatters, maxCells?, flat? }
 */
export function buildTableModel(result: object, opts?: object): {
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
};
/** 列エントリのフラット化ラベル（CSVヘッダ・明細タイトル用） */
export function entryPathLabel(entry: any, valueLabel: any): string;
