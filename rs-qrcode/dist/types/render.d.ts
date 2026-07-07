/**
 * rs-qrcode レンダラ
 *
 * QR行列・バーコード幅列 → SVG文字列 / canvas / PNG（pHYsチャンクでdpi埋め込み）。
 * ロゴ・ラベル・余白・色に対応する。
 */
/** QR行列 → SVG文字列 */
export function matrixToSVG(matrix: any, opts?: {}): string;
/** QR行列 → canvas（ロゴ・ラベル対応） */
export function matrixToCanvas(matrix: any, opts?: {}): Promise<HTMLCanvasElement>;
/** バーコード幅列 → SVG文字列 */
export function barsToSVG(bars: any, opts?: {}): string;
/** バーコード幅列 → canvas */
export function barsToCanvas(bars: any, opts?: {}): HTMLCanvasElement;
/**
 * canvas → PNG Blob。dpi 指定時は pHYs チャンクを挿入して物理解像度を埋め込む
 * （印刷ソフトが 300dpi 等として扱える）。
 */
export function canvasToPNG(canvas: any, { dpi }?: {}): Promise<any>;
