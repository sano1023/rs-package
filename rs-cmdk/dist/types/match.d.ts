/**
 * 検索用に文字列を正規化する。
 * 小文字化 → 全角英数→半角 → 半角カナ→全角 → カタカナ→ひらがな。
 * @param {string} text
 * @returns {string}
 */
export function normalizeForSearch(text: string): string;
/**
 * ローマ字らしき文字列をひらがなへ変換する（変換できない文字はそのまま）。
 * 促音（kk → っk）・撥音（n の後に子音）に対応。
 * @param {string} text 正規化済み（小文字）を想定
 * @returns {string}
 */
export function romajiToHiragana(text: string): string;
/**
 * 候補が検索クエリに一致するか。
 * label / kana の正規化形に対して、(1) クエリ正規化形の部分一致、
 * (2) クエリをローマ字→かな変換した形の部分一致、のどちらかで当てる。
 * @param {{ label: string, kana?: string }} item
 * @param {string} query
 * @returns {boolean}
 */
export function matches(item: {
    label: string;
    kana?: string;
}, query: string): boolean;
