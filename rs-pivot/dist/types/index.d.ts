/**
 * ピボットテーブルを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object} options data / slice / fiscalYear / format / aggregations など
 * @returns {Pivot}
 */
export function createRSPivot(target: string | HTMLElement, options?: object): Pivot;
export { ReportTemplates } from "./report-templates.js";
export { Pivot };
import { Pivot } from './pivot.js';
export { defineAggregation, builtinAggregations, createRegistry } from "./aggregations.js";
export { buildStore, BLANK_LABEL } from "./store.js";
export { aggregate, buildAxes, serializeResult, hydrateResult, nodePath, OTHERS_LABEL } from "./engine.js";
export { SliceModel, normalizeSlice, ZONES } from "./slice.js";
export { buildTableModel, entryPathLabel } from "./table-model.js";
export { toCSV, toTSV, tableToDelimited } from "./export.js";
export { makeFormatter, makePercentFormatter, resolveFormatter } from "./format.js";
export { compileFormula, validateFormula } from "./formula.js";
export { heatmap, dataBar, combineRenderers } from "./cell-format.js";
export { DATE_GROUPS, DATE_GROUP_ALL, DATE_GROUP_LABELS } from "./datetime.js";
export { pivotToChart, sliceToChartData } from "./chart-adapter.js";
export { recordsToGrid, showGridDetailModal } from "./grid-adapter.js";
