export class Viewer {
    /**
     * @param {string|HTMLElement} target セレクタ or 要素
     * @param {object} options { src, renderer, zoom, rotation, view }
     */
    constructor(target: string | HTMLElement, options?: object);
    el: Element;
    options: object;
    renderer: any;
    doc: any;
    numPages: number;
    pageHandles: any[];
    sizes: any[];
    state: any[];
    layout: {
        pages: Array<{
            top: any;
            left: any;
            width: any;
            height: any;
        }>;
        totalWidth: any;
        totalHeight: any;
        gap: any;
    } | null;
    textCache: Map<any, any>;
    searchState: {
        query: any;
        matches: {
            page: any;
            start: any;
            end: any;
            rects: any;
        }[];
        count: number;
        index: number;
    } | null;
    zoomMode: any;
    zoom: number;
    rotation: number;
    currentPage: number;
    gen: number;
    destroyed: boolean;
    pool: CanvasPool;
    listeners: Map<any, any>;
    _openToken: number;
    _searchGen: number;
    _zoomTimer: number;
    _resizeTimer: number;
    _scrollRaf: number;
    _pinch: {
        d: number;
        zoom: number;
    } | null;
    thumbs: any[];
    ui: {
        toolbar: HTMLDivElement;
        searchbar: HTMLDivElement;
        body: HTMLDivElement;
        sidebar: HTMLDivElement;
        scroller: HTMLDivElement;
        area: HTMLDivElement;
        loading: HTMLDivElement;
        error: HTMLDivElement;
        btnSidebar: HTMLButtonElement;
        btnPrev: HTMLButtonElement;
        btnNext: HTMLButtonElement;
        pageInput: HTMLInputElement;
        pageCount: HTMLSpanElement;
        btnZoomOut: HTMLButtonElement;
        btnZoomIn: HTMLButtonElement;
        zoomSelect: HTMLSelectElement;
        customOpt: HTMLOptionElement;
        btnRotate: HTMLButtonElement;
        btnSearch: HTMLButtonElement;
        btnPrint: HTMLButtonElement;
        searchInput: HTMLInputElement;
        searchCount: HTMLSpanElement;
        btnSearchPrev: HTMLButtonElement;
        btnSearchNext: HTMLButtonElement;
    };
    scroller: HTMLDivElement;
    area: HTMLDivElement;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    _emit(event: any, payload: any): void;
    /** PDF を開く（src: URL | ArrayBuffer | Uint8Array | File） */
    open(src: any): Promise<void>;
    _srcData: any;
    /** 現在のドキュメントを破棄する（open し直し・destroy 用） */
    _teardownDoc(): void;
    _thumbObserver: IntersectionObserver | null | undefined;
    _showError(message: any): void;
    _bind(): void;
    _onScrollBound: (() => void) | undefined;
    _onKeydownBound: ((e: any) => void) | undefined;
    _onWheelBound: ((e: any) => void) | undefined;
    _onTouchStartBound: ((e: any) => void) | undefined;
    _onTouchMoveBound: ((e: any) => void) | undefined;
    _onTouchEndBound: (() => void) | undefined;
    _resizeObserver: ResizeObserver | undefined;
    _buildPlaceholders(): void;
    _relayout(): void;
    /** プレースホルダ・回転コンテンツ・canvas のCSSサイズを現在のレイアウトに合わせる */
    _syncPageDom(i: any): void;
    /** スクロール位置のアンカー（現在ページ内の相対位置）を捕捉する */
    _captureAnchor(): {
        idx: number;
        frac: number;
    } | null;
    _restoreAnchor(anchor: any): void;
    _renderVisible(): void;
    /** 範囲外ページの canvas をプールへ返し、レイヤーを空にする */
    _releasePage(i: any): void;
    _ensureRendered(i: any): void;
    _renderPage(i: any, gen: any): Promise<void>;
    /** テキストレイヤー（選択・コピー用）を構築する */
    _ensureTextLayer(i: any): void;
    /** ページのテキストアイテム（キャッシュつき） */
    _getText(i: any): any;
    /** ズーム/回転後の再renderを150msデバウンスで予約する */
    _scheduleRerender(): void;
    getCurrentPage(): number;
    getPageCount(): number;
    /** 指定ページ（1始まり）の先頭へスクロールする */
    goToPage(n: any): void;
    _setCurrentPage(n: any): void;
    _updatePageUI(n?: number): void;
    getZoom(): number;
    getZoomMode(): any;
    /** 'fit-width' | 'fit-page' | 数値(1=100%) */
    setZoom(mode: any): void;
    zoomIn(): void;
    zoomOut(): void;
    _resolveFitZoom(mode: any): number;
    _applyZoom(z: any): void;
    _updateZoomUI(z?: number): void;
    getRotation(): number;
    /** 90°単位で相対回転する（全ページ） */
    rotate(delta?: number): void;
    setRotation(deg: any): void;
    /** 全ページ横断のテキスト検索。ヒットをハイライトし最初のヒットへ移動する */
    search(query: any): Promise<{
        count: number;
        matches: {
            page: any;
            start: any;
            end: any;
            rects: any;
        }[];
    }>;
    searchNext(): void;
    searchPrev(): void;
    _stepMatch(dir: any): void;
    _gotoMatch(idx: any): void;
    clearSearch(): void;
    _clearSearch(): void;
    /** 描画済みページのハイライト矩形を作り直す */
    _refreshHighlights(): void;
    _applyHighlights(i: any): void;
    _updateCurrentHl(): void;
    _updateSearchUI(): void;
    /** 検索バーの表示切替 */
    toggleSearchBar(force: any): void;
    toggleSidebar(force: any): void;
    _buildThumbs(): void;
    /** サムネイルを低解像度で render する（可視分だけ・回転対応） */
    _renderThumb(i: any): Promise<void>;
    /** 回転変更時にサムネイルを無効化して（可視分から）再renderさせる */
    _refreshThumbs(): void;
    /** 全ページをラスタライズしてブラウザ印刷に流す */
    print(): Promise<void>;
    _printing: boolean | undefined;
    _onScroll(): void;
    _onKeydown(e: any): void;
    /** Ctrl+ホイール（トラックパッドのピンチ含む）でズーム */
    _onWheel(e: any): void;
    _onTouchStart(e: any): void;
    _onTouchMove(e: any): void;
    _onResize(): void;
    focus(): void;
    /** canvas・アダプタ・リスナーをすべて解放する */
    destroy(): void;
}
import { CanvasPool } from './virtualizer.js';
