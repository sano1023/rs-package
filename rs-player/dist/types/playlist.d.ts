/**
 * プレイリストのアイテムを正規化する。
 * アイテム: 文字列（src）/ { title, sources|src, poster, thumbnails, tracks, chapters, href }
 */
export function normalizePlaylistItems(items: any): any[];
/** current の次の index（末尾で loop なら 0、無ければ -1） */
export function nextIndex(current: any, length: any, loop?: boolean): any;
/** current の前の index（先頭で loop なら末尾、無ければ -1） */
export function prevIndex(current: any, length: any, loop?: boolean): number;
/**
 * サイドリスト（プレイリスト一覧）を構築する。
 * @param {import('./player.js').Player} player
 * @returns {{ el: HTMLElement, isOpen(): boolean, toggle(force?: boolean): void, destroy(): void }}
 */
export function buildPlaylistPanel(player: import("./player.js").Player): {
    el: HTMLElement;
    isOpen(): boolean;
    toggle(force?: boolean): void;
    destroy(): void;
};
export class Playlist {
    constructor(items: any, { loop, index }?: {
        loop?: boolean | undefined;
        index?: number | undefined;
    });
    items: any[];
    loop: boolean;
    index: any;
    get length(): number;
    get current(): any;
    peekNext(): any;
    peekPrev(): number;
    hasNext(): boolean;
    hasPrev(): boolean;
    /** index を i に移す（範囲外は無視）。移動先アイテムを返す */
    goto(i: any): any;
    next(): any;
    prev(): any;
}
