/**
 * pdf.js をレンダラアダプタ化する。
 * @param {object} pdfjsLib pdfjs-dist のモジュール（getDocument を持つ）
 * @param {object} options getDocument に渡す追加パラメータ
 *   （cMapUrl / cMapPacked / standardFontDataUrl など。CJKフォントのPDFには推奨）
 */
export function pdfjsAdapter(pdfjsLib: object, options?: object): {
    name: string;
    /** src: URL文字列 | ArrayBuffer | Uint8Array | File/Blob */
    open(src: any): Promise<{
        numPages: any;
        getPage(n: any): Promise<any>;
        destroy(): void;
    }>;
};
