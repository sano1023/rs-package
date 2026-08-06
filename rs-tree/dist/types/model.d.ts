/**
 * 入れ子の nodes 配列を内部ツリーへ正規化する。
 * @param {Array<object|string>} nodes [{ id, label, children: [...], icon?, disabled?, checked?, expanded?, lazy? }]
 * @returns {{ map: Map<string, object>, rootIds: string[] }}
 */
export function normalizeTree(nodes: Array<object | string>): {
    map: Map<string, object>;
    rootIds: string[];
};
/** 子孫の id を列挙する（自身を含まない） */
export function descendants(tree: any, id: any): any[];
/** 祖先の id を列挙する（自身を含まない・親→ルート順） */
export function ancestors(tree: any, id: any): any[];
/**
 * 展開状態から可視リストを作る（描画順・depth つき）。
 * @param {object} tree
 * @param {Set<string>} expanded 展開中ノードの id
 * @returns {Array<{ id: string, depth: number }>}
 */
export function visibleList(tree: object, expanded: Set<string>): Array<{
    id: string;
    depth: number;
}>;
/**
 * 三態チェックの適用。指定ノードのチェックを子孫へカスケードし、祖先の状態を再計算する。
 * @param {object} tree
 * @param {Map<string, 'checked'|'indeterminate'>} states 現在の状態（unchecked は未登録）
 * @param {string} id
 * @param {boolean} checked
 * @returns {Map<string, string>} 新しい状態 Map
 */
export function applyCheck(tree: object, states: Map<string, "checked" | "indeterminate">, id: string, checked: boolean): Map<string, string>;
/**
 * ノードを移動する（循環禁止・同一親内の並べ替え兼用）。tree を**破壊的に**更新する
 * （Map 構造のため。呼び出し側で undo したい場合は snapshotTree を使う）。
 * @returns {{ moved: boolean, reason?: string }}
 */
export function moveNode(tree: any, id: any, newParentId: any, index: any): {
    moved: boolean;
    reason?: string;
};
/** ツリーの複製（undo 用スナップショット） */
export function snapshotTree(tree: any): {
    map: Map<any, any>;
    rootIds: any[];
};
/**
 * ラベル検索。ヒットしたノードと「ヒットを表示するために展開すべき祖先」を返す。
 * @returns {{ matched: Set<string>, toExpand: Set<string> }}
 */
export function searchTree(tree: any, text: any): {
    matched: Set<string>;
    toExpand: Set<string>;
};
/** 内部ツリー → 入れ子の配列（保存用） */
export function treeToNodes(tree: any, ids?: any): any;
