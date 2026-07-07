/** プラグイン定義のヘルパー（現状は検証のみだが、公開APIとして固定する） */
export function definePlugin(def: any): any;
export const DEFAULT_TOOLBAR: "undo redo | bold italic underline strikethrough | forecolor backcolor | h1 h2 h3 | alignleft aligncenter alignright | blockquote codeblock | bullist numlist | outdent indent | link image table | code";
export const DEFAULT_FLOATING_TOOLBAR: "bold italic underline strikethrough | link";
export class Editor {
    /**
     * @param {string|HTMLElement} target セレクタ or 要素（textarea / div）
     * @param {object} config
     *   toolbar: ツールバー定義文字列
     *   plugins: プラグイン配列（ビルトインは createRSEditor 側で結合済み）
     *   placeholder, readonly, onChange(html), imageUploadHandler(file) [v0.2用フック]
     */
    constructor(target: string | HTMLElement, config?: object);
    target: Element;
    config: object;
    listeners: {};
    sourceMode: boolean;
    readonly: boolean;
    destroyed: boolean;
    plugins: any;
    buttons: {};
    keymaps: {
        run: any;
        mod: any;
        shift: any;
        alt: any;
        key: any;
    }[];
    schema: {
        nodes: {};
        marks: {};
    };
    extraTags: {};
    wrapper: HTMLDivElement;
    toolbarEl: HTMLDivElement;
    contentEl: HTMLDivElement;
    sourceEl: HTMLTextAreaElement;
    isTextarea: boolean;
    _targetDisplay: any;
    core: ContentEditableCore;
    commands: {
        toggleMark: (...args: any[]) => any;
        setHeading: (...args: any[]) => any;
        setParagraph: (...args: any[]) => any;
        toggleBlockquote: (...args: any[]) => any;
        toggleCodeBlock: (...args: any[]) => any;
        toggleList: (...args: any[]) => any;
        indent: (...args: any[]) => any;
        outdent: (...args: any[]) => any;
        setLink: (...args: any[]) => any;
        unsetLink: (...args: any[]) => any;
        insertImage: (...args: any[]) => any;
        insertContent: (...args: any[]) => any;
        setColor: (...args: any[]) => any;
        setBgColor: (...args: any[]) => any;
        setAlign: (...args: any[]) => any;
        insertTable: (...args: any[]) => any;
        tableAddRow: (...args: any[]) => any;
        tableAddCol: (...args: any[]) => any;
        tableDeleteRow: (...args: any[]) => any;
        tableDeleteCol: (...args: any[]) => any;
        tableDelete: (...args: any[]) => any;
        undo: () => any;
        redo: () => any;
        toggleSource: () => any;
    };
    toolbar: Toolbar;
    floating: FloatingToolbar | null;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, ...args: any[]): void;
    getHTML(): any;
    setHTML(html: any): void;
    getJSON(): {
        type: any;
    };
    setJSON(json: any): void;
    insertContent(html: any): void;
    getText(): string;
    focus(): void;
    undo(): boolean;
    redo(): boolean;
    exec(name: any): boolean;
    isActive(name: any): boolean;
    setReadonly(v: any): void;
    toggleSource(force: any): void;
    /** ソース編集内容を WYSIWYG に反映 */
    commitSource(): void;
    openDialog(options: any): Promise<any>;
    /** プラグイン別オプション（config.pluginOptions.<name>）を返す */
    pluginOptions(name: any): any;
    /** ペースト/ドロップされたファイルを imageUploadHandler で取り込む。処理したら true */
    handleFiles(files: any): boolean;
    handleKeymap(e: any): boolean;
    destroy(): void;
}
import { ContentEditableCore } from './core/core.js';
import { Toolbar } from './ui/toolbar.js';
import { FloatingToolbar } from './ui/floating.js';
import { toJSON } from './core/model.js';
import { fromJSON } from './core/model.js';
export { toJSON, fromJSON };
