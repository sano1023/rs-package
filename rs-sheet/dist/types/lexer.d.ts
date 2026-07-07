/** 全角→半角の正規化（数式・数値入力の両方で使う） */
export function normalizeFullwidth(s: any): string;
/**
 * 数式本体（'=' を除いた文字列）をトークン列にする。
 * 不正な文字は RSError('#NAME?') を throw する。
 */
export function tokenize(src: any): ({
    t: string;
    v: number;
} | {
    t: string;
    v: string;
} | {
    t: string;
    v: boolean;
})[];
export function isFormula(v: any): boolean;
