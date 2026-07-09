/**
 * rs-sheet AST変形（純粋関数・DOM非依存）
 *
 * - フィル/コピー時の相対参照シフト（絶対参照は固定）
 * - 行/列の挿入・削除に伴う参照の再配置（削除範囲を指す参照は #REF! に落とす）
 * - 依存グラフ用の参照収集
 *
 * すべて元の AST を変更せず、新しい AST を返す。
 */
/** AST を再帰的に写像する。fn(node) が ref/range ノードを置換する */
export function mapRefs(node: any, fn: any): any;
/** AST 内の名前付き範囲ノード（name）を列挙する */
export function collectNames(node: any, out?: any[]): any[];
/** AST 内の参照ノード（ref / range）を列挙する */
export function collectRefs(node: any, out?: any[]): any[];
/**
 * フィル/コピー時の相対シフト。絶対参照（$）の軸は動かさない。
 * シフト先が負（シート外）になった参照は #REF! ノードに落とす。
 */
export function shiftForCopy(ast: any, dRow: any, dCol: any): any;
/**
 * 行/列の挿入・削除に伴う参照再配置。
 * @param {object} ast
 * @param {'row'|'col'} axis
 * @param {'insert'|'delete'} op
 * @param {number} index 挿入位置 / 削除開始位置（0始まり）
 * @param {number} count
 * @param {(sheetName: string|null) => boolean} affects この参照のシートが変更対象か
 * @returns {{ast, changed: boolean}}
 */
export function adjustForStructure(ast: object, axis: "row" | "col", op: "insert" | "delete", index: number, count: number, affects?: (sheetName: string | null) => boolean): {
    ast: any;
    changed: boolean;
};
