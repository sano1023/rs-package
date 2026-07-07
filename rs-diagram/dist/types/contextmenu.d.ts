/**
 * rs-diagram コンテキストメニュー
 *
 * 既定項目: 複製 / 削除 / 最前面へ / 最背面へ。
 * options.contextMenu に配列を渡すと項目を差し替えられる:
 *   [{ label, action(diagram, ctx), enabled?(diagram, ctx), shortcut?, separator? }]
 *   ctx = { node, selection, point }
 */
export const DEFAULT_MENU_ITEMS: ({
    label: string;
    shortcut: string;
    enabled: (d: any, ctx: any) => boolean;
    action: (d: any) => any;
    separator?: undefined;
} | {
    separator: boolean;
    label?: undefined;
    shortcut?: undefined;
    enabled?: undefined;
    action?: undefined;
} | {
    label: string;
    enabled: (d: any, ctx: any) => boolean;
    action: (d: any) => any;
    shortcut?: undefined;
    separator?: undefined;
})[];
export class ContextMenu {
    constructor(diagram: any, items: any);
    diagram: any;
    items: any[];
    el: any;
    _onDocDown: (e: any) => void;
    _onKey: (e: any) => void;
    open(clientX: any, clientY: any, ctx: any): void;
    close(): void;
    destroy(): void;
}
