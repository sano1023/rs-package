/**
 * テキストを最大幅で行に分割する（禁則を含む簡易版）。
 * 日本語は文字単位で折り返し、英単語はできるだけ途中で切らない。
 * @param {string} text
 * @param {number} maxWidth
 * @param {(s: string) => number} measure 文字列の幅を返す関数
 * @returns {string[]}
 */
export function wrapText(text: string, maxWidth: number, measure: (s: string) => number): string[];
/** pt → px（dpi 基準） */
export function ptToCanvasPx(pt: any, dpi: any): number;
/**
 * 1ページを canvas に描画する。
 * @param {object} page renderReport() の pages[n]
 * @param {{ dpi?: number, background?: string, canvas?: HTMLCanvasElement }} [options]
 *   dpi 既定 150（プレビュー用）。印刷相当は 300
 * @returns {Promise<HTMLCanvasElement>} 画像読み込みを待って解決する
 */
export function pageToCanvas(page: object, options?: {
    dpi?: number;
    background?: string;
    canvas?: HTMLCanvasElement;
}): Promise<HTMLCanvasElement>;
/**
 * 1ページを PNG dataURL にする。
 * @param {object} page
 * @param {{ dpi?: number }} [options]
 * @returns {Promise<string>} data:image/png;base64,...
 */
export function pageToPNG(page: object, options?: {
    dpi?: number;
}): Promise<string>;
export { mmToPx };
import { mmToPx } from './units.js';
