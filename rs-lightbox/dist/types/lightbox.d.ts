export namespace DEFAULTS {
    let selector: string;
    let startIndex: number;
    let loop: boolean;
    let preload: number;
    let closeOnBackdrop: boolean;
    let closeOnEsc: boolean;
    let swipeToClose: boolean;
    let wheelZoom: boolean;
    let doubleTapZoom: number;
    let maxScale: number;
    let initialFocus: string;
    let restoreFocus: boolean;
    let lockScroll: boolean;
    let animation: string;
    let caption: boolean;
    let counter: boolean;
    namespace labels {
        let dialog: string;
        let close: string;
        let prev: string;
        let next: string;
        let zoomIn: string;
        let zoomOut: string;
        let loading: string;
        let error: string;
        let retry: string;
    }
}
export class Lightbox {
    /**
     * @param {string|HTMLElement|Array} targetOrItems コンテナ or items 配列
     * @param {object} [options]
     */
    constructor(targetOrItems: string | HTMLElement | any[], options?: object);
    emitter: {
        on: (event: string, cb: Function) => (() => void);
        emit: (event: string, ...args: any[]) => void;
        clear: () => void;
    };
    options: any;
    state: string;
    _gen: number;
    index: number;
    items: any[];
    zoom: {
        scale: number;
        x: number;
        y: number;
    };
    fit: {
        width: number;
        height: number;
    };
    _natural: {
        width: number;
        height: number;
    };
    _vp: {
        width: number;
        height: number;
    };
    _animating: boolean;
    _zoomRaf: number;
    _frameRaf: number;
    _pendingFrame: (() => void) | null;
    mode: string;
    container: Element | undefined;
    _onDelegatedClick: ((e: any) => void) | undefined;
    _handleDelegatedClick(e: any): void;
    _recollect(): void;
    _collectedEls: any[] | undefined;
    /**
     * ライトボックスを開く。
     * @param {number|HTMLElement} [indexOrElement=startIndex]
     * @returns {Promise<void>}
     */
    open(indexOrElement?: number | HTMLElement): Promise<void>;
    _openPromise: Promise<void> | undefined;
    /** open の本体。opening 中の再 open はこの Promise を共有する。 */
    _runOpen(index: any, reusing: any): Promise<void>;
    _origin: any;
    _scrollLocked: boolean | undefined;
    /**
     * ライトボックスを閉じる。
     * @returns {Promise<void>}
     */
    close(): Promise<void>;
    /** 次の画像へ（loop 設定と端で自動判定）。 */
    next(): void;
    /** 前の画像へ。 */
    prev(): void;
    /**
     * 指定 index へ移動する。開いていなければ index の設定のみ。
     * @param {number} index
     */
    goTo(index: number): void;
    /** dir(+1/-1) 方向へスライド遷移する。 */
    _slideTo(dir: any): void;
    /** dir 方向の隣接 index（loop 考慮、無ければ null）。 */
    _neighbor(dir: any): any;
    /**
     * index を確定し、3 スロットへ画像を割り当て、ズームと表示をリセットする。
     * @param {number} i
     * @param {{emitChange?: boolean}} [opts]
     */
    _setIndex(i: number, { emitChange }?: {
        emitChange?: boolean;
    }): void;
    /**
     * スロット（0=prev,1=curr,2=next）へ item を読み込む。token で古い load を無効化する。
     * @param {0|1|2} slot
     * @param {import('./items.js').Item|null} item
     */
    _loadSlot(slot: 0 | 1 | 2, item: import("./items.js").Item | null): void;
    /** 中央画像のロード完了時: fit を計算し transform を初期化。 */
    _onCenterLoaded(img: any): void;
    _recomputeFit(): void;
    /** 現在中央スロットの再試行。 */
    retry(): void;
    /** ステージ寸法を測り直してキャッシュする（ジェスチャー中の layout 読みを避けるため）。 */
    _refreshViewport(): {
        width: number;
        height: number;
    };
    /**
     * 指定 scale へズームする。
     * @param {number} scale
     * @param {{x?: number, y?: number, animate?: boolean}} [opts] x/y はステージ中心基準の焦点(px)
     */
    zoomTo(scale: number, { x, y, animate }?: {
        x?: number;
        y?: number;
        animate?: boolean;
    }): void;
    zoomIn(): void;
    zoomOut(): void;
    resetZoom(): void;
    _zoomBy(factor: any, point: any, animate: any): void;
    /** transform を反映し、ボタン状態更新と zoom イベント（rAF 単位）を出す。 */
    _applyZoom(animate: any): void;
    _updateZoomButtons(): void;
    /**
     * オプションを差分更新する。
     * @param {object} partial
     */
    update(partial?: object): void;
    /**
     * items を差し替える（配列モード）。open 中は index を安全に補正する。
     * @param {Array} items
     */
    setItems(items: any[]): void;
    getIndex(): number;
    getItem(): any;
    isOpen(): boolean;
    /**
     * イベントを購読する。unsubscribe 関数を返す。
     * @param {string} event
     * @param {Function} cb
     * @returns {() => void}
     */
    on(event: string, cb: Function): () => void;
    /** すべてを片付ける。DOM・リスナー・rAF・スクロールロックを完全に解除する。 */
    destroy(): void;
    renderer: Renderer | null | undefined;
    _buildOverlay(): void;
    doc: Document | undefined;
    focus: FocusManager | undefined;
    _applyLabels(): void;
    _bindGlobal(): void;
    _ac: AbortController | null | undefined;
    gestures: Gestures | null | undefined;
    _ro: ResizeObserver | null | undefined;
    _teardownOpen(): void;
    /**
     * ジェスチャー反映を 1 フレームにまとめる。pointermove ごとの DOM 書き込みを避け、
     * 常に最新の反映だけを次フレームで実行する。
     * @param {() => void} fn
     */
    _queueFrame(fn: () => void): void;
    /** 保留中のジェスチャー反映を取り消す（操作終了時に最終確定を直接行うため）。 */
    _cancelFrame(): void;
    _onKeyDown(e: any): void;
    _onWheel(e: any): void;
    _eventPoint(e: any): {
        x: number;
        y: number;
    };
    _onDoubleTap(pt: any): void;
    _onSwipeMove(dx: any): void;
    _onSwipeEnd(dx: any, vx: any): void;
    _onCloseMove(dy: any): void;
    _onCloseEnd(dy: any, vy: any): void;
    _onPanMove(ddx: any, ddy: any): void;
    _onPanEnd(): void;
    _onPinchStart(center: any): void;
    _pinchBase: {
        scale: number;
        x: number;
        y: number;
    } | undefined;
    _pinchStartCenter: any;
    _onPinch(ratio: any, center: any): void;
    _onResize(): void;
    _effectiveAnimation(): any;
    /** rslb-open クラスの付け外し。transitionend か fallback で解決。 */
    _toggleOpenClass(open: any, anim: any): Promise<any>;
    /** el の transitionend か fallback timeout の早い方で解決する。 */
    _afterTransition(el: any, ms: any): Promise<any>;
    _raf(cb: any): number;
    _resolveIndex(indexOrElement: any): number;
}
import { Renderer } from './renderer.js';
import { FocusManager } from './focus.js';
import { Gestures } from './gestures.js';
