/**
 * rs-editor ツールバー
 *
 * TinyMCE 風の文字列定義（'undo redo | bold italic | ...'、'|' はセパレータ）から
 * ボタン列を組み立てる。ボタンの実体はプラグインが editor.buttons に登録したスペック。
 *
 * アクセシビリティ: role="toolbar" + 各ボタンに aria-label / aria-pressed、
 * 矢印キーでのフォーカス移動（roving tabindex）に対応。
 */
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
    _keydown: (e: any) => void;
    onKeydown(e: any): void;
    isDisabled(spec: any): boolean;
    update(): void;
    dispose(): void;
    destroy(): void;
}
