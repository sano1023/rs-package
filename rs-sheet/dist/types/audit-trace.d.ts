/**
 * セル id が参照している参照元（precedents）。単一セルと範囲を分けて返す。
 * @param {import('./depgraph.js').DependencyGraph} graph
 * @param {string} id  cellId
 * @returns {{cells: Array, ranges: Array}}
 */
export function precedentsOf(graph: import("./depgraph.js").DependencyGraph, id: string): {
    cells: any[];
    ranges: any[];
};
/**
 * 座標 (sheet,row,col) を参照している参照先（dependents）の数式セル群。
 * 単一参照の逆引きに加え、範囲購読（SUM(A1:A10) 等）で当該セルを含むものも拾う。
 * @returns {Array}
 */
export function dependentsOf(graph: any, sheet: any, row: any, col: any): any[];
/**
 * セルの完全なトレース（参照元 + 参照先）。UI・検証はこれ1本で足りる。
 * @returns {{target, precedents:{cells,ranges}, dependents:Array}}
 */
export function traceCell(graph: any, sheet: any, row: any, col: any): {
    target: any;
    precedents: {
        cells: any;
        ranges: any;
    };
    dependents: any[];
};
/**
 * 2つのピクセル矩形（body 相対 {x,y,w,h}）の中心を結ぶ矢印セグメント。
 * from → to。純粋な幾何なので描画層と分離してテストできる。
 */
export function arrowBetween(fromRect: any, toRect: any): {
    x1: any;
    y1: any;
    x2: any;
    y2: any;
};
