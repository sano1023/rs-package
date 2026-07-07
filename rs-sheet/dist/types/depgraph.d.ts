/**
 * rs-sheet 依存グラフ（純粋モジュール・DOM非依存）
 *
 * セルごとに precedents（参照先）/ dependents（参照元）の双方向グラフを保持する。
 * - 単一セル参照: 双方向の完全なエッジ（id ⇔ id）
 * - 範囲参照: 参照元ごとの「範囲購読」として持つ（SUM(A1:A10000) で1万本の
 *   エッジを張らない）。変更セルが範囲に含まれるかの判定で dependents を求める
 *
 * セルID: `${sheetIndex}:${row},${col}`
 */
export function cellId(sheet: any, row: any, col: any): string;
export function parseId(id: any): {
    sheet: number;
    row: number;
    col: number;
};
export class DependencyGraph {
    /** @type {Map<string, {cells: Set<string>, ranges: Array<{sheet,r0,c0,r1,c1}>}>} 参照先 */
    precedents: Map<string, {
        cells: Set<string>;
        ranges: Array<{
            sheet: any;
            r0: any;
            c0: any;
            r1: any;
            c1: any;
        }>;
    }>;
    /** @type {Map<string, Set<string>>} 単一参照の逆引き */
    dependents: Map<string, Set<string>>;
    /** @type {Map<number, Array<{id, r0, c0, r1, c1}>>} シートごとの範囲購読 */
    rangeSubs: Map<number, Array<{
        id: any;
        r0: any;
        c0: any;
        r1: any;
        c1: any;
    }>>;
    clear(): void;
    /** セル id の依存（参照先）を置き換える */
    setDeps(id: any, cells: any, ranges: any): void;
    removeDeps(id: any): void;
    /** 座標 (sheet,row,col) のセルに依存している数式セル id を列挙する */
    dependentsOf(sheet: any, row: any, col: any, out: any): any;
    /**
     * 変更セル集合から影響を受ける数式セルの集合（推移的閉包）を求める
     * @param {Iterable<string>} seedIds
     * @returns {Set<string>} 影響セル（数式かどうかは呼び出し側で判定）
     */
    affectedBy(seedIds: Iterable<string>): Set<string>;
    /** id の参照先のうち、集合 within に含まれるものを列挙する（トポロジカル順序付け用） */
    precedentsWithin(id: any, within: any): any[];
}
