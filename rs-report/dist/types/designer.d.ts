/**
 * 帳票デザイナを生成する。
 * @param {string|HTMLElement} target
 * @param {object} [config]
 * @returns {ReportDesigner}
 */
export function createRSReportDesigner(target: string | HTMLElement, config?: object): ReportDesigner;
export class ReportDesigner {
    /**
     * @param {string|HTMLElement} target
     * @param {{ template?: object, data?: object, onChange?: Function, grid?: number }} [config]
     */
    constructor(target: string | HTMLElement, config?: {
        template?: object;
        data?: object;
        onChange?: Function;
        grid?: number;
    });
    _doc: Document;
    _container: Element;
    _template: any;
    _data: object;
    _grid: number;
    _emitter: {
        on: (event: string, cb: Function) => (() => void);
        emit: (event: string, ...args: any[]) => void;
        clear: () => void;
    };
    /** 選択状態: { band, index } | { band } | null */
    _selection: any;
    _undo: any[];
    _redo: any[];
    _preview: {
        overlay: HTMLDivElement;
        close: () => void;
    } | null;
    _destroyed: boolean;
    /** 現在のテンプレート（deep copy） */
    getTemplate(): any;
    /** テンプレートを差し替える */
    setTemplate(template: any): void;
    /** プレビュー用データを差し替える */
    setData(data: any): void;
    /** JSON 文字列を取り込む（不正なら throw・状態は変えない） */
    importJSON(json: any): void;
    /** JSON 文字列に書き出す */
    exportJSON(): string;
    /** イベント購読: 'change' | 'select' */
    on(event: any, cb: any): () => void;
    undo(): void;
    redo(): void;
    /** 選択中の要素を削除する */
    deleteSelection(): void;
    /**
     * 要素を追加する（パレットクリックと同じ経路）。
     * @param {string} bandKey
     * @param {object} element
     * @returns {number} 追加位置の index
     */
    addElement(bandKey: string, element: object): number;
    /** 選択中の要素/バンドのプロパティを更新する */
    updateSelection(patch: any): void;
    /** ライブプレビューを開く */
    openPreview(): void;
    destroy(): void;
    /** @private */
    private _bandOf;
    /** @private */
    private _selectionTarget;
    /** @private */
    private _pushUndo;
    /** @private */
    private _changed;
    /** @private 印字領域の幅（mm） */
    private _contentWidth;
    /** @private */
    private _mount;
    _root: HTMLDivElement | undefined;
    _paperSel: HTMLSelectElement | undefined;
    _orientSel: HTMLSelectElement | undefined;
    _bandList: HTMLDivElement | undefined;
    _surface: HTMLDivElement | undefined;
    _props: HTMLDivElement | undefined;
    _keyHandler: ((e: any) => void) | undefined;
    /** @private すべて再描画 */
    private _renderAll;
    /** @private バンドの追加/削除リスト */
    private _renderBandList;
    /** @private デザイン面（バンド積み上げ） */
    private _renderSurface;
    /** @private 要素1つのボックス */
    private _renderElementBox;
    /** @private ドラッグ共通（move / resize）。pointerup で undo 確定 */
    private _startDrag;
    /** @private バンド高さリサイズ */
    private _attachBandResize;
    /** @private */
    private _renderProps;
    /** @private 汎用フィールド生成 */
    private _field;
    /** @private target のプロパティ入力群 */
    private _propInputs;
    /** @private 余白入力（テンプレート設定用） */
    private _marginInputs;
    /** @private */
    private _doExport;
    /** @private */
    private _doImport;
}
