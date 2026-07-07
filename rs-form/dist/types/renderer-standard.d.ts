export class StandardRenderer {
    /**
     * @param {HTMLElement} container
     * @param {import('./model.js').FormModel} model
     * @param {object} form RSForm インスタンス（options / getValue などへの窓口）
     * @param {Map} registry 質問タイプ registry（name → typeDef）
     */
    constructor(container: HTMLElement, model: import("./model.js").FormModel, form: object, registry: Map<any, any>);
    container: HTMLElement;
    model: import("./model.js").FormModel;
    form: object;
    registry: Map<any, any>;
    readonly: boolean;
    _rendered: Map<any, any>;
    _cleanups: any[];
    _unsubscribe: (() => void)[];
    _build(): void;
    root: HTMLDivElement | undefined;
    progressEl: HTMLDivElement | undefined;
    progressBar: HTMLDivElement | undefined;
    progressText: HTMLDivElement | undefined;
    formEl: HTMLFormElement | undefined;
    pageEl: HTMLDivElement | undefined;
    navEl: HTMLDivElement | undefined;
    prevBtn: HTMLButtonElement | undefined;
    nextBtn: HTMLButtonElement | undefined;
    /** 次へ or 送信 */
    _onPrimaryAction(): void;
    _renderPage(): void;
    _updateProgress(): void;
    /** 1質問の描画（ラベル・必須・説明・エラー領域・aria をコアで配線） */
    _renderQuestion(q: any): HTMLDivElement | null;
    _applyReadonly(): void;
    _applyVisibility(changes: any): void;
    /** モデル値の変更を入力欄の表示へ反映（住所補完・setValue API 等。編集中の欄には触れない） */
    _syncInput(name: any): void;
    /** blur 時のインライン検証（空値の必須エラーは submit/次へ を試みるまで出さない） */
    _inlineValidate(name: any): void;
    /** validate() 結果の一括表示 + 最初のエラー質問へフォーカス/スクロール */
    showErrors(result: any): void;
    _setError(name: any, messages: any): void;
    _scrollTop(): void;
    _renderCompleted(): void;
    completedEl: HTMLDivElement | undefined;
    destroy(): void;
}
