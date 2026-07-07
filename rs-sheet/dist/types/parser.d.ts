/** トークン列 → AST。構文エラーは RSError を throw */
export function parseTokens(tokens: any): any;
/**
 * 数式文字列（'=' 始まり）→ AST。
 * 構文エラーは {type:'err', code} を返さず throw する（呼び出し側でエラーセル化）。
 */
export function parseFormula(formula: any): any;
/**
 * AST → 数式本体の文字列（'=' なし）。挿入/削除・フィル後の raw 再構築に使う。
 * `'=' + serialize(ast)` が再パースで同じ AST になることを保証する。
 */
export function serialize(node: any): any;
