export class ContentEditableCore {
    /**
     * @param {HTMLElement} el contenteditable にする要素
     * @param {object} options { schema, extraTags, onKeydown(e), onNativeFormat(type) }
     */
    constructor(el: HTMLElement, options?: object);
    el: HTMLElement;
    options: object;
    schema: any;
    history: History;
    listeners: {};
    composing: boolean;
    readonly: boolean;
    lastInputType: any;
    lastInputTime: number;
    savedDomSel: {
        anchorNode: Node;
        anchorOffset: number;
        focusNode: Node | null;
        focusOffset: number;
    } | null;
    _selRaf: number;
    _onBeforeInput: (e: any) => void;
    _onInput: () => void;
    _onCompStart: () => void;
    _onCompEnd: () => void;
    _onKeyDown: (e: any) => void;
    _onPaste: (e: any) => void;
    _onDrop: (e: any) => void;
    _onSelChange: () => void;
    _onFocus: () => void;
    _onBlur: () => void;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, ...args: any[]): void;
    emitChange(): void;
    getHTML(): any;
    setHTML(html: any, { addToHistory }?: {
        addToHistory?: boolean | undefined;
    }): void;
    getJSON(): {
        type: any;
    };
    setJSON(json: any, { addToHistory }?: {
        addToHistory?: boolean | undefined;
    }): void;
    render(doc: any): void;
    /** 現在の選択を線形位置で返す（エディタ外なら null） */
    getSelectionRange(): {
        anchor: any;
        head: any;
        from: number;
        to: number;
    } | null;
    selectionPosFromMap(map: any): {
        anchor: any;
        head: any;
        from: number;
        to: number;
    } | null;
    setSelectionPos(anchor: any, head?: any): void;
    /** 選択がエディタ外に逃げていたら復元する（ダイアログ操作後など） */
    ensureSelection(wasInside: any): void;
    focus(): void;
    pathOf(node: any): number[] | null;
    nodeAt(path: any): HTMLElement | null;
    snapshot(): {
        html: string;
        sel: {
            a: number[];
            ao: number;
            f: number[];
            fo: number;
        } | null;
    };
    applySnapshot(snap: any): void;
    /**
     * モデル変形の実行単位。
     * fn(doc, sel) — sel: {anchor, head, from, to}。false を返すと変更なしで中止。
     * fn が {selection: {anchor, head}} を返すと変形後の選択を指定できる。
     */
    command(fn: any): boolean;
    /** モデルを読み取り専用で参照する（フォーカス・履歴・描画に影響しない） */
    readDoc(fn: any): any;
    /** キャレット位置へHTMLを挿入する（サニタイズ済みで正規化） */
    insertContent(html: any): boolean;
    insertText(text: any): boolean;
    toggleMarkAtCaret(type: any): boolean;
    closestByTags(node: any, tags: any): any;
    closestBy(node: any, predicate: any): any;
    /**
     * 選択なしキャレットで文字色/背景色を設定・解除する。
     * type: 'color' | 'bgcolor'、value: CSS色 or null（解除）
     */
    setColorAtCaret(type: any, value: any): boolean;
    /** キャレット位置の文字色/背景色を返す（無ければ null） */
    getColorAtCaret(type: any): any;
    isMarkActive(type: any): boolean;
    getActiveBlock(): {
        type: string;
        level: number;
    } | {
        type: string;
        level?: undefined;
    } | null;
    /** ブロック（p / 見出し / td / th）の style 値を返す（配置ボタンのアクティブ表示用） */
    getBlockStyleAt(prop: any): any;
    getLinkAtCaret(): {
        href: any;
    } | null;
    undo(): boolean;
    redo(): boolean;
    canUndo(): boolean;
    canRedo(): boolean;
    onBeforeInput(e: any): void;
    onInput(): void;
    onCompositionStart(): void;
    onCompositionEnd(): void;
    onKeyDown(e: any): void;
    onPaste(e: any): void;
    onDrop(e: any): void;
    onSelectionChange(): void;
    /** code_block 内の Enter: \\n を挿入。空行（直前が改行）の末尾で Enter するとブロックを抜ける */
    handleCodeBlockEnter(): void;
    /** タイプ入力後、書式トグル用に置いた ZWSP を掃除する */
    cleanZwspAroundCaret(): void;
    /**
     * DOMを直接いじる編集（画像リサイズ等）の履歴サポート。
     * 編集前に beginDirectEdit()、確定時に commitDirectEdit() を呼ぶ。
     */
    beginDirectEdit(): boolean;
    commitDirectEdit(): void;
    updateEmpty(): void;
    setReadonly(v: any): void;
    destroy(): void;
}
import { History } from './history.js';
