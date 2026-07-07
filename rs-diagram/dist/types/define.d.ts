/**
 * rs-diagram プラグイン定義ヘルパー
 *
 * 組み込みのノード形状（rect/rounded/…）・リンク形状（straight/orthogonal）も
 * すべて同じAPIで実装されている（dogfooding）。
 */
/**
 * ノードタイプを定義する。
 * @param {object} def
 *   - name: タイプ名（必須）
 *   - draw(ctx): 描画関数（必須）。ctx = { renderer, group, node, width, height, selected, hovered, style, theme, diagram }
 *   - defaults: { width, height } 既定サイズ
 *   - anchors: 接続点の配列（省略時 top/right/bottom/left の4点）
 *   - shape: 境界計算のヒント 'rect' | 'ellipse' | 'diamond'（省略時 rect）
 *   - labelPosition: 'center' | 'bottom'（省略時 center）
 *   - style: タイプ固有のスタイル既定値（fill/stroke/…）
 */
export function defineNodeType(def: object): {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/**
 * リンクタイプを定義する。
 * @param {object} def
 *   - name: タイプ名（必須）。link.router で参照する
 *   - route(ctx): 経路関数（必須・純粋関数）。ctx = { link, source: {bounds,shape,anchor}, target: {...} } → [{x,y},...]
 *   - defaults: { arrow, dash, stroke, strokeWidth } 描画既定値
 */
export function defineLinkType(def: object): {
    defaults: any;
};
