/** ブロック内の [from,to) と交差するテキストを分割しつつ写像する（プラグインからも利用可） */
export function mapInlineRange(block: any, blockStart: any, from: any, to: any, mapText: any): void;
/** 範囲と交差するリーフブロックを列挙（プラグインからも利用可） */
export function intersectingLeaves(doc: any, from: any, to: any): any[];
export function toggleMark(doc: any, from: any, to: any, mark: any): boolean;
/** キャレット位置を含むリンクの範囲 [s,e) を返す（無ければ null） */
export function linkRangeAt(doc: any, pos: any): null;
export function setLink(doc: any, from: any, to: any, href: any): boolean;
export function unsetLink(doc: any, from: any, to: any): boolean;
/** paragraph/heading の相互変換（blockquote 内も再帰。リスト項目は対象外） */
export function setBlockType(doc: any, from: any, to: any, type: any, attrs?: {}): boolean;
export function toggleBlockquote(doc: any, from: any, to: any): boolean;
export function toggleCodeBlock(doc: any, from: any, to: any): boolean;
export function toggleList(doc: any, from: any, to: any, listType: any): boolean;
export function indentListItem(doc: any, pos: any): boolean;
export function outdentListItem(doc: any, pos: any): boolean;
export function insertImage(doc: any, from: any, to: any, attrs: any): boolean;
/** value を渡すと付与、null で除去。キャレットのみの場合は DOM 層（core）で扱う */
export function setValueMark(doc: any, from: any, to: any, type: any, value: any): boolean;
/** patch のキーを設定（値 null で削除）。対象は段落・見出し・テーブルセル */
export function setBlockAttrs(doc: any, from: any, to: any, patch: any): boolean;
export function changeIndent(doc: any, from: any, to: any, delta: any): boolean;
/**
 * ブロック先頭のプレフィックス（"# " 等の # 部分）を取り除き、kind に応じた変換を行う。
 * pos = プレフィックス直後のキャレット位置。
 */
export function markdownShortcut(doc: any, pos: any, prefixLen: any, kind: any): false | {
    selection: {
        anchor: never;
        head: never;
    };
};
/** pos を含むセルの文脈（table / 行・列インデックス）を返す */
export function findTableCell(doc: any, pos: any): any;
export function insertTable(doc: any, pos: any, rows: any, cols: any): {
    selection: {
        anchor: null;
        head: null;
    };
};
export function addTableRow(doc: any, pos: any, after?: boolean): false | {
    selection: {
        anchor: null;
        head: null;
    };
};
export function addTableCol(doc: any, pos: any, after?: boolean): false | {
    selection: {
        anchor: null;
        head: null;
    };
};
export function deleteTableRow(doc: any, pos: any): false | {
    selection: {
        anchor: number;
        head: number;
    };
} | {
    selection: {
        anchor: null;
        head: null;
    };
};
export function deleteTableCol(doc: any, pos: any): false | {
    selection: {
        anchor: number;
        head: number;
    };
} | {
    selection: {
        anchor: null;
        head: null;
    };
};
export function deleteTable(doc: any, pos: any): false | {
    selection: {
        anchor: number;
        head: number;
    };
};
/** query の出現箇所を線形位置で列挙する（ブロック内のみ・大文字小文字は無視可） */
export function findMatches(doc: any, query: any, { caseSensitive }?: {
    caseSensitive?: boolean | undefined;
}): any[];
/** [from,to) を replacement に置き換える（ブロック内のみ）。マークは先頭の書式を引き継ぐ */
export function replaceText(doc: any, from: any, to: any, replacement: any): false | {
    selection: {
        anchor: any;
        head: any;
    };
};
/** 全出現を置換して件数を返す（0件なら false） */
export function replaceAllText(doc: any, query: any, replacement: any, options: any): false | {
    count: number;
};
/** pos にプレーンテキストを挿入する（マークなし） */
export function insertPlainText(doc: any, pos: any, text: any): false | {
    selection: {
        anchor: any;
        head: any;
    };
};
/**
 * 引用内の「空の段落」で Enter したときに、その段落を引用の外へ出す。
 * 引用の途中なら引用を前後に分割する。対象外なら false。
 */
export function exitBlockquote(doc: any, pos: any): false | {
    selection: {
        anchor: any;
        head: any;
    };
};
