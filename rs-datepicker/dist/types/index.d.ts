/**
 * 日付ピッカーを生成する。
 * @param {string|HTMLElement} target input要素（ポップアップ）またはコンテナ（inline: true）
 * @param {object} options mode / months / showTime / format / markers / rangeColors など
 * @returns {DatePicker}
 */
export function createRSDatePicker(target: string | HTMLElement, options?: object): DatePicker;
/**
 * 分割日付フィールドを生成する。
 * 年=セレクト、月・日=モーダル（年→月→日と連鎖して開く）。
 * 確定値は hidden input（name 指定）に yyyy-mm-dd 形式で入る。
 * @param {string|HTMLElement} target コンテナ要素
 * @param {object} options { name, value, format, labels, yearRange, order, chain, onChange }
 * @returns {DateSelect}
 */
export function createRSDateSelect(target: string | HTMLElement, options?: object): DateSelect;
/**
 * スケジュール調整ピッカーを生成する（インライン常時表示）。
 * カレンダーをドラッグで期間選択（1日なら単日選択）し、時間帯を
 * チップ（終日/午前/午後/17時以降… + 開始・終了セレクト）で選ぶ。
 * name 指定で {name}_from/_to と {name}_time_type/_time_from/_time_to の hidden を出力。
 * @param {string|HTMLElement} target コンテナ要素
 * @param {object} options { name, months, timeStep, timePresets, showTime, showSummary, defaultValue, ... }
 * @returns {SchedulePicker}
 */
export function createRSSchedulePicker(target: string | HTMLElement, options?: object): SchedulePicker;
import { DatePicker } from './picker.js';
import { DateSelect } from './dateselect.js';
import { SchedulePicker } from './schedule.js';
import { DEFAULT_TIME_PRESETS } from './schedule.js';
import { formatDate } from './dateutil.js';
import { parseDate } from './dateutil.js';
import { JA_LOCALE } from './dateutil.js';
export { DatePicker, DateSelect, SchedulePicker, DEFAULT_TIME_PRESETS, formatDate, parseDate, JA_LOCALE };
