/**
 * 要素タイプを登録する。
 *
 *   defineElementType('barcode', {
 *       toItems(el, api) { return [{ type: 'image', ...api.box, src: makeBarcode(api.value(el)) }]; },
 *   });
 *
 * @param {string} name
 * @param {{ toItems: (el: object, api: object) => object[] }} spec
 */
export function defineElementType(name: string, spec: {
    toItems: (el: object, api: object) => object[];
}): void;
/** 登録済みタイプ名の一覧 */
export function listElementTypes(): any[];
/** タイプを取得（未知タイプは null） */
export function getElementType(name: any): any;
/**
 * 枠線指定を四辺に正規化する。
 *   true / 'all' / 0.3 / { width, color } / { bottom: true } / 'bottom' / ['top','bottom']
 * @param {any} border
 * @returns {null|{top:object|null,right:object|null,bottom:object|null,left:object|null}}
 */
export function normalizeBorder(border: any): null | {
    top: object | null;
    right: object | null;
    bottom: object | null;
    left: object | null;
};
/**
 * スタイルを合成する（後勝ち）。border だけは正規化して保持する。
 * @param {...object} styles
 * @returns {object}
 */
export function mergeStyle(...styles: object[]): object;
/**
 * 要素の生値（書式適用前）を取り出す。
 * - `field` 指定 … 行データのドットパス。`$.` 始まりなら params
 * - `text` が式1つだけ … その評価結果（数値のまま書式へ渡せる）
 * - それ以外の `text` … `{{ }}` 展開済み文字列
 * @param {object} el
 * @param {object} ctx 式の評価コンテキスト
 * @returns {any}
 */
export function resolveRawValue(el: object, ctx: object): any;
/**
 * 要素の表示文字列（書式適用後）。
 * @param {object} el
 * @param {object} ctx
 * @returns {string}
 */
export function resolveText(el: object, ctx: object): string;
export namespace DEFAULT_STYLE {
    let fontFamily: string;
    let fontSize: number;
    let lineHeight: number;
    let color: string;
    let align: string;
    let valign: string;
    let padding: number;
    let wrap: boolean;
    let bold: boolean;
    let italic: boolean;
    let underline: boolean;
    let letterSpacing: number;
    let fill: null;
    let border: null;
    let rotate: number;
}
