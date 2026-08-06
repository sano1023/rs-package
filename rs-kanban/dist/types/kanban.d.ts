/**
 * カンバンボードを生成する。
 * @param {string|HTMLElement} target
 * @param {object} [options]
 * @returns {Kanban}
 */
export function createRSKanban(target: string | HTMLElement, options?: object): Kanban;
export namespace DEFAULTS {
    let columns: never[];
    let cards: never[];
    let lanes: null;
    let editable: boolean;
    let addable: boolean;
    let enforceWip: boolean;
    let popover: boolean;
    let columnMenu: boolean;
    let tagColors: {};
    namespace labels {
        export let addCard: string;
        export let addPlaceholder: string;
        export function wipOver(count: any, wip: any): string;
        export let emptyLane: string;
        export let save: string;
        let _delete: string;
        export { _delete as delete };
        export let close: string;
        export let title: string;
        export let description: string;
        export let assignee: string;
        export let due: string;
        export let tags: string;
        export let moveLeft: string;
        export let moveRight: string;
        export let collapse: string;
        export let expand: string;
        export let removeColumn: string;
    }
}
export class Kanban {
    /**
     * @param {string|HTMLElement} target
     * @param {object} [options] {@link DEFAULTS}
     */
    constructor(target: string | HTMLElement, options?: object);
    _doc: Document;
    _container: Element;
    _options: {
        labels: any;
        columns: never[];
        cards: never[];
        lanes: null;
        editable: boolean;
        addable: boolean;
        enforceWip: boolean;
        /** クリックでカード詳細ポップオーバーを開く（v0.2） */
        popover: boolean;
        /** 列メニュー（左右移動・折りたたみ・削除）を出す（v0.2） */
        columnMenu: boolean;
        /** タグ名 → 色。指定タグはチップがこの色になる（v0.2） */
        tagColors: {};
    };
    _emitter: {
        on: Function;
        emit: Function;
        clear: Function;
    };
    _board: {
        columns: object[];
        cards: object[];
        lanes: string[];
    };
    _filter: any;
    _undo: any[];
    _redo: any[];
    _destroyed: boolean;
    _root: HTMLDivElement;
    /** ボードの複製を返す */
    getBoard(): any;
    /** ボードを差し替える */
    setBoard(board: any): void;
    /** カードを追加する */
    addCard(input: any, columnId: any): {
        id: string;
        title: string;
        columnId: any;
        lane: string | null;
        color: any;
        tags: string[];
        assignee: string;
        due: string;
        description: string;
        meta: {};
    };
    /** カードを更新する（部分パッチ） */
    updateCard(id: any, patch: any): {
        id: string;
        title: string;
        columnId: any;
        lane: string | null;
        color: any;
        tags: string[];
        assignee: string;
        due: string;
        description: string;
        meta: {};
    } | null;
    /** カードを削除する */
    removeCard(id: any): boolean;
    /**
     * カードを移動する（プログラム操作。ドラッグと同じ検証・イベント）。
     * @returns {boolean} 移動できたか
     */
    move(cardId: any, toColumnId: any, toIndex: any, toLane: any): boolean;
    /** 絞り込み（{ text, tag, assignee }・null で解除） */
    setFilter(filter: any): void;
    /** 列を追加する（v0.2） */
    addColumn(input: any, index: any): {
        id: string;
        title: string;
        wip: number | null;
        color: any;
        collapsed: boolean;
    };
    /** 列を削除する（カードは隣の列へ移す・v0.2） */
    removeColumn(id: any): boolean;
    /** 列を並べ替える（v0.2） */
    moveColumn(id: any, toIndex: any): boolean;
    /** 列の折りたたみ（v0.2） */
    toggleColumn(id: any, collapsed: any): void;
    undo(): void;
    redo(): void;
    /** イベント購読: cardClick / cardMove / blocked / change */
    on(event: any, cb: any): any;
    destroy(): void;
    /** @private */
    private _pushUndo;
    /** @private 再描画 */
    private render;
    /** @private 列1つ */
    private _renderColumn;
    /** @private 列メニュー（▾: 左右移動・折りたたみ・削除） */
    private _renderColumnMenu;
    _menu: {
        el: HTMLDivElement;
        cleanup: () => void;
    } | null | undefined;
    /** @private */
    private _closeMenu;
    /** @private カード1枚 */
    private _renderCard;
    /** @private カード詳細ポップオーバー（v0.2） */
    private _openPopover;
    _popover: {
        cleanup: () => void;
    } | null | undefined;
    /** @private */
    private _closePopover;
    /** @private カード追加ボタン → インライン入力 */
    private _renderAddButton;
    /** @private ドラッグ（カード移動・並べ替え） */
    private _attachDrag;
    _dragMoved: boolean | undefined;
}
