/** from の中心から見て to がある側（right/left/bottom/top） */
export function autoSide(from: any, to: any): "right" | "left" | "bottom" | "top";
/** 重複点・一直線上の中間点を除去する */
export function simplifyPoints(pts: any): {
    x: any;
    y: any;
}[];
/** 直線リンク: 形状境界から形状境界へ1本の線分 */
export function routeStraight({ source, target }: {
    source: any;
    target: any;
}): {
    x: any;
    y: any;
}[];
/**
 * 直交リンク: 水平・垂直セグメントのみの折れ線。
 * アンカー未指定なら相手側を向く辺を自動選択する。障害物回避は v0.2。
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
/** 経路点 → SVGパス文字列 */
export function pointsToPath(pts: any): string;
/** 折れ線の中間点（全長の指定比率の位置） */
export function polylinePoint(pts: any, ratio?: number): any;
