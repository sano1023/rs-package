/**
 * 線形スケール。min/max を「きりのいい」目盛りに拡張する。
 * range: [px0, px1]（yなら [bottom, top] の順で渡すと上向きになる）
 */
export function linearScale({ min, max, range, tickCount, nice, includeZero }: {
    min: any;
    max: any;
    range: any;
    tickCount?: number | undefined;
    nice?: boolean | undefined;
    includeZero?: boolean | undefined;
}): {
    kind: string;
    min: any;
    max: any;
    ticks: number[];
    scale: (v: any) => any;
    invert: (px: any) => any;
    format: (v: any) => any;
};
/** カテゴリスケール（バンド）。scale(i) はバンド中央を返す。from/to でズーム範囲を指定できる */
export function categoryScale({ categories, range, from, to }: {
    categories: any;
    range: any;
    from?: number | undefined;
    to?: number | undefined;
}): {
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
/** 時間スケール。単位に応じた「区切りのいい」目盛りを打つ */
export function timeScale({ min, max, range, tickCount }: {
    min: any;
    max: any;
    range: any;
    tickCount?: number | undefined;
}): {
    kind: string;
    min: any;
    max: any;
    ticks: number[];
    scale: (v: any) => any;
    invert: (px: any) => any;
    format: (t: any) => string;
};
/** 目盛り・ツールチップ用の数値フォーマット */
export function formatNumber(v: any): any;
/** x値の正規化: Date / ISO文字列 / 数値 → 数値 */
export function toTimestamp(x: any): number | null;
