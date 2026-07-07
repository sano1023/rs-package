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
import { DatePicker } from './picker.js';
import { DateSelect } from './dateselect.js';
import { formatDate } from './dateutil.js';
import { parseDate } from './dateutil.js';
import { JA_LOCALE } from './dateutil.js';
export { DatePicker, DateSelect, formatDate, parseDate, JA_LOCALE };
