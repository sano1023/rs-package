/**
 * インタラクティブエディタを生成する（トリミング・回転・文字・スタンプ・画像レイヤー、
 * すべてリアルタイム反映）。
 * @param {string|HTMLElement} target コンテナ要素
 * @param {object} options { stamps: [{url, category, name?}], fonts: [{name, url?}], height, maxSourceDimension }
 * @returns {ImageEditor}
 */
export function createRSImageEditor(target: string | HTMLElement, options?: object): ImageEditor;
/** dataURL/Blob へのショートカット */
export function toBlob(src: any, ops?: {}): Promise<any>;
export function toDataURL(src: any, ops?: {}): Promise<any>;
import { ImageEditor } from './editor.js';
import { processImage } from './pipeline.js';
import { loadImage } from './loader.js';
import { encodeCanvas } from './encoder.js';
import { canvasToBlob } from './encoder.js';
import * as geometry from './geometry.js';
export { processImage, loadImage, encodeCanvas, canvasToBlob, geometry, ImageEditor };
