export class SVGRenderer {
    constructor(container: any);
    container: any;
    svg: SVGSVGElement;
    _measurer: any;
    size(width: any, height: any): void;
    width: any;
    height: any;
    clear(): void;
    el(tag: any, attrs?: {}, parent?: SVGSVGElement): any;
    attr(node: any, attrs: any): any;
    group(attrs: {} | undefined, parent: any): any;
    rect(attrs: any, parent: any): any;
    circle(attrs: any, parent: any): any;
    line(attrs: any, parent: any): any;
    path(attrs: any, parent: any): any;
    text(str: any, attrs: any, parent: any): any;
    /** テキスト幅の概算（レイアウト計算用） */
    measureText(str: any, fontSize?: number): any;
    /** シリーズ層のクリップ適用（chart側で defs に #rsc-clip-* を用意済み） */
    applyClip(group: any, rect: any, id: any): void;
    endClip(): void;
    /** エクスポート用のSVG文字列 */
    toSVGString(): any;
    destroy(): void;
}
