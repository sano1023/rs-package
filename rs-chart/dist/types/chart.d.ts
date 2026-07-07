export const DEFAULT_COLORS: string[];
export class Chart {
    constructor(target: any, options: any, registry: any);
    target: any;
    registry: Map<any, any>;
    listeners: {};
    destroyed: boolean;
    wrapper: any;
    _uid: number;
    zoomRange: any;
    _drag: {
        mode: string;
        startX: number;
        startW: {
            x0: any;
            x1: any;
        };
        startRange?: undefined;
    } | {
        mode: string;
        startX: number;
        startRange: any;
        startW?: undefined;
    } | {
        mode: string;
        startX: number;
        startW?: undefined;
        startRange?: undefined;
    } | null;
    renderer: SVGRenderer | CanvasRenderer;
    tooltip: Tooltip;
    options: {};
    _onMove: (e: any) => void;
    _onLeave: () => void;
    _onClick: (e: any) => void;
    _onDown: (e: any) => void;
    _onUp: (e: any) => void;
    _ro: ResizeObserver;
    _roRaf: any;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    setOptions(options: any): void;
    typeDef(name: any): any;
    normalizeSeries(): void;
    xType: any;
    series: any;
    isPolar: any;
    resolveXType(): any;
    resolveTheme(): {
        fontFamily: any;
        fontSize: number;
        textColor: any;
        mutedColor: any;
        titleColor: any;
        axisColor: any;
        gridColor: any;
    };
    render(progress?: number): void;
    _lastWidth: any;
    theme: {
        fontFamily: any;
        fontSize: number;
        textColor: any;
        mutedColor: any;
        titleColor: any;
        axisColor: any;
        gridColor: any;
    } | undefined;
    hits: any[] | undefined;
    plot: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | {
        x: number;
        y: any;
        width: number;
        height: number;
    } | undefined;
    renderCartesian(visible: any, width: any, height: any, top: any, legendLayout: any, theme: any, progress: any): void;
    stacks: Map<any, any> | null | undefined;
    yScale: {
        kind: string;
        min: any;
        max: any;
        ticks: number[];
        scale: (v: any) => any;
        invert: (px: any) => any;
        format: (v: any) => any;
    } | {
        kind: string;
        categories: any;
        band: number;
        from: number;
        to: number;
        ticks: any;
        scale: (i: any) => any;
        bandStart: (i: any) => any;
        inDomain: (i: any) => boolean;
        invert: (px: any) => number;
        format: (i: any) => string;
    } | undefined;
    xScale: {
        kind: string;
        min: any;
        max: any;
        ticks: number[];
        scale: (v: any) => any;
        invert: (px: any) => any;
        format: (v: any) => any;
    } | {
        kind: string;
        categories: any;
        band: number;
        from: number;
        to: number;
        ticks: any;
        scale: (i: any) => any;
        bandStart: (i: any) => any;
        inDomain: (i: any) => boolean;
        invert: (px: any) => number;
        format: (i: any) => string;
    } | undefined;
    yScales: ({
        kind: string;
        min: any;
        max: any;
        ticks: number[];
        scale: (v: any) => any;
        invert: (px: any) => any;
        format: (v: any) => any;
    } | {
        kind: string;
        categories: any;
        band: number;
        from: number;
        to: number;
        ticks: any;
        scale: (i: any) => any;
        bandStart: (i: any) => any;
        inDomain: (i: any) => boolean;
        invert: (px: any) => number;
        format: (i: any) => string;
    })[] | undefined;
    horizontal: any;
    _nav: {
        area: any;
        navX: {
            kind: string;
            min: any;
            max: any;
            ticks: number[];
            scale: (v: any) => any;
            invert: (px: any) => any;
            format: (v: any) => any;
        } | {
            kind: string;
            categories: any;
            band: number;
            from: number;
            to: number;
            ticks: any;
            scale: (i: any) => any;
            bandStart: (i: any) => any;
            inDomain: (i: any) => boolean;
            invert: (px: any) => number;
            format: (i: any) => string;
        };
        wx0: any;
        wx1: any;
    } | null | undefined;
    /** 全期間のミニチャート + 現在のズーム窓。ドラッグで移動、両端ハンドルでリサイズ */
    drawNavigator(area: any, visible: any, theme: any): void;
    /** レンジセレクタ（1M/3M/…）のHTMLボタン群 */
    updateRangeSelector(): void;
    _rangeEl: any;
    applyRangePreset(preset: any): void;
    _activePreset: any;
    /**
     * シリーズにデータ点を追記する。
     * @param {number} seriesIndex
     * @param {*} point series.data と同じ形式
     * @param {object} opts { shift: true } で先頭を捨てる（固定長ストリーミング）
     */
    append(seriesIndex: number, point: any, { shift }?: object): void;
    /** 大量データの間引き（LTTB）。linear/time軸の line/area/scatter が対象 */
    samplePoints(s: any): any;
    isZoomAtRight(): boolean;
    /** アノテーション（lineY / bandY / lineX） */
    drawAnnotations(plot: any, xScale: any, yScale: any, theme: any): void;
    buildXScale(visible: any, categories: any, plot: any): {
        kind: string;
        min: any;
        max: any;
        ticks: number[];
        scale: (v: any) => any;
        invert: (px: any) => any;
        format: (v: any) => any;
    } | {
        kind: string;
        categories: any;
        band: number;
        from: number;
        to: number;
        ticks: any;
        scale: (i: any) => any;
        bandStart: (i: any) => any;
        inDomain: (i: any) => boolean;
        invert: (px: any) => number;
        format: (i: any) => string;
    };
    _fullX: {
        from: number;
        to: number;
        min?: undefined;
        max?: undefined;
    } | {
        min: number;
        max: number;
        from?: undefined;
        to?: undefined;
    } | undefined;
    resolveCategories(visible: any): any;
    /** シリーズ描画レイヤ（アニメーションフレームごとに再描画される部分） */
    drawSeriesLayer(visible: any, plot: any, xScale: any, yScale: any, progress: any, horizontal?: boolean): void;
    seriesGroup: any;
    hoverGroup: any;
    animate(): void;
    /** 円系タイプの凡例モード: 'points'（pie等）/ 'series'（radar等）/ 'none'（gauge等） */
    polarLegendMode(): any;
    legendItems(): any;
    toggleLegend(index: any): void;
    _visibility: any;
    /** ズーム対象か（cartesian・非横棒・zoom有効） */
    zoomEnabled(): false | {
        x: number;
        y: number;
        width: number;
        height: number;
    } | {
        x: number;
        y: any;
        width: number;
        height: number;
    } | undefined;
    handleDown(e: any): void;
    /** ナビゲータ窓のパン（スパンを厳密に維持する） */
    applyNavPan(px0: any, px1: any): void;
    /** ナビゲータ窓（ピクセル座標）→ zoomRange 反映 */
    applyNavWindow(px0: any, px1: any): void;
    handleUp(e: any): void;
    _zoomRect: any;
    handlePan(mx: any): void;
    handleMove(e: any): void;
    _hovered: any[] | null | undefined;
    findHits(mx: any, my: any): any[];
    drawHoverMarkers(found: any, my: any): void;
    /** ズーム中のリセットボタン表示を同期する（レンジセレクタがあれば「全期間」が兼ねる） */
    updateZoomButton(): void;
    _zoomBtn: any;
    handleLeave(silent?: boolean): void;
    handleClick(e: any): void;
    update(partial: any): void;
    setSeries(series: any): void;
    /** ズームをプログラム側から設定する（連動用・zoomイベントは発火しない） */
    setZoom(range: any): void;
    /** 指定x値の位置にホバー表示を出す（連動用・hoverイベントは発火しない） */
    hoverAt(xValue: any): void;
    getSVG(): any;
    exportPNG(filename?: string): Promise<any>;
    destroy(): void;
}
import { SVGRenderer } from './renderer.js';
import { CanvasRenderer } from './renderer-canvas.js';
import { Tooltip } from './tooltip.js';
import { escapeHTML } from './tooltip.js';
import { formatNumber } from './scale.js';
export { escapeHTML, formatNumber };
