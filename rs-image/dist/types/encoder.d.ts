/** canvas を Blob 化（Promise 化 + フォールバック） */
export function canvasToBlob(canvas: any, mime: any, quality: any): Promise<any>;
/**
 * canvas をエンコードして結果オブジェクトを返す。
 * @param {HTMLCanvasElement|OffscreenCanvas} canvas
 * @param {object} opts { format, quality, targetBytes, output }
 * @returns {{ blob?, dataURL?, canvas?, width, height, bytes, format }}
 */
export function encodeCanvas(canvas: HTMLCanvasElement | OffscreenCanvas, opts?: object): {
    blob?: any;
    dataURL?: any;
    canvas?: any;
    width: any;
    height: any;
    bytes: any;
    format: any;
};
