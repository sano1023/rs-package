/**
 * 注釈を元PDFへ増分更新で追記する。
 * @param {Uint8Array} bytes 元PDF
 * @param {Array<{a: object, apCanvas?: HTMLCanvasElement}>} items 内部モデル注釈（+必要ならAP画像）
 * @param {Array<{width,height}>} sizes ページ寸法（左上原点変換用）
 * @returns {Promise<Uint8Array>} 追記済みPDF
 */
export function appendAnnotationsToPDF(bytes: Uint8Array, items: Array<{
    a: object;
    apCanvas?: HTMLCanvasElement;
}>, sizes: Array<{
    width: any;
    height: any;
}>): Promise<Uint8Array>;
