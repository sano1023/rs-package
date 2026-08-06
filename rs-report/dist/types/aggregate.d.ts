/**
 * 行集合から1つの集計値を求める。
 * @param {object[]} rows
 * @param {'sum'|'count'|'avg'|'min'|'max'|'first'|'last'|'countDistinct'} name
 * @param {string|((row: object) => any)|null} field
 *   ドットパス、または行ごとの評価関数（`@sum(qty * unitPrice)` のような式集計）。count のみ省略可
 * @returns {number|any}
 */
export function aggregateRows(rows: object[], name: "sum" | "count" | "avg" | "min" | "max" | "first" | "last" | "countDistinct", field: string | ((row: object) => any) | null): number | any;
/**
 * 式エンジンへ渡す `agg(name, field, scope)` を作る。
 *
 * @param {object} sources 行集合の供給元
 * @param {object[]} sources.report 全行
 * @param {object[]} [sources.page] このページの行
 * @param {object[][]} [sources.groups] グループ階層の行（groups[0] が最上位）
 * @param {object[]} [sources.carryIn] ページ開始時点までの累計対象行
 * @param {object[]} [sources.carryOut] ページ終了時点までの累計対象行
 * @param {'report'|'page'|'group'} [defaultScope='report'] スコープ省略時の対象
 * @returns {(name: string, field: string|null, scope: string|null) => any}
 */
export function createAggFn(sources: {
    report: object[];
    page?: object[] | undefined;
    groups?: object[][] | undefined;
    carryIn?: object[] | undefined;
    carryOut?: object[] | undefined;
}, defaultScope?: "report" | "page" | "group"): (name: string, field: string | null, scope: string | null) => any;
/**
 * グループ化。`groups` 定義に従って行を並べ替え、階層のキー境界を求める。
 *
 * 返り値は「行の並び（sorted）」と「各行の各階層のキー」で、改ページ処理側が
 * キーの変化だけを見てヘッダ/フッタを差し込めるようにする。
 *
 * @param {object[]} rows
 * @param {Array<{by:string, sort?:'asc'|'desc'|'none', format?:string}>} [groupDefs=[]]
 * @returns {{ rows: object[], keys: Array<any[]> }} keys[rowIndex][level]
 */
export function groupRows(rows: object[], groupDefs?: Array<{
    by: string;
    sort?: "asc" | "desc" | "none";
    format?: string;
}>): {
    rows: object[];
    keys: Array<any[]>;
};
