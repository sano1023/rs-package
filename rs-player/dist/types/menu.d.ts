/**
 * @param {import('./player.js').Player} player
 * @returns {{ el: HTMLElement, isOpen(): boolean, toggle(force?: boolean): void, destroy(): void }}
 */
export function buildMenu(player: import("./player.js").Player): {
    el: HTMLElement;
    isOpen(): boolean;
    toggle(force?: boolean): void;
    destroy(): void;
};
