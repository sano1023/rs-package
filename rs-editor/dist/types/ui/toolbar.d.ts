export class Toolbar {
    /**
     * @param {HTMLElement} el ツールバーにする要素
     * @param {import('../editor.js').Editor} editor
     * @param {string} definition 'undo redo | bold italic ... table media'
     * @param {{ direct?: boolean, moreIcon?: string, moreLabel?: string }} [options]
     *   direct: メニュー型のボタンもメニューを開かず、既定の動作（exec）を実行する。
     *     スペックに onInsert(editor) があればそちらを使う（キャレットの行へ入れるための動作）
     *   moreIcon / moreLabel: 「その他」メニューボタンのアイコン（HTML）と名前
     */
    constructor(el: HTMLElement, editor: import("../editor.js").Editor, definition: string, { direct, moreIcon, moreLabel }?: {
        direct?: boolean;
        moreIcon?: string;
        moreLabel?: string;
    });
    el: HTMLElement;
    editor: import("../editor.js").Editor;
    direct: boolean;
    buttons: {
        name: string;
        spec: any;
        el: HTMLButtonElement;
    }[];
    menuItems: (string | {
        name: string;
        spec: any;
    })[];
    autoHidden: any[];
    seps: {
        el: HTMLSpanElement;
        index: number;
    }[];
    more: HTMLButtonElement;
    _keydown: (e: any) => void;
    createButton(icon: any, label: any): HTMLButtonElement;
    /** ボタンの既定の動作を実行する */
    run(name: any, spec: any): boolean;
    /** ボタンも「その他」メニューも無い */
    get empty(): boolean | "until-found";
    /** 「その他」メニューに出す項目（幅に入らなかったボタン → `...` 以降、の順） */
    moreItems(): any[];
    syncMore(): void;
    /** そのツールの位置に当たる要素（並んでいればそのボタン、メニューの中なら「その他」ボタン） */
    anchorFor(name: any): HTMLButtonElement | null;
    toggleMore(): void;
    _moreMenu: any;
    /**
     * 1行表示（折り返さない）のツールバーで、幅に入らないボタンを後ろから「その他」メニューへ移す。
     * @param {number} maxWidth ツールバーに使える幅（px）
     */
    fit(maxWidth: number): void;
    _fitWidth: any;
    /**
     * キーボードで本文から移動してくるときの入口。前回いたボタン（なければ先頭）へフォーカスする。
     * @returns {boolean} 移動できたか
     */
    focus(): boolean;
    /** 矢印キーで移動できる（表示中・有効な）ボタン */
    focusable(): HTMLButtonElement[];
    onKeydown(e: any): void;
    isDisabled(spec: any): boolean;
    isActive(spec: any): boolean;
    update(): void;
    dispose(): void;
    destroy(): void;
}
