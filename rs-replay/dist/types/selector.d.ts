/**
 * id が「実行時に自動採番された不安定なもの」かを判定する。
 * true のとき、その id はセレクタに使わない（構造ベースへフォールバック）。
 */
export function isDynamicId(id: any): boolean;
/**
 * class 名が「CSS-in-JS 等で生成された不安定なもの」かを判定する。
 * true のとき、その class はセレクタに使わない。
 */
export function isDynamicClass(c: any): boolean;
/** id が安定（＝セレクタに使える）か */
export function isStableId(id: any): boolean;
/** class 属性文字列から安定なクラスだけを配列で返す */
export function stableClasses(classAttr: any): string[];
/** CSSセレクタ用に識別子をエスケープする（英数と _ - 以外を \\ で退避） */
export function cssEscapeIdent(s: any): string;
/**
 * snapshot ツリーから rsid のノードまでの経路を求める。
 * 各要素は { node, typeIndex, typeCount }（同タグ兄弟内の1始まり位置・同タグ兄弟数）。
 * light DOM（ch）と open shadow（sh）の両方を辿る。見つからなければ null。
 */
export function findNodePath(root: any, rsid: any): any[] | null;
/**
 * snapshot 上の rsid を安定した正規化セレクタ文字列にする。
 * 見つからない/不正なら null。
 * @param {object} root snapshot.node
 * @param {number} rsid 対象ノードのrsid
 * @param {{maxDepth?: number}} [options] 祖先へ遡る最大セグメント数（既定6）
 */
export function buildSelector(root: object, rsid: number, options?: {
    maxDepth?: number;
}): string | null;
