/** 名前として有効か（A1のような参照・予約語・空白入りは不可） */
export function isValidName(name: any): boolean;
/**
 * 定義文字列 → ref/range の AST ノード（シート名を明示化）。不正なら null。
 * @param {string} def 'A1:A10' / 'Sheet2!B2:B10' / '$A$1'
 * @param {string} defaultSheetName シート未指定時に補うシート名
 */
export function parseNameDefinition(def: string, defaultSheetName: string): any;
