/**
 * コマンドパレットを生成する。
 * @param {object} [options]
 * @returns {CommandPalette}
 */
export function createRSCmdk(options?: object): CommandPalette;
export namespace DEFAULTS {
    let commands: never[];
    let hotkey: string;
    let placeholder: string;
    let maxResults: number;
    let storageKey: null;
    let recentLimit: number;
    namespace labels {
        let noResults: string;
        let back: string;
    }
}
export class CommandPalette {
    /**
     * @param {object} [options] {@link DEFAULTS}
     */
    constructor(options?: object);
    _doc: Document;
    _options: {
        labels: any;
        commands: never[];
        hotkey: string;
        placeholder: string;
        maxResults: number;
        storageKey: null;
        recentLimit: number;
    };
    _commands: any;
    _open: boolean;
    _query: string;
    _active: number;
    _stack: any[];
    _recent: any;
    _destroyed: boolean;
    _hotkeyHandler: (e: any) => void;
    /** コマンドを差し替える */
    setCommands(commands: any): void;
    open(): void;
    _opener: Element | null | undefined;
    close(): void;
    _overlay: HTMLDivElement | null | undefined;
    toggle(): void;
    isOpen(): boolean;
    destroy(): void;
    /** @private */
    private _normalize;
    /** @private */
    private _loadRecent;
    /** @private */
    private _pushRecent;
    /** @private 現在ページのコマンド */
    private _current;
    /** @private */
    private _mount;
    _crumb: HTMLDivElement | undefined;
    _input: HTMLInputElement | undefined;
    _list: HTMLDivElement | undefined;
    /** @private 候補の描画 */
    private _renderList;
    _filtered: object[] | undefined;
    /** @private アクティブ表示だけ更新 */
    private _paintActive;
    /** @private */
    private _execute;
    /** @private */
    private _onKeydown;
    /** @private ネストページから戻る */
    private _popPage;
    /** @private */
    private _scrollActive;
}
