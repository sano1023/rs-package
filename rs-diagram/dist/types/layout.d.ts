/**
 * 樹形図レイアウト。
 * opts: { direction: 'TB'|'BT'|'LR'|'RL', gapX, gapY, x0, y0, rootId }
 */
export function layoutTree(nodes: any, links: any, opts?: {}): any;
/**
 * 階層レイアウト（Sugiyama 簡易）。
 * opts: { direction: 'TB'|'LR', gapX, gapY, x0, y0 }
 */
export function layoutLayered(nodes: any, links: any, opts?: {}): any;
/** 格子詰め。opts: { cols, gapX, gapY, x0, y0 } */
export function layoutGrid(nodes: any, opts?: {}): {};
/** 放射レイアウト。opts: { cx, cy, ringGap, rootId } */
export function layoutRadial(nodes: any, links: any, opts?: {}): any;
/** 名前でレイアウト関数を選び、座標マップを返す */
export function computeLayout(name: any, nodes: any, links: any, opts?: {}): any;
export const LAYOUT_NAMES: string[];
