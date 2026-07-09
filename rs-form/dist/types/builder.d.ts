/**
 * フォームビルダーを生成する。
 * @param {string|HTMLElement} target
 * @param {object} options { schema, questionTypes, previewMode }
 * @returns {RSFormBuilder}
 */
export function createRSFormBuilder(target: string | HTMLElement, options?: object): RSFormBuilder;
export class RSFormBuilder {
    /**
     * @param {string|HTMLElement} target
     * @param {object} options { schema, questionTypes, previewMode }
     */
    constructor(target: string | HTMLElement, options?: object);
    el: Element;
    options: object;
    customTypes: any;
    registry: Map<string, {
        name: string;
        defaults: {};
        render(ctx: any): any;
    }>;
    previewMode: string;
    schema: any;
    _hist: any[];
    _ptr: number;
    _lastEditKey: any;
    _listeners: Map<any, any>;
    _previewForm: import("./index.js").RSForm | null;
    _drag: {
        kind: string;
        type: any;
        name?: undefined;
    } | {
        kind: string;
        name: any;
        type?: undefined;
    } | null;
    _selected: any;
    _buildDOM(): void;
    root: any;
    undoBtn: any;
    redoBtn: any;
    modeStdBtn: any;
    modeConvBtn: any;
    paletteEl: any;
    canvasEl: any;
    propsEl: any;
    tabPreview: any;
    tabJson: any;
    previewPanel: any;
    previewEl: any;
    jsonPanel: any;
    jsonArea: any;
    jsonMsg: any;
    _switchPanel(which: any): void;
    _buildPalette(): void;
    _rebuildCanvas(): void;
    _buildCard(q: any): any;
    _wireDropZone(cards: any, pageIndex: any): void;
    _cardsOf(container: any, exclude: any): any[];
    _dropIndexIn(container: any, clientY: any, exclude: any): number;
    _markDrop(container: any, clientY: any): void;
    _dropMarker: any;
    _clearDropMarks(): void;
    _rebuildProps(): void;
    /** プロパティ行を作る（label + body） */
    _propRow(labelText: any, key: any, fill: any, inline: any): any;
    _buildCondEditor(q: any): void;
    /** 現在のスキーマ（clone） */
    getSchema(): any;
    /** スキーマを差し替える（履歴に積む＝undo 可能） */
    setSchema(schema: any): this;
    /** 質問を追加して選択する。@returns 追加された name */
    addQuestion(type: any, opts?: {}): any;
    /** 質問を削除する */
    removeQuestion(name: any): this;
    /** 質問を移動する（destIndex は除去後の挿入位置） */
    moveQuestion(name: any, destPage: any, destIndex: any): this;
    /** 質問名を変更する（visibleIf 参照も追従） */
    renameQuestion(oldName: any, newName: any): this;
    /** 質問のプロパティを更新する */
    updateQuestion(name: any, patch: any, editKey?: null): this;
    /** visibleIf を設定する（空ならキー削除） */
    setVisibleIf(name: any, expr: any): this;
    /** 質問を選択する（プロパティパネルを開く） */
    selectQuestion(name: any): this;
    /** length / pattern など validators 配列の1ルールを設定/削除する */
    _setRule(name: any, type: any, rule: any, editKey: any): void;
    _setMeta(patch: any, editKey: any): void;
    _setPageTitle(pageIndex: any, title: any): void;
    _addPage(): void;
    _removePage(pageIndex: any): void;
    exportJSON(): string;
    importJSON(str: any): true | {
        error: any;
    };
    setPreviewMode(mode: any): this;
    _updateModeButtons(): void;
    getPreviewForm(): import("./index.js").RSForm | null;
    _refreshPreview(): void;
    /**
     * スキーマ変更を確定して履歴へ積む。
     * editKey が非nullで直前と同一なら履歴を置き換える（連続タイプを1操作に畳む）。
     */
    _commit(schema: any, editKey: any): void;
    undo(): this;
    redo(): this;
    _applyHistory(): void;
    _updateHistButtons(): void;
    /** 変更のたびの共通後処理（プロパティパネルは維持＝タイプ中のフォーカスを守る） */
    _afterChange(): void;
    _syncJson(): void;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    _emit(event: any, payload: any): void;
    destroy(): void;
}
export namespace TYPE_LABELS {
    let text: string;
    let textarea: string;
    let number: string;
    let email: string;
    let tel: string;
    let postal: string;
    let date: string;
    let radio: string;
    let checkbox: string;
    let select: string;
    let rating: string;
    let nps: string;
    let matrix: string;
    let file: string;
    let signature: string;
}
