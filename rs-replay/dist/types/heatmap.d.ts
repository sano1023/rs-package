/** セッション入力を正規化する（単体/配列/JSON文字列を許容し、形の妥当なものだけ返す） */
export function normalizeSessions(input: any): any[];
/**
 * クリックを要素単位で集計する（複数セッション合成）。
 * 各要素は snapshot の rsid → 正規化セレクタで束ね、セッションをまたいで count を加算する。
 * セレクタが取れないクリック（id=0 等）は座標グリッドで束ねる。
 * @returns {{type, elements, total, max, sessionCount, viewport}}
 */
export function aggregateClicks(sessions: any, options?: {}): {
    type: any;
    elements: any;
    total: any;
    max: any;
    sessionCount: any;
    viewport: any;
};
/**
 * マウスムーブを位置グリッドで集計する（複数セッション合成）。
 * ムーブイベントは要素idを持たないため、cell(px)角のグリッドで密度を合算する。
 * @returns {{type, cells, total, max, cell, sessionCount, viewport}}
 */
export function aggregateMoves(sessions: any, options?: {}): {
    type: any;
    cells: any;
    total: any;
    max: any;
    cell: any;
    sessionCount: any;
    viewport: any;
};
/**
 * スクロール深度（到達率）を集計する（複数セッション合成）。
 * 各セッションの window スクロールの最深到達（scrollY + ビューポート高）を求め、
 * 0〜最大深度を bands 本の帯に分けて「その帯の底まで到達したセッションの割合」を出す。
 * @returns {{type, bands, maxDepth, sessionCount, reaches, viewport}}
 */
export function aggregateScroll(sessions: any, options?: {}): {
    type: any;
    bands: any;
    maxDepth: any;
    sessionCount: any;
    reaches: any;
    viewport: any;
};
/** 種別に応じて集計を振り分ける */
export function aggregate(sessions: any, type?: string, options?: {}): {
    type: any;
    elements: any;
    total: any;
    max: any;
    sessionCount: any;
    viewport: any;
} | {
    type: any;
    cells: any;
    total: any;
    max: any;
    cell: any;
    sessionCount: any;
    viewport: any;
} | {
    type: any;
    bands: any;
    maxDepth: any;
    sessionCount: any;
    reaches: any;
    viewport: any;
};
/** t（0..1）→ [r,g,b]。ヒートのカラーマップ */
export function heatColor(t: any): any;
/** 凡例バー用の CSS linear-gradient 文字列を作る（heatColor と同じ配色） */
export function heatGradientCss(): string;
export class Heatmap {
    constructor(target: any, sessions: any, options?: {});
    el: any;
    sessions: any[];
    o: {
        type: string;
        intensity: number;
        radius: any;
        opacity: any;
        showControls: boolean;
        showLegend: boolean;
        lookupRoot: any;
    };
    destroyed: boolean;
    listeners: {};
    _agg: {
        type: any;
        elements: any;
        total: any;
        max: any;
        sessionCount: any;
        viewport: any;
    } | {
        type: any;
        cells: any;
        total: any;
        max: any;
        cell: any;
        sessionCount: any;
        viewport: any;
    } | {
        type: any;
        bands: any;
        maxDepth: any;
        sessionCount: any;
        reaches: any;
        viewport: any;
    } | null;
    _ro: any;
    _buildUI(): void;
    _prevPos: any;
    overlay: any;
    canvas: any;
    _buildControls(doc: any): void;
    _typeBtns: {} | undefined;
    _range: any;
    legend: any;
    _legendCap: any;
    _updateLegendCaption(): void;
    /** ヒートマップ種別を切り替える（'click'|'move'|'scroll'）。集計しなおして再描画する */
    setType(type: any): this;
    /** 強度（見た目の濃さ）を変える。集計は変えずに再描画のみ */
    setIntensity(v: any): this;
    /** セッションを差し替えて再集計・再描画する */
    setSessions(sessions: any): this;
    /** 現在の集計結果（デバッグ・テスト用） */
    getAggregate(): {
        type: any;
        elements: any;
        total: any;
        max: any;
        sessionCount: any;
        viewport: any;
    } | {
        type: any;
        cells: any;
        total: any;
        max: any;
        cell: any;
        sessionCount: any;
        viewport: any;
    } | {
        type: any;
        bands: any;
        maxDepth: any;
        sessionCount: any;
        reaches: any;
        viewport: any;
    } | null;
    _render(): void;
    /** クリック集計 → 描画点。安定セレクタでライブ要素を引き当て、その中心へ配置する */
    _clickPoints(agg: any): {
        x: number | undefined;
        y: number | undefined;
        weight: number;
    }[];
    /** ムーブ集計 → 描画点（グリッドセル中心を el ローカル座標へ） */
    _movePoints(agg: any): {
        x: number;
        y: number;
        weight: number;
    }[];
    /** 点群を「濃度→カラーマップ」方式で描く（重なりは加算合成で濃くなる） */
    _renderPoints(ctx: any, w: any, h: any, points: any): void;
    /** スクロール深度 → 横帯を到達率で塗る */
    _renderScroll(ctx: any, w: any, h: any, agg: any): void;
    on(name: any, fn: any): this;
    off(name: any, fn: any): this;
    emit(name: any, ...args: any[]): void;
    destroy(): void;
}
