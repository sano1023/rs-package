/**
 * rs-report データソース（v0.5）
 *
 * 帳票の rows を「どこから持ってくるか」を吸収する小さな層。
 * 本体は依存ゼロのまま、インスタンスを**注入**して受け取る。
 *
 *   rowsFromCSV(text)                 … CSV/TSV 文字列 → 行オブジェクト配列（差し込み印刷の入口）
 *   rowsFromRSGrid(grid)              … rs-grid の全行スナップショット
 *   rowsFromRSSheet(sheet, options)   … rs-sheet のシート（1行目=ヘッダ）
 *   rowsFromRSPivot(pivot)            … rs-pivot の集計結果（CSV 経由）
 *
 * すべて「行オブジェクトの配列」を返すだけなので、renderReport / createRSReport の
 * data.rows にそのまま渡せる。
 */
/**
 * CSV/TSV をパースする（RFC4180 のダブルクォート・改行内包・BOM に対応）。
 * @param {string} text
 * @param {{ delimiter?: string }} [options] 省略時はタブ含有で自動判定
 * @returns {string[][]}
 */
export function parseCSV(text: string, options?: {
    delimiter?: string;
}): string[][];
/**
 * CSV/TSV 文字列を行オブジェクト配列にする（1行目をヘッダとして使う）。
 * 数値らしいセルは number にする（差し込み後に `{{ @sum(...) }}` が効くように）。
 *
 * @param {string} text
 * @param {{ delimiter?: string, headers?: string[], coerce?: boolean }} [options]
 *   headers を渡すと 1 行目もデータとして扱う。coerce: false で数値変換を止める
 * @returns {object[]}
 */
export function rowsFromCSV(text: string, options?: {
    delimiter?: string;
    headers?: string[];
    coerce?: boolean;
}): object[];
/**
 * rs-grid のインスタンスから全行を取り出す。
 * @param {{ getData: () => object[] }} grid createRSGrid の戻り値
 * @returns {object[]}
 */
export function rowsFromRSGrid(grid: {
    getData: () => object[];
}): object[];
/**
 * rs-sheet のシートを行オブジェクトにする（1行目=ヘッダ）。
 * @param {{ exportCSV: Function }} sheet createRSSheet の戻り値
 * @param {{ sheet?: number, coerce?: boolean }} [options]
 * @returns {object[]}
 */
export function rowsFromRSSheet(sheet: {
    exportCSV: Function;
}, options?: {
    sheet?: number;
    coerce?: boolean;
}): object[];
/**
 * rs-pivot の集計結果（現在のスライス・展開状態）を行オブジェクトにする。
 * @param {{ getCSV?: Function, toCSV?: Function }} pivot createRSPivot の戻り値
 * @param {{ coerce?: boolean }} [options]
 * @returns {object[]}
 */
export function rowsFromRSPivot(pivot: {
    getCSV?: Function;
    toCSV?: Function;
}, options?: {
    coerce?: boolean;
}): object[];
