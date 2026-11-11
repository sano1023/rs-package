/** プラグイン定義のヘルパー（現状は検証のみだが、公開APIとして固定する） */
export function definePlugin(def: any): any;
export const DEFAULT_TOOLBAR: "undo redo | bold italic underline strikethrough | forecolor backcolor | h1 h2 h3 | alignleft aligncenter alignright | blockquote codeblock | bullist numlist | outdent indent | link image table | code";
export const DEFAULT_FLOATING_TOOLBAR: "bold italic underline strikethrough | link";
/** シンプルUI（ui: 'simple'）の既定: 選択時のツールバー / 空の行の挿入ボタン */
export const DEFAULT_SIMPLE_FLOATING_TOOLBAR: "bold italic strikethrough forecolor heading bullist numlist blockquote backcolor underline link";
export const DEFAULT_SIMPLE_INSERT_TOOLBAR: "photo divider ... h2 h3 bullist numlist checklist blockquote codeblock | table box callout linkcard toc media";
export class Editor {
    /**
     * @param {string|HTMLElement} target セレクタ or 要素（textarea / div）
     * @param {object} config
     *   toolbar: ツールバー定義文字列
     *   floatingToolbar / insertToolbar: 選択時 / 空の行に出すボタン定義（false で非表示）
     *   insertPlacement: 'auto'（既定。左に余白があれば行の左外、なければ行の右端）| 'inline'（常に行の右端）
     *   ui: 'standard'（既定）| 'simple'。simple: { toolbar, floatingToolbar, insertToolbar } でシンプルUI側を上書き
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
    /** @type {'standard' | 'simple'} 現在のUIプリセット（変更は setUI） */
    ui: "standard" | "simple";
    _ui: {
        standard: {
            toolbar: any;
            floatingToolbar: any;
            insertToolbar: any;
        };
        simple: {
            toolbar: any;
            floatingToolbar: any;
            insertToolbar: any;
        };
    };
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
        toggleHeading: (...args: any[]) => any;
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
        undo: (...args: any[]) => any;
        redo: (...args: any[]) => any;
        toggleSource: () => any;
    };
    _selectionBookmark: Readonly<{}> | null;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, ...args: any[]): void;
    getHTML(): any;
    _normalizedSource: any;
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
    /** 本文が変わるまで有効な、このエディタ専用の選択ブックマーク。 */
    captureSelection(): Readonly<{}> | null;
    restoreSelection(bookmark?: Readonly<{}> | null): boolean;
    isEnabled(name: any): boolean;
    getToolState(name: any): {
        active: boolean;
        enabled: boolean;
    };
    /**
     * メニュー型ツールは単一項目でもメニューを表示する。
     * @param {string} name
     * @param {{ anchor?: HTMLElement }} [options]
     * @returns {boolean}
     */
    openTool(name: string, { anchor }?: {
        anchor?: HTMLElement;
    }): boolean;
    /**
     * 現在のUIのツールバー定義を変更する（省略・true で既定、false / '' で非表示）。
     * @param {string | boolean} [definition]
     */
    setToolbar(definition?: string | boolean): boolean;
    /**
     * 現在のUIの選択時ツールバーを変更する（省略・true で既定、false / '' で非表示）。
     * @param {string | boolean} [definition]
     */
    setFloatingToolbar(definition?: string | boolean): boolean;
    /**
     * 現在のUIの「空の行の挿入ボタン」を変更する（省略・true で既定、false / '' で非表示）。
     * @param {string | boolean} [definition]
     */
    setInsertToolbar(definition?: string | boolean): boolean;
    /**
     * UIプリセットを切り替える。本文・選択・undo/redo 履歴は維持する。
     * プラグインと保存形式は共通なので、どちらのUIで編集した本文も相互に開ける。
     * ソース表示中は本文へ反映してから切り替える。
     * @param {'standard' | 'simple'} name
     * @returns {boolean} 指定のUIになっていれば true（未知の名前・破棄後は false）
     */
    setUI(name: "standard" | "simple"): boolean;
    _setUIPart(part: any, definition: any): boolean;
    /** 現在のUIの定義から、ツールバー類（only 指定時はその1つ）を作り直す */
    _mountUI(only: any): void;
    toolbar: Toolbar | undefined;
    floating: FloatingToolbar | null | undefined;
    insert: InsertToolbar | null | undefined;
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
    /**
     * 画像をアップロード。元の位置に戻れない場合は通知して挿入待ちにする。
     * @param {Iterable<File>} files
     * @param {{bookmark?: object|null, alt?: string}} options
     * @returns {Promise<boolean>}
     */
    uploadFiles(files: Iterable<File>, options?: {
        bookmark?: object | null;
        alt?: string;
    }): Promise<boolean>;
    handleKeymap(e: any): boolean;
    destroy(): void;
}
import { ContentEditableCore } from './core/core.js';
import { Toolbar } from './ui/toolbar.js';
import { FloatingToolbar } from './ui/floating.js';
import { InsertToolbar } from './ui/insert.js';
import { toJSON } from './core/model.js';
import { fromJSON } from './core/model.js';
export { toJSON, fromJSON };
