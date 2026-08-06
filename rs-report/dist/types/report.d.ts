export namespace DEFAULTS {
    let zoom: string;
    let toolbar: boolean;
    let continuous: boolean;
    let printable: boolean;
    let theme: null;
    namespace labels {
        let prev: string;
        let next: string;
        let zoomIn: string;
        let zoomOut: string;
        let zoomFit: string;
        let zoomActual: string;
        let print: string;
        function pageOf(page: any, pages: any): string;
    }
}
export class Report {
    /**
     * @param {string|HTMLElement} target コンテナ
     * @param {{ template: object, data?: object, options?: object } & object} config
     */
    constructor(target: string | HTMLElement, config?: {
        template: object;
        data?: object;
        options?: object;
    } & object);
    /** @private */ private _target;
    /** @private */ private _template;
    /** @private */ private _data;
    /** @private */ private _options;
    /** @private */ private _emitter;
    /** @private */ private _page;
    /** @private */ private _zoom;
    /** @private */ private _zoomMode;
    /** @private */ private _destroyed;
    /** @private */ private _resizeObserver;
    /** @private */ private _printFrame;
    /** 組版結果（DOM 非依存）。UI なしでも参照できるよう先に計算する */
    result: {
        pages: object[];
        pageCount: number;
        paper: object;
        margin: object;
        content: object;
        template: object;
    };
    /** ページ数 */
    get pageCount(): number;
    /** 現在ページ（0 始まり） */
    get currentPage(): number;
    /** 現在のズーム倍率 */
    get zoom(): number;
    /**
     * イベント購読。'page' | 'zoom' | 'render' | 'error'
     * @returns {() => void} 解除関数
     */
    on(event: any, cb: any): () => void;
    /** データを差し替えて再組版・再描画する */
    setData(data: any): void;
    /** 帳票定義を差し替えて再組版・再描画する */
    setTemplate(template: any): void;
    /** 指定ページへ移動する（0 始まり） */
    goTo(page: any): void;
    next(): void;
    prev(): void;
    /** ズームを設定する（数値 | 'fit-width' | 'actual'） */
    setZoom(zoom: any): void;
    zoomIn(): void;
    zoomOut(): void;
    /** 自己完結 HTML（保存・別ウィンドウ表示・サーバ送信用） */
    toHTML(): string;
    /**
     * 指定ページを canvas に描画する（サムネイル・画像出力用）。
     * @param {number} [pageIndex=現在ページ]
     * @param {{ dpi?: number }} [options] 既定 150dpi。印刷相当は 300
     * @returns {Promise<HTMLCanvasElement>}
     */
    toCanvas(pageIndex?: number, options?: {
        dpi?: number;
    }): Promise<HTMLCanvasElement>;
    /**
     * 指定ページを PNG dataURL にする。
     * @param {number} [pageIndex=現在ページ]
     * @param {{ dpi?: number }} [options]
     * @returns {Promise<string>}
     */
    toPNG(pageIndex?: number, options?: {
        dpi?: number;
    }): Promise<string>;
    /**
     * 全ページを PDF にする（画像 PDF・依存ゼロの自前ライター）。
     * @param {{ dpi?: number, quality?: number, onProgress?: Function }} [options] 既定 200dpi
     * @returns {Promise<Blob>} application/pdf
     */
    toPDF(options?: {
        dpi?: number;
        quality?: number;
        onProgress?: Function;
    }): Promise<Blob>;
    /**
     * PDF を生成してダウンロードさせる。
     * @param {string} [filename]
     * @param {object} [options] toPDF と同じ
     */
    downloadPDF(filename?: string, options?: object): Promise<void>;
    /**
     * 印刷する。非表示 iframe に書き込み、読み込み完了後に print() を呼ぶ。
     * @returns {Promise<void>} 印刷ダイアログを開いたら解決（キャンセル検知はブラウザ仕様上できない）
     */
    print(): Promise<void>;
    /** DOM・イベントをすべて破棄する */
    destroy(): void;
    /** @private */
    private _mount;
    _container: Element | undefined;
    _root: HTMLDivElement | undefined;
    _viewport: HTMLDivElement | undefined;
    _stage: HTMLDivElement | undefined;
    /** @private ツールバー */
    private _buildToolbar;
    _btnPrev: any;
    _pageLabel: any;
    _btnNext: any;
    _zoomLabel: any;
    /** @private ページ DOM を作り直す */
    private _renderPages;
    _pageEls: any[] | undefined;
    /** @private 再組版して描画し直す */
    private _reflow;
    /** @private ズーム適用（transform: scale + 幅の確保） */
    private _applyZoom;
    /** @private */
    private _stepZoom;
    /** @private */
    private _updateToolbar;
    /** @private */
    private _onKeydown;
    /** @private 連続表示でスクロール位置からページ番号を追従する */
    private _onScroll;
    /** @private */
    private _scrollToPage;
}
