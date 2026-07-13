/**
 * rs-lightbox 入力の正規化
 *
 * DOM 収集（宣言的利用）と items 配列（命令的利用）の両方を、同じ内部 Item 形式へ揃える。
 *
 * @typedef {object} Item
 * @property {string} src        表示する大画像の URL
 * @property {string} [thumb]    サムネイル URL（拡大アニメの起点など）
 * @property {string} [alt]      代替テキスト。caption とは別物
 * @property {string} [caption]  キャプション（テキストとして扱う。HTML 解釈しない）
 * @property {number} [width]    自然幅（既知なら読み込み前に比率を確保）
 * @property {number} [height]   自然高さ
 * @property {HTMLElement} [el]  DOM モードでの起点要素（クリック元・フォーカス復帰先）
 */
/**
 * 配列で渡された 1 件を Item へ正規化する。
 * @param {any} raw
 * @param {number} index エラーメッセージ用の位置
 * @returns {Item}
 */
export function normalizeItem(raw: any, index?: number): Item;
/**
 * items 配列全体を正規化する。
 * @param {Array<any>} list
 * @returns {Item[]}
 */
export function normalizeItems(list: Array<any>): Item[];
/**
 * DOM の起点要素 1 つから Item を読み取る。
 *
 * 読み取り規則（REQUIREMENTS §2.1）:
 *  - src:    data-src → href の順で採用
 *  - thumb:  子 img.currentSrc → img.src
 *  - alt:    data-alt → 子 img.alt
 *  - caption:data-caption を textContent 相当のテキストとして（HTML 解釈しない）
 *  - w/h:    data-width / data-height
 *
 * @param {HTMLElement} el
 * @returns {Item|null} src が取れなければ null
 */
export function itemFromElement(el: HTMLElement): Item | null;
/**
 * コンテナ内の selector 該当要素を集めて Item[] を作る。open のたびに呼んで一覧を再収集する。
 * @param {HTMLElement} container
 * @param {string} selector
 * @returns {Array<Item>}
 */
export function collectFromDOM(container: HTMLElement, selector: string): Array<Item>;
/**
 * rs-lightbox 入力の正規化
 *
 * DOM 収集（宣言的利用）と items 配列（命令的利用）の両方を、同じ内部 Item 形式へ揃える。
 */
export type Item = {
    /**
     * 表示する大画像の URL
     */
    src: string;
    /**
     * サムネイル URL（拡大アニメの起点など）
     */
    thumb?: string | undefined;
    /**
     * 代替テキスト。caption とは別物
     */
    alt?: string | undefined;
    /**
     * キャプション（テキストとして扱う。HTML 解釈しない）
     */
    caption?: string | undefined;
    /**
     * 自然幅（既知なら読み込み前に比率を確保）
     */
    width?: number | undefined;
    /**
     * 自然高さ
     */
    height?: number | undefined;
    /**
     * DOM モードでの起点要素（クリック元・フォーカス復帰先）
     */
    el?: HTMLElement | undefined;
};
