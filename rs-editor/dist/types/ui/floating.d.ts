export class FloatingToolbar {
    /**
     * @param {import('../editor.js').Editor} editor
     * @param {string} definition ツールバー定義文字列
     */
    constructor(editor: import("../editor.js").Editor, definition: string);
    editor: import("../editor.js").Editor;
    el: HTMLDivElement;
    toolbar: Toolbar;
    _update: () => void;
    update(): void;
    hide(): void;
    destroy(): void;
}
import { Toolbar } from './toolbar.js';
