export class FloatingToolbar {
    /**
     * @param {import('../editor.js').Editor} editor
     * @param {string} definition ツールバー定義文字列
     * @param {{ touchAware?: boolean }} [options]
     */
    constructor(editor: import("../editor.js").Editor, definition: string, { touchAware }?: {
        touchAware?: boolean;
    });
    editor: import("../editor.js").Editor;
    touch: boolean;
    el: HTMLDivElement;
    toolbar: Toolbar;
    _update: () => void;
    _hide: () => void;
    _focusWatch: {
        readonly active: any;
        destroy(): void;
    };
    _blur: (e: any) => void;
    _keydown: (e: any) => void;
    _unwatch: () => void;
    _pointer: ((e: any) => void) | null;
    update(): void;
    hide(): void;
    destroy(): void;
}
import { Toolbar } from './toolbar.js';
