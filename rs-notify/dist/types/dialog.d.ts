/**
 * 汎用ダイアログ。
 * @param {object} options
 *   { title?, message, input?: 'text'|'textarea'|false, value?, placeholder?,
 *     okLabel?, cancelLabel?, danger?, showCancel?, dismissible? }
 * @returns {Promise<{ ok: boolean, value: string|null }>}
 */
export function dialog(options?: object): Promise<{
    ok: boolean;
    value: string | null;
}>;
/**
 * 確認ダイアログ。
 * @param {string} message
 * @param {object} [options] { title, okLabel, cancelLabel, danger }
 * @returns {Promise<boolean>}
 */
export function confirm(message: string, options?: object): Promise<boolean>;
/**
 * 通知ダイアログ（OK のみ）。
 * @param {string} message
 * @param {object} [options]
 * @returns {Promise<void>}
 */
export function alert(message: string, options?: object): Promise<void>;
/**
 * 入力ダイアログ。
 * @param {string} message
 * @param {object} [options] { value, placeholder, title, input: 'text'|'textarea' }
 * @returns {Promise<string|null>} キャンセルなら null
 */
export function prompt(message: string, options?: object): Promise<string | null>;
