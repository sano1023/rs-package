/**
 * 1ページ分の DOM を生成する。
 * @param {object} page renderReport() の pages[n]
 * @param {Document} [doc=document]
 * @returns {HTMLElement} .rsrp-page
 */
export function renderPage(page: object, doc?: Document): HTMLElement;
/**
 * プリミティブ1つを DOM 要素にする。
 * @param {object} item
 * @param {Document} doc
 * @param {object} page
 * @returns {HTMLElement|SVGElement|null}
 */
export function renderItem(item: object, doc: Document, page: object): HTMLElement | SVGElement | null;
/**
 * ページ DOM を新しい document（印刷用 iframe など）へ複製できる自己完結 HTML にする。
 * @param {object[]} pages renderReport() の pages
 * @param {{ title?: string, css?: string }} [options]
 * @returns {string} HTML 文字列
 */
export function pagesToHTML(pages: object[], options?: {
    title?: string;
    css?: string;
}): string;
/** 最低限の HTML エスケープ（title 用） */
export function escapeHTML(text: any): string;
/**
 * プレビュー用のズーム計算。コンテナ幅に用紙を収める倍率を求める。
 * @param {number} containerPx コンテナの幅（px）
 * @param {number} paperMm 用紙の幅（mm）
 * @param {number} [padding=24] 余白（px）
 * @returns {number} scale
 */
export function fitScale(containerPx: number, paperMm: number, padding?: number): number;
/** ライブラリ全体の CSS クラス接頭辞 */
export const CSS_PREFIX: "rsrp";
