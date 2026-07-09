/** from の中心から見て to がある側（right/left/bottom/top） */
export function autoSide(from: any, to: any): "right" | "left" | "bottom" | "top";
/** 重複点・一直線上の中間点を除去する */
export function simplifyPoints(pts: any): {
    x: any;
    y: any;
}[];
/** 直線リンク: 形状境界から形状境界へ1本の線分（source.point= ポート等の固定点を優先） */
export function routeStraight({ source, target }: {
    source: any;
    target: any;
}): any[];
/** bezier リンク: 経路点は直線と同じ（描画は toPath=bezierPath で曲線化する） */
export function routeBezier(ctx: any): any[];
/**
 * 直交リンク: 水平・垂直セグメントのみの折れ線。
 * アンカー/ポート側(source.side)未指定なら相手側を向く辺を自動選択する。
 */
export function routeOrthogonal({ source, target }: {
    source: any;
    target: any;
}): {
    x: any;
    y: any;
}[];
/** アンカーからのスタブ付き直交経路（接続ドラッグのプレビュー用） */
export function stubPoint(bounds: any, side: any, length?: number): {
    x: any;
    y: any;
};
/** 軸平行セグメントが矩形の内部を通るか（辺に沿う=マージン上は通過扱いにしない） */
export function segmentHitsRect(a: any, b: any, rect: any, eps?: number): boolean;
/**
 * 障害物回避の直交ルーティング。
 * ctx.obstacles（[{x,y,width,height}] 端点ノードを除く）を避ける水平垂直経路を返す。
 * 障害物が無ければ通常の直交にフォールバックする。
 * 実装: 障害物の縁＋マージンで作った疎グリッド上の A*（曲がりにペナルティ）。
 */
export function routeOrthogonalAvoid(ctx: any): {
    x: any;
    y: any;
}[];
/** 経路点を滑らかな三次ベジェのパス文字列にする（bezier リンクの描画用） */
export function bezierPath(pts: any): string;
/** 経路点 → SVGパス文字列 */
export function pointsToPath(pts: any): string;
/** 折れ線の中間点（全長の指定比率の位置） */
export function polylinePoint(pts: any, ratio?: number): any;
