/**
 * キャレット位置の段落要素を返す。
 * 空段落のクリックでは selection のアンカーがコンテナ要素（div.rse-content 等）に
 * なることがあるため、その場合は anchorOffset の子要素へ降りてから探す。
 */
export function caretParagraph(ed: any, sel: any): any;
/** キャレットが「空の段落」にあればその要素を返す（範囲選択中・本文外は null） */
export function emptyParagraphAtCaret(ed: any): any;
export class InsertToolbar {
    /**
     * @param {import('../editor.js').Editor} editor
     * @param {string} definition ツールバー定義文字列
     */
    constructor(editor: import("../editor.js").Editor, definition: string);
    editor: import("../editor.js").Editor;
    el: HTMLDivElement;
    toolbar: Toolbar;
    _update: () => void;
    _hide: () => void;
    _keydown: (e: any) => void;
    _click: (e: any) => void;
    _focusWatch: {
        readonly active: any;
        destroy(): void;
    };
    _unwatch: () => void;
    update(): void;
    hide(): void;
    destroy(): void;
}
export namespace InsertToolbar {
    let EVENTS: string[];
}
import { Toolbar } from './toolbar.js';
