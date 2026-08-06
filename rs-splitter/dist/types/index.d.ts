/**
 * 分割ペインを生成する。
 * @param {string|HTMLElement} target
 * @param {object} [options]
 * @returns {Splitter}
 */
export function createRSSplitter(target: string | HTMLElement, options?: object): Splitter;
export namespace DEFAULTS {
    let direction: string;
    let sizes: null;
    let minSizes: number;
    let gutterSize: number;
    let storageKey: null;
    let snapOffset: number;
}
export class Splitter {
    /**
     * @param {string|HTMLElement} target 子要素がペインになるコンテナ
     * @param {object} [options] {@link DEFAULTS}
     */
    constructor(target: string | HTMLElement, options?: object);
    _doc: Document;
    _container: Element;
    _options: {
        direction: string;
        sizes: null;
        minSizes: number;
        gutterSize: number;
        storageKey: null;
        snapOffset: number;
    };
    _horizontal: boolean;
    _listeners: Set<any>;
    _destroyed: boolean;
    _panes: Element[];
    _sizes: number[];
    _collapsed: Map<any, any>;
    _gutters: any[];
    /** 現在のサイズ（%・合計100） */
    getSizes(): number[];
    /** サイズを設定する（合計100に正規化） */
    setSizes(sizes: any): void;
    /** ペインを折りたたむ / 戻す */
    collapse(index: any, collapsed?: boolean): void;
    /** 均等に戻す */
    reset(): void;
    /** リサイズ購読。解除関数を返す */
    onResize(cb: any): () => boolean;
    /** セパレータを除去して元の DOM に戻す */
    destroy(): void;
    /** @private 合計100% へ正規化 */
    private _normalizeSizes;
    /** @private */
    private _loadSizes;
    /** @private */
    private _saveSizes;
    /** @private ペイン間にセパレータを差し込む */
    private _insertGutters;
    /** @private flex-basis を書き込む */
    private _apply;
    /** @private index の変更ぶんを隣へ渡す（collapse 用） */
    private _redistribute;
    /** @private コンテナの内寸（px） */
    private _containerSize;
    /** @private ペインごとの最小サイズ（%） */
    private _minPercent;
    /**
     * @private ドラッグ（gutter i は sizes[i] と sizes[i+1] の境界）
     */
    private _startDrag;
    /** @private キーボードでのリサイズ（←→↑↓ 1%・Shift で 5%・Home/End で寄せ切り） */
    private _onKey;
    /** @private */
    private _notify;
}
export const VERSION: "0.1.0";
