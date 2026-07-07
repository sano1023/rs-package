/**
 * テーブルモデルを構築する。
 * @param {object} result aggregate() の戻り値
 * @param {object} opts { formatters: ((v)=>string)[], maxCells?: number }
 * @returns {{ empty?: string, headerRows?, bodyRows?, entries?, warning? }}
 */
export function buildTableModel(result: object, opts?: object): {
    empty?: string;
    headerRows?: any;
    bodyRows?: any;
    entries?: any;
    warning?: any;
};
/** 列エントリのフラット化ラベル（CSVヘッダ・明細タイトル用） */
export function entryPathLabel(entry: any, valueLabel: any): string;
