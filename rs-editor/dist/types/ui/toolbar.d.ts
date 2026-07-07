export class Toolbar {
    /**
     * @param {HTMLElement} el ツールバーにする要素
     * @param {import('../editor.js').Editor} editor
     * @param {string} definition 'undo redo | bold italic ...'
     */
    constructor(el: HTMLElement, editor: import("../editor.js").Editor, definition: string);
    el: HTMLElement;
    editor: import("../editor.js").Editor;
    buttons: {
        name: string;
        spec: any;
        el: HTMLButtonElement;
    }[];
    onKeydown(e: any): void;
    isDisabled(spec: any): boolean;
    update(): void;
    destroy(): void;
}
