/** ノードがグループか */
export function isGroup(node: any): boolean;
/** id → node の Map を作る */
export function nodeMap(nodes: any): Map<any, any>;
/** グループの直接の子ノード配列 */
export function childrenOf(nodes: any, group: any): any;
/** グループの全子孫ノードID（ネストしたグループも展開） */
export function descendantIds(nodes: any, groupId: any): any[];
/** nodeId が属する親グループID（無ければ null） */
export function parentOf(nodes: any, nodeId: any): any;
/** collapsed なグループの子孫（=隠すべきノードID）の集合 */
export function hiddenNodeIds(nodes: any): Set<any>;
/**
 * nodeId を表示上代表するノードID。
 * 自分が隠れているなら、畳まれている一番外側の祖先グループのIDを返す。
 */
export function visibleRepresentative(nodes: any, nodeId: any, hidden: any): string;
/** 子ノード群を囲む境界（見出し＋余白込み）。子が無ければ null */
export function fitBounds(nodes: any, group: any, { padding, header }?: {
    padding?: number | undefined;
    header?: number | undefined;
}): {
    x: number;
    y: number;
    width: number;
    height: number;
} | null;
/**
 * rs-diagram グループ（純粋関数層）
 *
 * グループは type:'group' のノードで、children:[nodeId,...] を持つ。
 * グループ移動で子が追従し、collapsed:true で子を隠して見出しだけに畳む。
 * ここでは DOM 非依存の集合演算・境界計算のみを提供する（編集はコマンド経由）。
 */
export const GROUP_HEADER: 26;
export const GROUP_PADDING: 20;
