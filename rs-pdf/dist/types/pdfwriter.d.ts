/** dataURL(base64) → Uint8Array */
export function dataURLToBytes(dataURL: any): Uint8Array<ArrayBuffer>;
/**
 * 画像PDFを生成する。
 * @param {Array<{jpeg: Uint8Array, width: number, height: number, pxW: number, pxH: number}>} pages
 *   width/height はPDFポイントのページ寸法、pxW/pxH はJPEGのピクセル寸法
 * @returns {Uint8Array} PDFバイト列
 */
export function buildImagePDF(pages: Array<{
    jpeg: Uint8Array;
    width: number;
    height: number;
    pxW: number;
    pxH: number;
}>): Uint8Array;
