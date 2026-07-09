/**
 * CSV テキスト → 2次元配列（文字列）。
 * @param {string} text
 * @param {string} delimiter 既定 ','
 */
export function parseCSV(text: string, delimiter?: string): string[][];
/**
 * 2次元配列 → CSV テキスト。
 * @param {Array<Array>} rows
 * @param {string} delimiter
 */
export function stringifyCSV(rows: Array<any[]>, delimiter?: string): string;
/** シートの使用範囲（値のあるセルの最大行・最大列）。空なら {r1:-1,c1:-1} */
export function usedBounds(sheet: any): {
    r0: number;
    c0: number;
    r1: number;
    c1: number;
};
/**
 * シートモデル → 2次元配列。
 * @param {object} sheet SheetModel のシートオブジェクト
 * @param {object} opts { mode:'raw'|'value', format:(value,fmt)=>string }
 */
export function sheetToGrid(sheet: object, { mode, format }?: object): any[][];
