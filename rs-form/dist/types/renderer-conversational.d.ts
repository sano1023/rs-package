export class ConversationalRenderer {
    /**
     * @param {HTMLElement} container
     * @param {import('./model.js').FormModel} model
     * @param {object} form RSForm インスタンス
     * @param {Map} registry 質問タイプ registry
     */
    constructor(container: HTMLElement, model: import("./model.js").FormModel, form: object, registry: Map<any, any>);
    container: HTMLElement;
    model: import("./model.js").FormModel;
    form: object;
    registry: Map<any, any>;
    _cleanups: any[];
    _unsubscribe: (() => void)[];
    _entry: {
        wrapper: any;
        primary: any;
        errorEl: any;
        typeDef: any;
        content: any;
        isGroup: any;
        inputs: any;
    } | null;
    _animating: boolean;
    _completed: boolean;
    _pos: number;
    _build(): void;
    root: HTMLDivElement | undefined;
    progressEl: HTMLDivElement | undefined;
    progressBar: HTMLDivElement | undefined;
    progressText: HTMLDivElement | undefined;
    stage: HTMLDivElement | undefined;
    card: HTMLDivElement | undefined;
    navEl: HTMLDivElement | undefined;
    prevBtn: HTMLButtonElement | undefined;
    okBtn: HTMLButtonElement | undefined;
    _navigable(i: any): boolean;
    _firstNavigable(): number;
    _nextNavigable(from: any): any;
    _prevNavigable(from: any): number;
    _navigableList(): number[];
    _renderCurrent(): void;
    _pageTitleFor(index: any): any;
    _focusPrimary(): void;
    _updateNav(): void;
    _updateProgress(): void;
    /** 現在の質問を確定・検証してから次へ（最後なら submit） */
    next(): void;
    prev(): void;
    _indexOfName(name: any): number;
    /** 正規化後の値を入力欄へ反映（エラーで留まったときの見た目更新） */
    _syncPrimary(name: any): void;
    _animateTo(idx: any, dir: any): void;
    _onKeydown(e: any): void;
    _inlineValidate(name: any): void;
    showErrors(result: any): void;
    _renderCompleted(): void;
    completedEl: HTMLDivElement | undefined;
    destroy(): void;
}
