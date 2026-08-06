/** dataURL(base64) → Uint8Array */
export function dataURLToBytes(dataURL: any): Uint8Array<ArrayBuffer>;
/**
 * 画像 PDF のバイト列を組み立てる（純関数）。
 * オブジェクト構成: 1=Catalog, 2=Pages, 以降ページごとに [Page, Image, Contents]。
 *
 * @param {Array<{jpeg: Uint8Array, width: number, height: number, pxW: number, pxH: number}>} pages
 *   width/height は PDF ポイントのページ寸法、pxW/pxH は JPEG のピクセル寸法
 * @param {{ title?: string }} [options] Info 辞書（タイトルは ASCII のみ。非 ASCII は落とす）
 * @returns {Uint8Array}
 */
export function buildImagePDF(pages: Array<{
    jpeg: Uint8Array;
    width: number;
    height: number;
    pxW: number;
    pxH: number;
}>, options?: {
    title?: string;
}): Uint8Array;
/**
 * 組版済みページ（renderReport の pages）を PDF バイト列にする。
 * 各ページを canvas に描画 → JPEG 化 → buildImagePDF。ブラウザ環境専用。
 *
 * @param {object[]} pages
 * @param {{ dpi?: number, quality?: number, title?: string, onProgress?: (done: number, total: number) => void }} [options]
 *   dpi 既定 200（画面よりくっきり・サイズ控えめ）。印刷品質は 300
 * @returns {Promise<Uint8Array>}
 */
export function reportToPDF(pages: object[], options?: {
    dpi?: number;
    quality?: number;
    title?: string;
    onProgress?: (done: number, total: number) => void;
}): Promise<Uint8Array>;
/**
 * Blob をファイルとしてダウンロードさせる小ヘルパー。
 * @param {Blob} blob
 * @param {string} filename
 */
export function downloadBlob(blob: Blob, filename: string): void;
