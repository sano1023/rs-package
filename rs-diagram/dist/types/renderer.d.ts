/**
 * rs-diagram Renderer 抽象 — SVGRenderer（v0.1 実装）
 *
 * ノード/リンクのプラグインとコアはこのインターフェースだけに依存する
 * （rs-chart の Renderer 抽象と同思想）。
 *
 * 注意: exportSVG() が単体で表示できるよう、描画要素の色・フォントは
 * CSSクラスではなく属性として直接与える方針（テーマ値はコアが解決して渡す）。
 */
export const SVG_NS: "http://www.w3.org/2000/svg";
export class SVGRenderer {
    constructor(container: any);
    container: any;
    svg: SVGSVGElement;
    _measurer: any;
    el(tag: any, attrs?: {}, parent?: SVGSVGElement): any;
    attr(node: any, attrs: any): any;
    /** 子要素をすべて取り除く */
    empty(node: any): void;
    group(attrs: {} | undefined, parent: any): any;
    rect(attrs: any, parent: any): any;
    circle(attrs: any, parent: any): any;
    ellipse(attrs: any, parent: any): any;
    line(attrs: any, parent: any): any;
    path(attrs: any, parent: any): any;
    polygon(attrs: any, parent: any): any;
    image(attrs: any, parent: any): any;
    text(str: any, attrs: any, parent: any): any;
    /** テキスト幅の概算（レイアウト計算用） */
    measureText(str: any, fontSize?: number): any;
    /** エクスポート用のSVG文字列 */
    toSVGString(): any;
    destroy(): void;
}
