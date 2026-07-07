/**
 * ピボットテーブルを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object} options data / slice / fiscalYear / format / aggregations など
 * @returns {Pivot}
 */
export function createRSPivot(target: string | HTMLElement, options?: object): Pivot;
export { Pivot };
import { Pivot } from './pivot.js';
export { defineAggregation, builtinAggregations, createRegistry } from "./aggregations.js";
export { buildStore, BLANK_LABEL } from "./store.js";
export { aggregate, nodePath } from "./engine.js";
export { SliceModel, normalizeSlice, ZONES } from "./slice.js";
export { buildTableModel, entryPathLabel } from "./table-model.js";
export { toCSV, toTSV, tableToDelimited } from "./export.js";
export { makeFormatter, resolveFormatter } from "./format.js";
