/**
 * view={x,y,scale} と画面サイズ(px)から、可視範囲を model 座標の矩形で返す。
 * ズーム/パンを打ち消して model 座標に写す（描画の <g transform> の逆変換）。
 * @param {{x:number,y:number,scale:number}} view
 * @param {number} width  svg のクライアント幅(px)
 * @param {number} height svg のクライアント高さ(px)
 * @param {number} margin model 座標での余白（画面外に少し広げてパン時の欠けを防ぐ）
 */
export function viewportRect(view: {
    x: number;
    y: number;
    scale: number;
}, width: number, height: number, margin?: number): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/** 矩形が可視範囲に交差するか。viewRect が null/undefined なら常に可視（＝仮想化なし） */
export function rectVisible(bounds: any, viewRect: any): boolean;
/** 2つの矩形を包む外接矩形（リンクの可視判定などに使う） */
export function spanBounds(a: any, b: any): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * items のうち可視なものの id 集合を返す。
 * @param items id と矩形を持つ要素の配列
 * @param viewRect 可視範囲（null なら全可視）
 * @param boundsOf item → 矩形 の純粋関数
 * @param force 可視範囲外でも必ず含める id（Set か配列。選択中ノード等）
 */
export function visibleIdSet(items: any, viewRect: any, boundsOf: any, force: any): Set<any>;
/**
 * 前フレームと今フレームのキー集合から、入場(enter)・継続(keep)・退場(exit)を算出する。
 * 仮想化の骨格: enter を復元し、exit の <g> を DOM から除去する。
 */
export function diffKeys(prev: any, next: any): {
    enter: any[];
    keep: any[];
    exit: any[];
};
/**
 * 署名(signature)マップの比較で「再描画が必要なキー」を求める（差分描画の dirty 集合）。
 * @param prevSigs Map<id, string>（前フレームの署名）
 * @param nextSigs Map<id, string>（今フレームの署名）
 * @returns {{ added:string[], removed:string[], changed:string[], dirty:string[] }}
 *   dirty = added + changed（＝ <g> の作り直しが要るノード）
 */
export function changedKeys(prevSigs: any, nextSigs: any): {
    added: string[];
    removed: string[];
    changed: string[];
    dirty: string[];
};
