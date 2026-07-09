/** 文字列をトークン列に変換する。構文エラー時は例外を投げる */
export function tokenize(src: any): ({
    type: string;
    value: string;
} | {
    type: string;
    value: number;
} | {
    type: string;
    value: boolean;
})[];
/**
 * トークン列を AST に変換する（再帰下降）。
 * 文法:
 *   or     := and ( '||' and )*
 *   and    := unary ( '&&' unary )*
 *   unary  := '!' unary | compare
 *   compare:= add ( (==|!=|>|>=|<|<=|contains) add | empty | notempty )?
 *   add    := mul ( ('+'|'-') mul )*
 *   mul    := neg ( ('*'|'/'|'%') neg )*
 *   neg    := '-' neg | primary
 *   primary:= '(' or ')' | 数値 | 文字列 | 真偽 | 識別子
 */
export function parseExpr(src: any): any;
/** 値が「空」か（empty / notempty / 必須判定と共通の定義） */
export function isEmptyValue(v: any): boolean;
/**
 * AST を評価する。
 * @param {object} ast parseExpr の戻り値
 * @param {(name: string) => any} getValue 質問name → 回答値（非表示は undefined を返すこと）
 */
export function evalAst(ast: object, getValue: (name: string) => any): any;
/** AST が参照する質問name の集合（依存変更時のみ再評価するために使う） */
export function collectRefs(ast: any, out?: Set<any>): Set<any>;
/**
 * 式文字列をコンパイルして { eval(getValue), deps } を返す。
 * 構文エラー時は例外（呼び出し側で console.warn し「常に表示」へフォールバックする）。
 */
export function compileExpr(src: any): {
    deps: Set<any>;
    eval: (getValue: any) => boolean;
};
/**
 * 計算フィールド用に式をコンパイルして { eval(getValue), deps } を返す（v0.4）。
 * compileExpr と違い、評価結果を真偽に丸めず生の値（数値/文字列）で返す。
 * 例: compileCalc('price * qty').eval(name => answers[name])
 */
export function compileCalc(src: any): {
    deps: Set<any>;
    eval: (getValue: any) => any;
};
