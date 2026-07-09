/** 素のJSONの deep clone（関数・DOM を含まない前提） */
export function clone(x: any): any;
/**
 * スキーマを正規化して返す（元は変更しない）。
 * `{ questions: [...] }` の単一ページ形式も `{ pages: [{ questions }] }` に揃え、
 * 空でも最低1ページを持たせる。ビルダーは常にこの形で保持する。
 */
export function normalizeSchema(schema: any): any;
/** 全質問をフラットに列挙する（{ q, page, index }） */
export function allQuestions(schema: any): any[];
/** name から質問の位置を探す（{ q, page, index } | null） */
export function locate(schema: any, name: any): {
    q: any;
    page: number;
    index: number;
} | null;
/** スキーマ内で未使用の name を type から生成する（text1, text2, …） */
export function genName(schema: any, type: any): string;
/** 選択肢系タイプか（choices を持つ） */
export function isChoiceType(type: any): boolean;
/** タイプ既定の質問オブジェクトを作る（選択肢・行/列などの雛形つき） */
export function defaultQuestion(type: any, name: any, label: any): {
    type: any;
    name: any;
    label: any;
};
/**
 * 質問を追加する。
 * @returns {{ schema, name, page, index }}
 */
export function addQuestion(schema: any, type: any, opts?: {}): {
    schema: any;
    name: any;
    page: any;
    index: any;
};
/** name の質問を削除した新しいスキーマを返す */
export function removeQuestion(schema: any, name: any): any;
/**
 * 質問を移動する。destIndex は「移動対象を取り除いた後の」配列内インデックス
 * （＝挿入位置。ドラッグ中の要素を除いたカード列から算出した値と一致する）。
 */
export function moveQuestion(schema: any, name: any, destPage: any, destIndex: any): any;
/**
 * 質問名を変更し、他の質問の visibleIf 内の参照も追従させた新しいスキーマを返す。
 */
export function renameQuestion(schema: any, oldName: any, newName: any): any;
/**
 * 質問のプロパティを更新した新しいスキーマを返す。
 * patch の値が undefined のキーは削除する（プロパティのクリアに使う）。
 */
export function updateQuestion(schema: any, name: any, patch: any): any;
/**
 * 1行1選択肢のテキストを choices 配列に変換する。
 * 「値 | 表示ラベル」で value と表示テキストを分けられる（無ければ文字列のまま）。
 */
export function parseChoicesText(text: any): (string | {
    value: string;
    text: string;
})[];
/** choices 配列を 1行1選択肢のテキストへ戻す（parseChoicesText の逆） */
export function stringifyChoices(choices: any): string;
/** empty / notempty は右オペランドを取らない */
export function opTakesValue(op: any): boolean;
/** 値リテラルを式表現へ整形する（数値/真偽はそのまま・文字列は引用符） */
export function formatValue(value: any): string;
/**
 * GUI の条件モデルから visibleIf 式文字列を組み立てる。
 * @param {{ combinator: '&&'|'||', clauses: Array<{field, op, value}> }} model
 * @returns {string} 空条件なら ''
 */
export function buildVisibleIf(model: {
    combinator: "&&" | "||";
    clauses: Array<{
        field: any;
        op: any;
        value: any;
    }>;
}): string;
/**
 * visibleIf 式文字列を GUI の条件モデルへ解析する。
 * 単純な「field 演算子 値」の && / || 連結だけを clause 化できる。
 * それ以外（! や && と || の混在、ネスト等）は complex 扱いで raw 編集にフォールバックする。
 * @returns {{ combinator, clauses } | { complex:true, raw:string, error?:string }}
 */
export function parseVisibleIf(expr: any): {
    combinator: any;
    clauses: any;
} | {
    complex: true;
    raw: string;
    error?: string;
};
/**
 * 式中の識別子参照 oldName を newName に置き換える（文字列リテラル内は対象外）。
 * 構文エラーの式はそのまま返す（安全側）。
 */
export function renameRefsInExpr(expr: any, oldName: any, newName: any): string;
/** 条件エディタで扱う演算子 */
export const CONDITION_OPS: string[];
