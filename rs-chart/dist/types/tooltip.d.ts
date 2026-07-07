export function escapeHTML(v: any): string;
/**
 * rs-chart ツールチップ（HTMLオーバーレイ）
 */
export class Tooltip {
    constructor(wrapper: any);
    wrapper: any;
    el: any;
    /** points: [{seriesName, color, label, value}] */
    show(title: any, points: any, x: any, y: any): void;
    /** カスタムフォーマッタ用: HTMLをそのまま出す（エスケープは呼び出し側の責務） */
    showHTML(html: any, x: any, y: any): void;
    position(x: any, y: any): void;
    hide(): void;
    destroy(): void;
}
