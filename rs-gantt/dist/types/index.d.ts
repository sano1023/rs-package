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
export { Gantt, defineGanttColumn, builtinColumns, defineGanttOverlay, builtinOverlays, Calendar, createCalendar, holidaysOfYear, listHolidays, holidayName, parseDate, formatDate };
