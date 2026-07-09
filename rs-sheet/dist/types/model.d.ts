export const DEFAULT_ROWS: 100;
export const DEFAULT_COLS: 26;
export class SheetModel {
    /** Map のキーを軸方向にシフトする共通処理 */
    static shiftMap(map: any, axis: any, index: any, count: any, isDelete: any): Map<any, any>;
    /** 範囲 {r0,c0,r1,c1} を軸方向にシフト。全体が削除されたら null */
    static shiftRange(range: any, axis: any, index: any, count: any, isDelete: any): any;
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
        /** @type {Array<{r0,c0,r1,c1}>} セル結合領域 */
        merges: Array<{
            r0: any;
            c0: any;
            r1: any;
            c1: any;
        }>;
        /** {rows, cols} ウィンドウ枠固定（先頭 N 行 / M 列を固定） */
        freeze: {
            rows: number;
            cols: number;
        };
        /** @type {Array<{range:{r0,c0,r1,c1}, type, ...}>} 条件付き書式 */
        condFormats: Array<{
            range: {
                r0: any;
                c0: any;
                r1: any;
                c1: any;
            };
            type: any;
        }>;
        /** @type {Array<{range:{r0,c0,r1,c1}, ...}>} データ検証 */
        validations: Array<{
            range: {
                r0: any;
                c0: any;
                r1: any;
                c1: any;
            };
        }>;
        /** @type {Array<{range:{r0,c0,r1,c1}, type, options}>} カスタムセル型（v0.4: checkbox/select 等） */
        cellTypes: Array<{
            range: {
                r0: any;
                c0: any;
                r1: any;
                c1: any;
            };
            type: any;
            options: any;
        }>;
        /** {r0,c0,r1,c1, headerRow, columns:{colIndex:[許可値]}} オートフィルタ（無効=null） */
        filter: null;
        /** @type {Set<number>} フィルタで非表示の行（非直列化・実行時のみ） */
        hiddenRows: Set<number>;
    }[];
    activeSheet: number;
    /** @type {Map<string, {name: string, node: object}>} 名前付き範囲（ブック共有・キーは小文字名） */
    names: Map<string, {
        name: string;
        node: object;
    }>;
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
        /** @type {Array<{r0,c0,r1,c1}>} セル結合領域 */
        merges: Array<{
            r0: any;
            c0: any;
            r1: any;
            c1: any;
        }>;
        /** {rows, cols} ウィンドウ枠固定（先頭 N 行 / M 列を固定） */
        freeze: {
            rows: number;
            cols: number;
        };
        /** @type {Array<{range:{r0,c0,r1,c1}, type, ...}>} 条件付き書式 */
        condFormats: Array<{
            range: {
                r0: any;
                c0: any;
                r1: any;
                c1: any;
            };
            type: any;
        }>;
        /** @type {Array<{range:{r0,c0,r1,c1}, ...}>} データ検証 */
        validations: Array<{
            range: {
                r0: any;
                c0: any;
                r1: any;
                c1: any;
            };
        }>;
        /** @type {Array<{range:{r0,c0,r1,c1}, type, options}>} カスタムセル型（v0.4: checkbox/select 等） */
        cellTypes: Array<{
            range: {
                r0: any;
                c0: any;
                r1: any;
                c1: any;
            };
            type: any;
            options: any;
        }>;
        /** {r0,c0,r1,c1, headerRow, columns:{colIndex:[許可値]}} オートフィルタ（無効=null） */
        filter: null;
        /** @type {Set<number>} フィルタで非表示の行（非直列化・実行時のみ） */
        hiddenRows: Set<number>;
    };
    /** シート名 → インデックス（大文字小文字を区別しない）。見つからなければ -1 */
    indexOfSheet(name: any): number;
    /** 既存と衝突しない一意なシート名にする */
    uniqueSheetName(base: any): string;
    /** シートを末尾に追加してそのインデックスを返す */
    addSheet(name: any, rows?: number, cols?: number): number;
    /** シートを削除する（最後の1枚は消せない）。依存グラフの再構築は Engine 側 */
    removeSheet(index: any): boolean;
    /** シート名を変更する（数式内のシート修飾子の書き換えは Engine 側）。実際に付いた名前を返す */
    renameSheet(index: any, name: any): any;
    /** 名前を定義する（node は ref/range の AST。シート名を明示的に持つ） */
    defineName(name: any, node: any): void;
    /** 名前定義を削除する */
    deleteName(name: any): boolean;
    /** 名前 → 定義ノード（ref/range）。未定義なら null */
    resolveNameNode(name: any): object | null;
    /** 定義済みの名前一覧 [{name, node}] */
    listNames(): {
        name: string;
        node: object;
    }[];
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
    /** 行列の挿入・削除に伴い v0.2 の表現力状態（結合・書式・検証・固定）を追従させる */
    shiftFeatures(s: any, axis: any, index: any, count: any, isDelete: any): void;
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
    /** 名前付き範囲を {名前: 'Sheet1!A1:A10'} 形式で直列化する */
    namedRangesJSON(): {};
}
import { parseRangeA1 } from './refs.js';
import { letterToCol } from './refs.js';
export { parseRangeA1, letterToCol };
