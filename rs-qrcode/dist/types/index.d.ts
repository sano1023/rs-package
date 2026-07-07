/**
 * QRコードを生成する。
 * @param {string} data
 * @param {object} options
 *   - ecLevel: 'L'|'M'|'Q'|'H'（既定 M。ロゴ入りは 'H' 推奨）
 *   - margin: 余白（モジュール単位・既定4）
 *   - dark / light: 色（light は 'transparent' 可）
 *   - size: 出力ピクセルサイズの目安 / scale: モジュール1つのピクセル数
 *   - logo: 中央ロゴ（URL / dataURL / HTMLImageElement）・logoScale（既定0.2）
 *   - label: コード下のテキスト
 */
export function createRSQR(data: string, options?: object): {
    toSVG(opts2?: {}): string;
    toCanvas(opts2?: {}): Promise<HTMLCanvasElement>;
    toPNG(opts2?: {}): Promise<any>;
    toDataURL(opts?: {}): Promise<any>;
    matrix: boolean[][];
    size: any;
    version: any;
    ecLevel: any;
    mask: any;
};
/**
 * バーコードを生成する。
 * @param {string} data
 * @param {object} options { type: 'code128'|'ean13', barHeight, quiet, dark, light, label, showText, scale }
 */
export function createRSBarcode(data: string, options?: object): {
    toSVG(opts?: {}): string;
    toCanvas(opts?: {}): HTMLCanvasElement;
    toPNG(opts?: {}): Promise<any>;
    toDataURL(opts?: {}): Promise<any>;
    modules: (0 | 1)[];
    text: any;
    type: any;
};
/**
 * 連番データを生成する。
 * makeSequence({ prefix: 'RS-', start: 1, count: 50, digits: 4, suffix: '' })
 *   → ['RS-0001', 'RS-0002', ...]
 */
export function makeSequence({ prefix, suffix, start, count, digits }?: {
    prefix?: string | undefined;
    suffix?: string | undefined;
    start?: number | undefined;
    count?: number | undefined;
    digits?: number | undefined;
}): string[];
/**
 * CSVテキストから一括生成する（1列目=データ・2列目=ラベル省略可）。
 * batchFromCSV('A001,商品A\nA002,商品B', { type: 'qr', ecLevel: 'M' })
 *   → [{ data, label, item }]  item は createRSQR / createRSBarcode の戻り値
 */
export function batchFromCSV(csvText: any, options?: {}): {
    data: string;
    label: string;
    item: {
        toSVG(opts2?: {}): string;
        toCanvas(opts2?: {}): Promise<HTMLCanvasElement>;
        toPNG(opts2?: {}): Promise<any>;
        toDataURL(opts?: {}): Promise<any>;
        matrix: boolean[][];
        size: any;
        version: any;
        ecLevel: any;
        mask: any;
    } | {
        toSVG(opts?: {}): string;
        toCanvas(opts?: {}): HTMLCanvasElement;
        toPNG(opts?: {}): Promise<any>;
        toDataURL(opts?: {}): Promise<any>;
        modules: (0 | 1)[];
        text: any;
        type: any;
    };
}[];
/** 簡易CSVパーサ（引用符・改行対応） */
export function parseCSV(text: any): string[][];
import { encodeQR } from './qr.js';
import { encodeBarcode } from './barcode.js';
import { MAX_VERSION } from './qr.js';
import { code128Values } from './barcode.js';
import { code128Patterns } from './barcode.js';
import { eanCheckDigit } from './barcode.js';
import { matrixToSVG } from './render.js';
import { matrixToCanvas } from './render.js';
import { barsToSVG } from './render.js';
import { barsToCanvas } from './render.js';
import { canvasToPNG } from './render.js';
export { encodeQR, encodeBarcode, MAX_VERSION, code128Values, code128Patterns, eanCheckDigit, matrixToSVG, matrixToCanvas, barsToSVG, barsToCanvas, canvasToPNG };
