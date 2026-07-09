/**
 * エンジンの単一セル変更 → 1つの op（{type, payload}）。
 * @param {object} change  { sheet, row, col, old:{raw,format,style}, next:{raw,format,style} }
 * @param {string} sheetName  シート表示名
 * @param {*} [value]  評価済みの実値（任意）
 */
export function cellChangeToOp(change: object, sheetName: string, value?: any): {
    type: string;
    payload: {
        sheet: string;
        sheetIndex: any;
        ref: string;
        row: any;
        col: any;
        oldRaw: any;
        newRaw: any;
        oldFormat: any;
        newFormat: any;
        oldStyle: any;
        newStyle: any;
        value: any;
    };
};
/**
 * エンジンの変更リスト → op 列。
 * @param {Array} changes  applyCellChanges の changes
 * @param {(sheetIndex:number)=>string} resolveName  シート index → 名前
 * @param {(change:object)=>*} [resolveValue]  変更後の実値を返す（任意）
 * @returns {Array<{type,payload}>}
 */
export function changesToOps(changes: any[], resolveName: (sheetIndex: number) => string, resolveValue?: (change: object) => any): Array<{
    type: any;
    payload: any;
}>;
/**
 * 構造変更（行/列の挿入・削除）→ 1つの op。
 * @param {'row'|'col'} axis
 * @param {'insert'|'delete'} kind
 */
export function structuralOp(axis: "row" | "col", kind: "insert" | "delete", sheetName: any, sheetIndex: any, index: any, count?: number): {
    type: string;
    payload: {
        sheet: any;
        sheetIndex: any;
        index: any;
        count: number;
    };
};
/**
 * op（set-cell / clear-cell）→ エンジンの applyCellChanges 用エントリ。
 * 受信側（共同編集の相手）でストリームを再適用するための復元関数。
 * @param {{type,payload}} op
 * @param {(name:string)=>number} [resolveIndex]  シート名 → index（省略時は payload.sheetIndex）
 * @returns {object|null}  {sheet,row,col,raw,format,style} または対象外なら null
 */
export function opToEntry(op: {
    type: any;
    payload: any;
}, resolveIndex?: (name: string) => number): object | null;
/** op 列を順に applyCellChanges 用エントリへ（構造 op は skip）。共同編集の受信側で使う */
export function opsToEntries(ops: any, resolveIndex?: null): object[];
export namespace OP {
    let SET_CELL: string;
    let CLEAR_CELL: string;
    let INSERT_ROWS: string;
    let DELETE_ROWS: string;
    let INSERT_COLS: string;
    let DELETE_COLS: string;
}
