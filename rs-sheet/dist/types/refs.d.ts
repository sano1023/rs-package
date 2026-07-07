/**
 * rs-sheet セル参照ユーティリティ（純粋関数）
 *
 * - 列インデックス⇔レター（A, B, ... Z, AA ...）
 * - A1形式⇔ {row, col}（0始まりの内部インデックス）
 * - セルマップのキー（'row,col' 文字列）
 */
/** 列インデックス（0始まり）→ 'A' 'B' ... 'Z' 'AA' ... */
export function colToLetter(i: any): string;
/** 'A' → 0, 'AA' → 26 */
export function letterToCol(s: any): number;
/** セルマップのキー */
export function cellKey(row: any, col: any): string;
/** キー → {row, col} */
export function parseKey(key: any): {
    row: number;
    col: number;
};
/**
 * A1形式（$付き絶対参照可）→ {row, col, absRow, absCol}。不正なら null
 */
export function parseA1(s: any): {
    col: number;
    row: number;
    absCol: boolean;
    absRow: boolean;
} | null;
/** {row, col} → 'B2'（abs フラグ付きは '$B$2'） */
export function toA1(ref: any): string;
/** 行列インデックス → 'B2'（絶対参照なしの簡易版） */
export function a1(row: any, col: any): string;
/**
 * 'B2' または 'B2:D4' → {r0, c0, r1, c1}（正規化済み）。不正なら null
 */
export function parseRangeA1(s: any): {
    r0: number;
    c0: number;
    r1: number;
    c1: number;
} | null;
