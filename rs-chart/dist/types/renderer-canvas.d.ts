/**
 * CanvasRenderer — Renderer インターフェースの Canvas 実装（v0.4・Turbo mode）
 *
 * SVGRenderer と同じ呼び出し（group/rect/circle/line/path/text/measureText/size/clear）を
 * 即時描画（イミディエイトモード）で実装する。数十万点の折れ線・散布図など、
 * SVGのDOMコストが支配的になる大量データ用途向け。
 *
 * 構成: base（軸・シリーズ等）と hover（ツールチップマーカー・クロスヘア）の2層キャンバス。
 * hover 層はマウス移動のたびに単独でクリアできるため、本体の再描画が不要。
 *
 * 制約:
 * - 要素単位のイベント（pie/funnel/treemap のスライス直付けリスナー、凡例クリック）は無効
 *   （チャートレベルのヒットテストによるツールチップ・pointClick は動く）
 * - path の 'A'（円弧）は未対応 → 円系タイプは SVG レンダラを使うこと
 * - getSVG() は空文字を返す（PNGエクスポートは可能）
 */
export class CanvasRenderer {
    constructor(container: any);
    container: any;
    isCanvas: boolean;
    base: any;
    overlay: any;
    svg: any;
    ctx: any;
    hoverCtx: any;
    _dpr: any;
    _clipDepth: number;
    size(width: any, height: any): void;
    width: any;
    height: any;
    clear(): void;
    clearHover(): void;
    layerOf(parent: any): any;
    ctxOf(parent: any): any;
    group(attrs: {} | undefined, parent: any): {
        _isGroup: boolean;
        _parent: any;
        _layer: string | null;
        setAttribute(): void;
        appendChild(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        querySelectorAll(): never[];
    };
    /** el() 互換: defs/clipPath 等は無視し、図形はタグ別メソッドへ委譲 */
    el(tag: any, attrs: {} | undefined, parent: any): {
        _isGroup: boolean;
        _parent: any;
        _layer: string | null;
        setAttribute(): void;
        appendChild(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        querySelectorAll(): never[];
    } | {
        setAttribute(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        getTotalLength(): number;
    };
    stub(): {
        setAttribute(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        getTotalLength(): number;
    };
    applyCommon(ctx: any, attrs: any): void;
    fillStroke(ctx: any, attrs: any, fillAlpha: any): void;
    rect(attrs: any, parent: any): {
        setAttribute(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        getTotalLength(): number;
    };
    circle(attrs: any, parent: any): {
        setAttribute(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        getTotalLength(): number;
    };
    line(attrs: any, parent: any): {
        setAttribute(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        getTotalLength(): number;
    };
    /** d 属性のうち M / L / Z を解釈する（大量データ用の折れ線・エリアには十分） */
    path(attrs: any, parent: any): {
        setAttribute(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        getTotalLength(): number;
    };
    polygon(attrs: any, parent: any): {
        setAttribute(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        getTotalLength(): number;
    };
    text(str: any, attrs: any, parent: any): {
        setAttribute(): void;
        remove(): void;
        addEventListener(): void;
        removeEventListener(): void;
        getTotalLength(): number;
    };
    measureText(str: any, fontSize?: number): any;
    applyClip(group: any, rect: any): void;
    endClip(): void;
    _resetClip(): void;
    toSVGString(): string;
    /** PNGエクスポート用に base層の canvas を返す */
    toCanvas(): any;
    destroy(): void;
}
