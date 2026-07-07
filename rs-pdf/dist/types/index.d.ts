/**
 * PDFビューアを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object} options
 *   - src: URL | ArrayBuffer | Uint8Array | File（省略時は open(src) で後から開ける）
 *   - renderer: レンダラアダプタ（pdfjsAdapter(pdfjsLib) など・必須）
 *   - zoom: 'fit-width'（既定）| 'fit-page' | 数値(1=100%)
 *   - rotation: 初期回転（90°単位）
 * @returns {Viewer}
 */
export function createRSPDF(target: string | HTMLElement, options?: object): Viewer;
export { FormManager } from "./forms.js";
import { Viewer } from './viewer.js';
import { pdfjsAdapter } from './adapters/pdfjs.js';
import { AnnotationManager } from './annotations.js';
import { defineAnnotationType } from './types/annots.js';
import { builtinAnnotationTypes } from './types/annots.js';
import { buildImagePDF } from './pdfwriter.js';
import { validateAdapter } from './adapter.js';
import { validateDocument } from './adapter.js';
import { validatePage } from './adapter.js';
import { noRendererMessage } from './adapter.js';
export { Viewer, pdfjsAdapter, AnnotationManager, defineAnnotationType, builtinAnnotationTypes, buildImagePDF, validateAdapter, validateDocument, validatePage, noRendererMessage };
export { exportXFDF, importXFDF } from "./xfdf.js";
