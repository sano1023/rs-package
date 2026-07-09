/**
 * rs-upload PDF 1ページ目プレビュー（v0.4）— rs-pdf のレンダラアダプタ注入で先頭ページを描画する。
 *
 * REQUIREMENTS §v0.4「PDF1ページ目（rs-pdf アダプタ注入）」。
 * rs-upload コアは rs-pdf を import しない（依存ゼロを維持）。利用者が rs-pdf の
 * pdfjsAdapter(pdfjsLib) などを options.pdfRenderer に注入した時だけ PDF プレビューが有効になり、
 * 未注入なら Widget 側は汎用ファイルアイコン表示にフォールバックする。
 *
 * レンダラアダプタ契約（rs-pdf/src/adapter.js と同一）:
 *   { name, async open(src) => { numPages, async getPage(n) => { size:{width,height}, async render(canvas, scale) }, destroy() } }
 */
/** file が PDF か（宣言 MIME か拡張子で判定） */
export function isPdfFile(file: any): boolean;
/** レンダラアダプタが最低限 open() を持つか */
export function isRenderer(renderer: any): boolean;
/**
 * PDF の指定ページ（既定1ページ目）を rs-pdf レンダラアダプタで canvas に描画し、サムネ画像（Blob）にする。
 * @param {File|Blob} file PDFファイル
 * @param {object} renderer rs-pdf レンダラアダプタ（pdfjsAdapter(pdfjsLib) 等・注入）
 * @param {object} options
 *   - maxSize : 長辺の最大ピクセル数（既定 320）
 *   - page    : ページ番号（1始まり・既定1）
 *   - type    : 出力 MIME（既定 'image/png'）
 *   - quality : jpeg/webp 品質（0–1）
 * @returns {Promise<{ blob: Blob, width: number, height: number, numPages: number }|null>}
 *   レンダラ未注入・描画失敗時は null（＝汎用アイコンにフォールバック）
 */
export function renderPdfFirstPage(file: File | Blob, renderer: object, options?: object): Promise<{
    blob: Blob;
    width: number;
    height: number;
    numPages: number;
} | null>;
