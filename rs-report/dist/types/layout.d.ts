/**
 * バンド定義を正規化する。
 * @param {object|null} band
 * @param {string} name
 * @returns {object|null}
 */
export function normalizeBand(band: object | null, name: string): object | null;
/**
 * 帳票定義を正規化する（用紙・余白・印字領域・バンド・グループ）。
 * @param {object} template
 * @returns {object}
 */
export function normalizeTemplate(template: object): object;
/**
 * データ行を、バンドインスタンスの並び（ストリーム）に変換する。
 * ページ割りの前に、グループの開始・終了と明細の順序をすべて確定させる。
 *
 * @param {object} norm 正規化済みテンプレート
 * @param {object[]} rows ソート済みの行
 * @param {Array<any[]>} keys 各行のグループキー
 * @returns {object[]} インスタンス配列
 */
export function buildStream(norm: object, rows: object[], keys: Array<any[]>): object[];
/**
 * ストリームをページへ割り付ける（座標確定・テキスト未解決）。
 * @param {object} norm
 * @param {object[]} stream
 * @returns {Array<object>} ページの配置情報
 */
export function paginate(norm: object, stream: object[]): Array<object>;
/**
 * ページ配置に式・書式を適用して描画プリミティブへ落とす。
 * @param {object} norm
 * @param {object[]} pagesLayout
 * @param {{rows:object[], params:object}} data
 * @returns {object[]} 描画用ページ
 */
export function resolvePages(norm: object, pagesLayout: object[], data: {
    rows: object[];
    params: object;
}): object[];
/**
 * 帳票定義 + データ → ページ配列（公開エントリ・DOM 非依存）。
 *
 *   const { pages, pageCount } = renderReport(template, { rows, params });
 *
 * @param {object} template 帳票定義
 * @param {{rows?: object[], params?: object}|object[]} [data] データ（配列なら rows とみなす）
 * @param {object} [options] template.options への上書き
 * @returns {{ pages: object[], pageCount: number, paper: object, margin: object, content: object, template: object }}
 */
export function renderReport(template: object, data?: {
    rows?: object[];
    params?: object;
} | object[], options?: object): {
    pages: object[];
    pageCount: number;
    paper: object;
    margin: object;
    content: object;
    template: object;
};
/** バンドの並び（`bands` に書く順序に依存しないよう明示する） */
export const BAND_NAMES: string[];
export namespace DEFAULTS {
    let repeatGroupHeader: boolean;
    let orphanRows: number;
    let renderEmpty: boolean;
    let emptyText: null;
    let onError: null;
}
export { normalizeBorder };
import { normalizeBorder } from './elements.js';
