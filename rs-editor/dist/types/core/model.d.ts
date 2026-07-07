export function markType(m: any): any;
export function findMark(marks: any, type: any): any;
export function hasMark(marks: any, type: any): boolean;
export function addMark(marks: any, mark: any): any[];
export function removeMark(marks: any, type: any): any;
export function isListNode(n: any): boolean;
export function isInlineNode(n: any): boolean;
export function isLeafBlock(n: any): boolean;
export function inlineLength(children: any): number;
export function itemInlineChildren(item: any): any;
export function itemListChildren(item: any): any;
/** 隣接する同マークのテキストを結合し、空テキストを除去する */
export function mergetexts(children: any): any[];
/**
 * リーフブロックを線形位置とともに巡回する。
 * fn(node, start, end, parent, index) — end はインライン部の終端位置（境界の手前）。
 * 戻り値はドキュメント全長。
 */
export function eachLeaf(doc: any, fn: any): number;
export function docLength(doc: any): number;
/** ノード（ブロック）が占める線形位置の長さ */
export function nodeLength(n: any): number;
/** 全ノードの親を引ける WeakMap を作る */
export function buildParents(doc: any): WeakMap<object, any>;
/**
 * DOM要素をパースしてドキュメントモデルを返す。
 * テキスト/アトムノードには `_dom`（由来のDOMノード）を残す（位置マップ用。出力時には無視される）。
 */
export function parseDOM(rootEl: any, schema: any): {
    type: string;
    children: any;
};
/**
 * 末尾がテーブルやカスタムブロック（目次等）だとその下にキャレットを置けなくなるため、
 * 空の段落を1つ足して常に「続きを書ける場所」を保証する。
 */
export function padHardTail(doc: any, schema: any): any;
/**
 * parseDOM 直後のモデル（_dom付き）から、DOMノード→線形位置の対応表を作る。
 */
export function buildPosMap(doc: any): {
    texts: any[];
    atoms: any[];
    blocks: any[];
    length: number;
};
/** DOMの (node, offset) を線形位置に変換する */
export function domPointToPos(map: any, root: any, node: any, offset: any): any;
/**
 * 線形位置 → DOMの (node, offset)。
 * serializeHTML で描画した直後の正規化済みDOMを前提とする。
 * schema を渡すと、プラグイン定義のインラインノード（アンカー等）を atom として数える。
 */
export function posToDomPoint(root: any, pos: any, schema: any): {
    node: any;
    offset: number;
} | null;
export function escapeHTML(str: any): string;
export function serializeInline(children: any, schema: any): string;
export function serializeHTML(doc: any, schema: any): any;
/** ブロック配下のテキストを取り出す（リーフブロック間は \n 区切り） */
export function textContentOf(node: any): string;
/** _dom / _extra などの内部メタを落とした純粋なJSONを返す */
export function toJSON(doc: any): {
    type: any;
};
/**
 * 外部から与えられたJSONを検証・正規化してモデルにする。
 * 未知のノード種別は落とさずプレーンテキスト化（または無視）する。
 */
export function fromJSON(json: any, schema: any): any;
/**
 * rs-editor ドキュメントモデル
 *
 * エディタの内容を JSON ドキュメントモデル（doc → block → inline のツリー）で表現し、
 * DOM ⇔ モデル ⇔ HTML文字列 の相互変換と、線形位置（キャレット位置の数値表現）を提供する。
 *
 * 線形位置のルール（DOM側・モデル側で必ず一致させる）:
 *   - テキスト1文字 = 1（ZWSPは数えない）
 *   - アトミックなインラインノード（hard_break / image / カスタム）= 1
 *   - リーフブロック（paragraph / heading / code_block / list_item のインライン部）の終端 = 1
 *   - コンテナ（blockquote / リスト）は位置を消費しない
 */
export const ZWSP: "\u200B";
export const MARK_ORDER: string[];
export const CALLOUT_KINDS: Set<string>;
