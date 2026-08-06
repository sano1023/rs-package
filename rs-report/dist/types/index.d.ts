/**
 * 帳票プレビューを生成する。DOM アクセスは生成時まで遅延され、SSR で import しても落ちない。
 * @param {string|HTMLElement} target コンテナ（セレクタ文字列 or 要素）
 * @param {{ template: object, data?: { rows?: object[], params?: object } } & object} config
 * @returns {Report}
 */
export function createRSReport(target: string | HTMLElement, config: {
    template: object;
    data?: {
        rows?: object[];
        params?: object;
    };
} & object): Report;
export const VERSION: "0.2.0";
import { Report } from './report.js';
import { DEFAULTS } from './report.js';
export { Report, DEFAULTS };
export { renderReport, normalizeTemplate, BAND_NAMES } from "./layout.js";
export { defineElementType, listElementTypes, mergeStyle, normalizeBorder } from "./elements.js";
export { defineFormat, formatValue, formatNumber, formatDate, formatWareki, toDaiji, toKansuji, toZenkaku, toHankaku } from "./format.js";
export { evaluateExpression, renderTemplate, BUILTINS } from "./expr.js";
export { aggregateRows, groupRows } from "./aggregate.js";
export { renderPage, pagesToHTML, fitScale } from "./render.js";
export { resolvePaper, resolveMargin, PAPER_SIZES, mmToPx, pxToMm } from "./units.js";
export { invoiceTemplate, estimateTemplate, deliveryTemplate, receiptTemplate, createDocumentTemplate, prepareDocumentRows } from "./templates.js";
export { createLabelTemplate, LABEL_PRESETS, defaultAddressElements } from "./labels.js";
export { pageToCanvas, pageToPNG, wrapText } from "./canvas.js";
export { reportToPDF, buildImagePDF, downloadBlob } from "./pdf.js";
export { parseCSV, rowsFromCSV, rowsFromRSGrid, rowsFromRSSheet, rowsFromRSPivot } from "./datasources.js";
export { registerQRElements, registerSealElement, registerChartElement } from "./adapters.js";
