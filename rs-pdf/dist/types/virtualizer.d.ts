/**
 * rs-pdf ページ仮想化（DOM非依存の純粋関数群）
 *
 * 全ページ分のプレースホルダ配置・可視範囲の計算・canvasプールを担当する。
 * 描画（DOM）から独立しているので node:test で単体テストできる。
 * 座標系: CSSピクセル・縦連続スクロール・上端原点。
 */
/** 回転角を 0 / 90 / 180 / 270 に正規化する */
export function normalizeRotation(deg: any): number;
/** 回転後のページ寸法（90/270度で縦横が入れ替わる） */
export function rotatedSize(size: any, rotation: any): {
    width: any;
    height: any;
};
/**
 * 全ページのプレースホルダ配置を計算する（縦連続スクロール・水平中央寄せ）。
 * @param {Array<{width,height}>} sizes ページ寸法（PDFポイント・回転0度時）
 * @param {object} opts { zoom, rotation, gap, containerWidth }
 * @returns {{ pages: Array<{top,left,width,height}>, totalWidth, totalHeight, gap }}
 */
export function layoutPages(sizes: Array<{
    width: any;
    height: any;
}>, { zoom, rotation, gap, containerWidth }?: object): {
    pages: Array<{
        top: any;
        left: any;
        width: any;
        height: any;
    }>;
    totalWidth: any;
    totalHeight: any;
    gap: any;
};
/**
 * ビューポートに一部でも見えているページ範囲（0始まり・両端含む）。
 * ページが1枚も無いときは null。
 */
export function visibleRange(layout: any, scrollTop: any, viewportHeight: any): {
    first: number;
    last: number;
} | null;
/**
 * レンダ対象のページ番号（0始まり）配列 = 可視範囲 ± buffer 枚（範囲内にクランプ）。
 */
export function pagesToRender(layout: any, scrollTop: any, viewportHeight: any, buffer?: number): number[];
/**
 * 縦オフセット位置にあるページ（0始まり）。「現在ページ」の判定に使う。
 * ページ間の隙間は前後半分ずつ隣のページに属するとみなす。
 */
export function pageAtOffset(layout: any, offset: any): number;
/**
 * ページ内の矩形（PDFポイント・左上原点・回転0度時の座標）を、
 * 回転・ズーム適用後のページラッパー内CSS座標へ変換する。
 * 検索ヒットへのスクロール位置計算などに使う。
 * @param {{x,y,w,h}} rect PDFポイントの矩形
 * @param {{width,height}} size ページ寸法（PDFポイント・回転0度時）
 */
export function rectToWrapper(rect: {
    x: any;
    y: any;
    w: any;
    h: any;
}, size: {
    width: any;
    height: any;
}, rotation: any, zoom: any): {
    x: number;
    y: number;
    w: number;
    h: number;
};
/**
 * canvas プール。範囲外になったページの canvas を返却して再利用する。
 * 上限を超えた分は width/height を 0 にしてバッキングストアを即時解放する。
 * createCanvas を注入するので DOM 無しでもテストできる。
 */
export class CanvasPool {
    constructor(createCanvas: any, max?: number);
    createCanvas: any;
    max: number;
    free: any[];
    /** プールから1枚取り出す（空なら新規作成） */
    acquire(): any;
    /** 使い終わった canvas を返却する（上限超過分は解放して捨てる） */
    release(canvas: any): void;
    /** 保持している canvas をすべて解放する */
    drain(): void;
    get size(): number;
}
