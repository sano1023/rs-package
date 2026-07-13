/**
 * ライトボックスを生成する。DOM アクセスは生成時まで遅延され、SSR で import しても落ちない。
 * @param {string|HTMLElement|Array<string|object>} targetOrItems
 *   コンテナ（セレクタ文字列 or 要素）、または items 配列
 * @param {object} [options] {@link DEFAULTS} を参照
 * @returns {Lightbox}
 */
export function createRSLightbox(targetOrItems: string | HTMLElement | Array<string | object>, options?: object): Lightbox;
export const VERSION: "0.1.0";
import { Lightbox } from './lightbox.js';
import { DEFAULTS } from './lightbox.js';
export { Lightbox, DEFAULTS };
