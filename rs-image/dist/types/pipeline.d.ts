/**
 * 画像を変換して出力する。
 * @param {*} src File/Blob/dataURL/URL/HTMLImageElement/Canvas/ImageBitmap
 * @param {object} ops
 *   - rotate: 0/90/180/270
 *   - crop: { x, y, width, height }（元画像座標・回転適用後）
 *   - resize: { width?, height?, fit? }
 *   - circle: true で円形切り抜き（PNG/WebP必須）
 *   - format: 'png'|'jpeg'|'webp'、quality: 0-1、targetBytes
 *   - output: 'blob'|'dataURL'|'canvas'
 *   - maxSourceDimension: 既定4096、background: 非透過形式の下地色（既定 '#ffffff'）
 * @returns {Promise<{ blob?, dataURL?, canvas?, width, height, bytes, format }>}
 */
export function processImage(src: any, ops?: object): Promise<{
    blob?: any;
    dataURL?: any;
    canvas?: any;
    width: any;
    height: any;
    bytes: any;
    format: any;
}>;
