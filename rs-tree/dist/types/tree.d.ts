/**
 * ツリービューを生成する。
 * @param {string|HTMLElement} target
 * @param {object} [options]
 * @returns {Tree}
 */
export function createRSTree(target: string | HTMLElement, options?: object): Tree;
export namespace DEFAULTS {
    let nodes: never[];
    let checkboxes: boolean;
    let draggable: boolean;
    let multiple: boolean;
    let rowHeight: number;
    let virtualThreshold: number;
    let loadChildren: null;
    let renamable: boolean;
    let contextMenu: boolean;
    namespace labels {
        let loading: string;
        let empty: string;
        let rename: string;
        let addChild: string;
        let remove: string;
        let newNode: string;
    }
}
export class Tree {
    /**
     * @param {string|HTMLElement} target
     * @param {object} [options] {@link DEFAULTS}
     */
    constructor(target: string | HTMLElement, options?: object);
    _doc: Document;
    _container: Element;
    _options: {
        labels: any;
        nodes: never[];
        checkboxes: boolean;
        draggable: boolean;
        multiple: boolean;
        rowHeight: number;
        virtualThreshold: number;
        loadChildren: null;
        /** インライン名前変更（F2 / ラベルのダブルクリック・v0.2） */
        renamable: boolean;
        /**
         * コンテキストメニュー（v0.2）。true = 組み込み（名前変更/子を追加/削除）、
         * 関数 = (node) => [{ label, onClick(node) }] で独自メニュー
         */
        contextMenu: boolean;
    };
    _emitter: {
        on: Function;
        emit: Function;
        clear: Function;
    };
    _tree: {
        map: Map<string, object>;
        rootIds: string[];
    };
    _expanded: Set<any>;
    _checks: Map<any, any>;
    _selection: Set<any>;
    _focusId: any;
    _matched: Set<string> | null;
    _loading: Set<any>;
    _destroyed: boolean;
    _root: HTMLDivElement;
    /** 展開する（onExpand・遅延読込を発火） */
    expand(id: any): void;
    /** 折りたたむ */
    collapse(id: any): void;
    toggle(id: any): void;
    expandAll(): void;
    collapseAll(): void;
    /** 選択する（multiple: false なら単一） */
    select(id: any, { additive }?: {
        additive?: boolean | undefined;
    }): void;
    /** 選択中の id 配列 */
    getSelection(): any[];
    /** チェック状態を変更する（checkboxes: true） */
    setChecked(id: any, checked: any): void;
    /** checked なノード id（indeterminate は含まない） */
    getChecked(): any[];
    /** ノード情報（label・親・子・任意データ）を返す */
    getNode(id: any): any;
    /** ノードを追加する */
    addNode(input: any, parentId: null | undefined, index: any): string;
    /** ノードを削除する（子孫ごと） */
    removeNode(id: any): boolean;
    /** ノードを移動する（循環は拒否・nodeMove イベント + revert） */
    move(id: any, newParentId: any, index: any): boolean;
    /** ラベル検索（ヒットをハイライトし、祖先を自動展開）。空文字で解除 */
    search(text: any): number;
    /** 入れ子の配列として書き出す（保存用） */
    toNodes(): any;
    /** イベント購読: select / check / expand / nodeMove / blocked / rename / change */
    on(event: any, cb: any): any;
    /**
     * ノード名を変更する（v0.2）。
     * @returns {boolean}
     */
    rename(id: any, label: any): boolean;
    /** インライン名前変更を開始する（v0.2） */
    startRename(id: any): void;
    destroy(): void;
    /** @private */
    private render;
    _visible: {
        id: string;
        depth: number;
    }[] | undefined;
    _virtual: boolean | undefined;
    /** @private 行の描画（仮想化時はウィンドウのみ） */
    private _renderRows;
    /** @private 1行 */
    private _renderRow;
    /** @private コンテキストメニュー（v0.2） */
    private _openMenu;
    _menu: {
        cleanup: () => void;
    } | null | undefined;
    /** @private */
    private _closeMenu;
    /** @private 遅延読込 */
    private _loadLazy;
    /** @private キーボード操作 */
    private _onKeydown;
    /** @private D&D 移動（行の上半分=前へ・下半分=後ろへ・中央=子にする） */
    private _attachDrag;
}
