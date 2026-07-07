/** rsid レジストリ（ノード → 連番ID。WeakMapなので記録対象のGCを妨げない） */
export function createIdRegistry(): {
    map: WeakMap<object, any>;
    next: number;
};
/** 既知ノードのIDを引く（未知なら0） */
export function idOf(reg: any, node: any): any;
/**
 * 1ノードをシリアライズする（子孫を含む）。記録対象外なら null。
 * @param {Node} node
 * @param {{reader: object, reg: object, ignore?: (el) => boolean}} ctx
 */
export function serializeNode(node: Node, ctx: {
    reader: object;
    reg: object;
    ignore?: (el: any) => boolean;
}): {
    id: any;
    k: number;
    t: string;
} | {
    id: any;
    k: number;
    x: any;
} | null;
/**
 * document 全体をスナップショットする。
 * @returns {{node: object}} snapshot
 */
export function serializeDocument(doc: any, ctx: any): {
    node: object;
};
/**
 * rs-replay DOMシリアライザ
 *
 * document / ノードを rsid（連番）付きのプレーンオブジェクトツリーに変換する。
 * DOM構造への副作用はない（読み取り専用ウォーカー）。
 *
 * 【安全設計】このモジュールは Text.data・input.value・value属性 を直接読まない。
 * 値・テキスト・属性は必ず ctx.reader（mask.js の createMaskReader）経由で
 * 「マスク済みの値」として受け取る。reader を渡さずに呼ぶと例外になるため、
 * 生値がシリアライズ結果へ落ちる経路は構造的に存在しない。
 *
 * シリアライズ形式（セッションJSONの snapshot.node / mutation add の node）:
 *   要素:       { id, k: 1, t: 'div', a: {属性}, ch: [子...], ns?: 's'(SVG),
 *                 v?: マスク済み値, c?: checked, s?: selectedIndex }
 *   テキスト:   { id, k: 3, x: 'マスク済みテキスト' }
 *   ※ コメントノードは記録しない。script / noscript はタグだけ残し中身・属性を落とす
 */
export const SVG_NS: "http://www.w3.org/2000/svg";
