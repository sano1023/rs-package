/** テキスト内の一致数を数える */
export function countMatches(text: any, query: any, { matchCase, wholeCell }?: {
    matchCase?: boolean | undefined;
    wholeCell?: boolean | undefined;
}): number;
/** テキストを置換した結果を返す（一致なしなら元のまま） */
export function replaceInText(text: any, query: any, replacement: any, { matchCase, wholeCell }?: {
    matchCase?: boolean | undefined;
    wholeCell?: boolean | undefined;
}): string;
/**
 * 一致するセルを列挙する。
 * @returns {Array<{sheet, row, col, raw}>}
 */
export function findMatches(model: any, query: any, opts?: {}): Array<{
    sheet: any;
    row: any;
    col: any;
    raw: any;
}>;
/**
 * 置換対象セルの変更 entries を計算する（applyCellChanges 用）。
 * @returns {Array<{sheet, row, col, raw}>}
 */
export function computeReplacements(model: any, query: any, replacement: any, opts?: {}): Array<{
    sheet: any;
    row: any;
    col: any;
    raw: any;
}>;
