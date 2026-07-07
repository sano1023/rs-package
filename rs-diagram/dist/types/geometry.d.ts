/**
 * rs-diagram 幾何計算（純粋関数層）
 *
 * DOMに依存しない。ブラウザ以前に node 単体でテストできること。
 * スナップ・アンカー算出・境界交点・矩形判定・整列ガイドラインを提供する。
 */
/** 値をグリッドに吸着させる */
export function snapValue(v: any, size: any): any;
/** 点をグリッドに吸着させる */
export function snapPoint(p: any, size: any): {
    x: any;
    y: any;
};
/** ノードの外接矩形（model座標） */
export function nodeBounds(node: any): {
    x: any;
    y: any;
    width: any;
    height: any;
};
/** 矩形の中心点 */
export function boundsCenter(b: any): {
    x: any;
    y: any;
};
/** 外接矩形上のアンカー座標（top/right/bottom/left/center） */
export function anchorPoint(b: any, anchor: any): {
    x: any;
    y: any;
};
/**
 * 中心から toward へ向かう半直線と形状境界の交点。
 * shape: 'rect' | 'ellipse' | 'diamond'（ノードタイプの def.shape）
 */
export function boundaryPoint(b: any, shape: any, toward: any): {
    x: any;
    y: any;
};
/** 点が矩形内にあるか */
export function pointInBounds(p: any, b: any): boolean;
/** 2つの矩形が交差するか */
export function rectsIntersect(a: any, b: any): boolean;
/** 2点から正規化した矩形を作る */
export function normalizeRect(x0: any, y0: any, x1: any, y1: any): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/** ノード群の外接矩形（パディング付き）。空なら null */
export function contentBounds(nodes: any, padding?: number): {
    x: number;
    y: number;
    width: number;
    height: number;
} | null;
/**
 * 整列ガイドライン。
 * moving（ドラッグ中ノードの矩形）を others の端/中心へ threshold 以内なら吸着させる。
 * @returns {{ dx, dy, vertical: [{x,y1,y2}], horizontal: [{y,x1,x2}] }}
 *   dx/dy は吸着のための補正量。vertical/horizontal は補正後に一致するガイド線。
 */
export function alignmentGuides(moving: any, others: any, threshold?: number): {
    dx: any;
    dy: any;
    vertical: [{
        x: any;
        y1: any;
        y2: any;
    }];
    horizontal: [{
        y: any;
        x1: any;
        x2: any;
    }];
};
export namespace ANCHOR_DIRS {
    namespace top {
        let x: number;
        let y: number;
    }
    namespace right {
        let x_1: number;
        export { x_1 as x };
        let y_1: number;
        export { y_1 as y };
    }
    namespace bottom {
        let x_2: number;
        export { x_2 as x };
        let y_2: number;
        export { y_2 as y };
    }
    namespace left {
        let x_3: number;
        export { x_3 as x };
        let y_3: number;
        export { y_3 as y };
    }
}
