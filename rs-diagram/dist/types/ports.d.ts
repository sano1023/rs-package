/** position を 0..1 の割合 {x,y} に正規化する */
export function portFraction(position: any): any;
/** 割合から最も近い辺名（直交ルーティングの出入り辺に使う） */
export function fractionSide(frac: any): "right" | "left" | "bottom" | "top";
/** ノードの指定ポートの model 座標。無ければ null */
export function portPoint(node: any, portId: any): {
    x: any;
    y: any;
} | null;
/** ノードの全ポートを解決した配列 [{ id, x, y, side, frac }]（model 座標） */
export function resolvePorts(node: any): any;
/** リンク端点参照 { node, port } からポートIDを取り出す（無ければ null） */
export function portIdOf(ref: any): string | null;
