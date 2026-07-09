/**
 * ガントチャートを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object} options tasks / links / calendar / zoom / columns / autoSchedule など（README 参照）
 * @returns {Gantt}
 */
export function createRSGantt(target: string | HTMLElement, options?: object): Gantt;
import { Gantt } from './gantt.js';
import { defineGanttColumn } from './columns.js';
import { builtinColumns } from './columns.js';
import { defineGanttOverlay } from './overlays.js';
import { builtinOverlays } from './overlays.js';
import { Calendar } from './calendar.js';
import { createCalendar } from './calendar.js';
import { holidaysOfYear } from './holidays-jp.js';
import { listHolidays } from './holidays-jp.js';
import { holidayName } from './holidays-jp.js';
import { parseDate } from './date-utils.js';
import { formatDate } from './date-utils.js';
import { parseDateTime } from './date-utils.js';
import { formatDateTime } from './date-utils.js';
import { formatTime } from './date-utils.js';
import { packLanes } from './lanes.js';
import { layoutScheduler } from './lanes.js';
import { overlaps } from './lanes.js';
import { SchedulerScale } from './scheduler-view.js';
import { rowHeightForLanes } from './scheduler-view.js';
import { normalizeResources } from './resources.js';
import { normalizeAssignees } from './resources.js';
import { computeHistogram } from './resources.js';
import { captureBaseline } from './baseline.js';
import { endDelta } from './baseline.js';
import { baselineVariance } from './baseline.js';
import { parseTSV } from './io.js';
import { tasksToMatrix } from './io.js';
import { toCSV } from './io.js';
import { renderToCanvas } from './export-png.js';
import { computeVisibleRange } from './virtual-scroll.js';
export { Gantt, defineGanttColumn, builtinColumns, defineGanttOverlay, builtinOverlays, Calendar, createCalendar, holidaysOfYear, listHolidays, holidayName, parseDate, formatDate, parseDateTime, formatDateTime, formatTime, packLanes, layoutScheduler, overlaps, SchedulerScale, rowHeightForLanes, normalizeResources, normalizeAssignees, computeHistogram, captureBaseline, endDelta, baselineVariance, parseTSV, tasksToMatrix, toCSV, renderToCanvas, computeVisibleRange };
