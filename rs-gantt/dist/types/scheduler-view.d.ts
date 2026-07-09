/** リソース行の高さ（段数から） */
export function rowHeightForLanes(laneCount: any): number;
/**
 * スケジューラの時刻スケール（分シリアル値 ⇔ px）。
 * 1日は営業時間ウィンドウ [winStart, winEnd]（当日分）ぶんだけを描くため、横幅が有界になる。
 */
export class SchedulerScale {
    /**
     * @param {number} dayStart 表示開始日（日シリアル値）
     * @param {number} dayEnd 表示終了日（日シリアル値・含む）
     * @param {{winStart?:number, winEnd?:number, pxPerMin?:number, slotMinutes?:number}} [opt]
     */
    constructor(dayStart: number, dayEnd: number, opt?: {
        winStart?: number;
        winEnd?: number;
        pxPerMin?: number;
        slotMinutes?: number;
    });
    dayStart: number;
    dayEnd: number;
    winStart: number;
    winEnd: number;
    pxPerMin: number;
    slotMinutes: number;
    dayCount: number;
    winMinutes: number;
    dayWidth: number;
    get width(): number;
    /** 分シリアル値 → x座標(px)。ウィンドウ外はウィンドウ端へクランプ */
    x(minSerial: any): number;
    /** x座標(px) → 分シリアル値（ウィンドウ内にクランプ） */
    timeAt(px: any): number;
    /** 分シリアル値を step 分刻みに丸める（当日分基準） */
    snap(minSerial: any, step: any): number;
    /** 2段ヘッダー（top=日, bottom=時刻スロット）のセル */
    headerCells(calendar: any): {
        top: {
            x: number;
            w: number;
            label: string;
            serial: number;
            nonwork: boolean;
            y: number;
        }[];
        bottom: {
            x: number;
            w: number;
            label: string;
            serial: number;
            minute: number;
            nonwork: boolean;
        }[];
    };
}
export class SchedulerView {
    constructor(gantt: any);
    gantt: any;
    scale: SchedulerScale | null;
    _rowBounds: any[];
    _blocks: Map<any, any>;
    el: HTMLDivElement;
    headEl: HTMLDivElement;
    cornerEl: HTMLDivElement;
    headScrollEl: HTMLDivElement;
    timeHeadEl: HTMLDivElement;
    thDaysEl: HTMLDivElement;
    thSlotsEl: HTMLDivElement;
    bodyEl: HTMLDivElement;
    labelsEl: HTMLDivElement;
    labelsInnerEl: HTMLDivElement;
    scrollEl: HTMLDivElement;
    gridEl: HTMLDivElement;
    bgEl: HTMLDivElement;
    eventsEl: HTMLDivElement;
    _onScroll: () => void;
    _drag: SchedulerDrag;
    _blockId(el: any): any;
    show(): void;
    hide(): void;
    /** 表示するイベントの分シリアル値レンジからスケールを作る */
    _makeScale(): SchedulerScale;
    render(): void;
    _layout: {
        byResource: Array<{
            id: any;
            laneCount: number;
            placements: Array<{
                event: any;
                lane: number;
            }>;
        }>;
        unresourced: Array<{
            event: any;
            lane: number;
        }>;
        maxLanes: number;
    } | undefined;
    renderHeader(): void;
    renderLabels(): void;
    /** 非稼働日の網掛け・日/スロットの縦罫線・リソース行の横罫線 */
    renderBackground(totalH: any): void;
    renderEvents(): void;
    _makeBlock(ev: any, bounds: any, lane: any): HTMLDivElement;
    /** py（grid 座標）からリソースIDを返す */
    resourceAtY(py: any): any;
    updateSelection(): void;
    destroy(): void;
}
/**
 * スケジューラのイベントドラッグ（Pointer Events）。
 * move = リソース間移動 + 時間変更 / resize-r = 終了時刻の変更。確定で updateEvent → eventDrop 発火。
 */
declare class SchedulerDrag {
    constructor(view: any);
    view: any;
    g: any;
    state: {
        mode: string;
        id: any;
        block: any;
        orig: {
            start: any;
            end: any;
            resource: any;
        };
        grabDX: number;
        startX: any;
        startY: any;
        preview: null;
        moved: boolean;
        raf: number;
        lastEvent: null;
    } | null;
    suppressClick: boolean;
    _onDown: (e: any) => void;
    _onMove: (e: any) => void;
    _onUp: (e: any) => void;
    _onKey: (e: any) => void;
    onDown(e: any): void;
    onMove(e: any): void;
    _begin(): void;
    ghost: HTMLDivElement | null | undefined;
    tip: HTMLDivElement | null | undefined;
    _update(e: any): void;
    _placeGhost(start: any, end: any, rb: any): void;
    _tip(e: any, text: any): void;
    onUp(): void;
    cancel(): void;
    _teardown(): void;
    destroy(): void;
}
export {};
