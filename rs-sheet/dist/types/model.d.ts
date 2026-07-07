export const DEFAULT_ROWS: 100;
export const DEFAULT_COLS: 26;
export class SheetModel {
    /** Map のキーを軸方向にシフトする共通処理 */
    static shiftMap(map: any, axis: any, index: any, count: any, isDelete: any): Map<any, any>;
    static shiftMeta(meta: any, index: any, count: any, isDelete: any): Map<any, any>;
    /**
     * JSON → モデル（value は復元せず raw のみ。再計算は engine 側）。
     * セルの流し込みは cb(model, sheetIdx, row, col, def) に委譲する
     */
    static fromJSON(json: any, cb: any): SheetModel;
    sheets: {
        name: any;
        rows: any;
        cols: any;
        /** @type {Map<string, object>} */
        cells: Map<string, object>;
        /** @type {Map<number, {width?: number}>} */
        colMeta: Map<number, {
            width?: number;
        }>;
        /** @type {Map<number, {height?: number}>} */
        rowMeta: Map<number, {
            height?: number;
        }>;
    }[];
    activeSheet: number;
    sheet(i?: number): {
        name: any;
        rows: any;
        cols: any;
        /** @type {Map<string, object>} */
        cells: Map<string, object>;
        /** @type {Map<number, {width?: number}>} */
        colMeta: Map<number, {
            width?: number;
        }>;
        /** @type {Map<number, {height?: number}>} */
        rowMeta: Map<number, {
            height?: number;
        }>;
    };
    /** シート名 → インデックス（大文字小文字を区別しない）。見つからなければ -1 */
    indexOfSheet(name: any): number;
    getCell(s: any, r: any, c: any): object | undefined;
    ensureCell(s: any, r: any, c: any): object;
    deleteCell(s: any, r: any, c: any): void;
    /** 全シートの数式セルを列挙する */
    formulaCells(): Generator<{
        sheet: number;
        row: number;
        col: number;
        cell: object;
    }, void, unknown>;
    colWidth(s: any, c: any, fallback: any): any;
    rowHeight(s: any, r: any, fallback: any): any;
    setColWidth(s: any, c: any, width: any): void;
    setRowHeight(s: any, r: any, height: any): void;
    insertRows(s: any, index: any, count?: number): void;
    deleteRows(s: any, index: any, count?: number): void;
    insertCols(s: any, index: any, count?: number): void;
    deleteCols(s: any, index: any, count?: number): void;
    /** toJSON スキーマ（REQUIREMENTS 準拠）。value は保存しない */
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
}
import { parseRangeA1 } from './refs.js';
import { letterToCol } from './refs.js';
export { parseRangeA1, letterToCol };
