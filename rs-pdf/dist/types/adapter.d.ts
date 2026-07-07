/**
 * rs-pdf レンダラアダプタ契約（検証と日本語エラーメッセージ）
 *
 * アダプタ = PDFの解釈・ラスタライズだけを担う注入オブジェクト:
 * {
 *     name: 'pdfjs',
 *     async open(src) {              // src: URL | ArrayBuffer | Uint8Array | File
 *         return {
 *             numPages,              // 総ページ数
 *             async getPage(n) {     // n: 1始まり
 *                 return {
 *                     size,                        // { width, height } PDFポイント（回転0度時）
 *                     async render(canvas, scale), // canvas にラスタライズ（scale=1 で 72dpi 相当）
 *                     async getTextContent(),      // [{ str, x, y, w, h }] PDFポイント・左上原点の文字矩形
 *                     async getFormFields(),       // [{ name, type, rect, value, options? }]（v0.3まで空配列可）
 *                 };
 *             },
 *             destroy(),             // リソース解放
 *         };
 *     },
 * }
 *
 * コアは永久にこの契約だけに依存する（pdf.js を import しない）。
 */
/** アダプタ未注入時に表示する明確なエラーメッセージ */
export function noRendererMessage(): string;
/**
 * アダプタが契約を満たすか検証する。
 * @returns {{ ok: boolean, errors: string[] }} errors は日本語の指摘メッセージ
 */
export function validateAdapter(adapter: any): {
    ok: boolean;
    errors: string[];
};
/** open() が返したドキュメントが契約を満たすか検証する */
export function validateDocument(doc: any): {
    ok: boolean;
    errors: string[];
};
/** getPage() が返したページが契約を満たすか検証する */
export function validatePage(page: any): {
    ok: boolean;
    errors: string[];
};
