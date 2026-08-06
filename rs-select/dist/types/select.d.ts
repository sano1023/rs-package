/**
 * セレクトボックスを生成する。
 * @param {string|HTMLElement} target <select> 要素 or コンテナ
 * @param {object} [options]
 * @returns {Select}
 */
export function createRSSelect(target: string | HTMLElement, options?: object): Select;
export namespace DEFAULTS {
    let items: null;
    let multiple: null;
    let searchable: boolean;
    let placeholder: string;
    let allowCreate: boolean;
    let load: null;
    let debounce: number;
    let virtualThreshold: number;
    let rowHeight: number;
    let maxHeight: number;
    let clearable: boolean;
    let disabled: boolean;
    namespace labels {
        let noResults: string;
        let loading: string;
        function create(text: any): string;
        let clear: string;
        function remove(label: any): string;
    }
}
export class Select {
    /**
     * @param {string|HTMLElement} target <select> 要素 or コンテナ
     * @param {object} [options] {@link DEFAULTS}
     */
    constructor(target: string | HTMLElement, options?: object);
    _doc: Document;
    _options: {
        labels: any;
        items: null;
        multiple: null;
        searchable: boolean;
        placeholder: string;
        allowCreate: boolean;
        load: null;
        debounce: number;
        virtualThreshold: number;
        rowHeight: number;
        maxHeight: number;
        clearable: boolean;
        disabled: boolean;
    };
    _emitter: {
        on: Function;
        emit: Function;
        clear: Function;
    };
    _isSelect: boolean;
    _select: Element | null;
    _multiple: any;
    _items: any;
    _value: any[];
    _open: boolean;
    _query: string;
    _activeIndex: number;
    _filtered: any[];
    _loadTimer: number | null;
    _loading: boolean;
    _destroyed: boolean;
    _id: string;
    /** 現在の値（multiple なら配列） */
    getValue(): any;
    /** 値を設定する */
    setValue(value: any): void;
    /** 候補を差し替える */
    setItems(items: any): void;
    open(): void;
    close(): void;
    _dropdown: HTMLDivElement | null | undefined;
    /** 無効化 / 有効化 */
    setDisabled(disabled: any): void;
    /** イベント購読: change / open / close / search / create */
    on(event: any, cb: any): any;
    destroy(): void;
    /** @private */
    private _normalizeItems;
    /** @private <select> の option / items オプションから候補を読む */
    private _readItems;
    /** @private */
    private _readInitialValue;
    /** @private DOM の骨組み */
    private _mount;
    _root: HTMLDivElement | undefined;
    _control: HTMLDivElement | undefined;
    _hidden: HTMLInputElement | undefined;
    _outsideHandler: ((e: any) => void) | undefined;
    /** @private 選択値の表示（単一 or タグ） */
    private _renderControl;
    /** @private 値のトグル（multiple） */
    private _toggleValue;
    /** @private <select> / hidden への同期 */
    private _syncNative;
    /** @private */
    private _renderDropdown;
    _searchInput: HTMLInputElement | undefined;
    _list: HTMLDivElement | undefined;
    /** @private 非同期候補の debounce 読込 */
    private _debouncedLoad;
    /** @private フィルタして候補リストを描画 */
    private _renderList;
    _virtual: boolean | undefined;
    _creatable: boolean | "" | undefined;
    /** @private 行の描画（仮想リスト対応） */
    private _renderRows;
    /** @private リスト末尾の通知行 */
    private _notice;
    /** @private allowCreate の実行 */
    private _createFromQuery;
    /** @private combobox パターンのキーボード操作 */
    private _onControlKeydown;
    /** @private アクティブ行を可視域へ */
    private _scrollActive;
}
