export class Player {
    constructor(target: any, session: any, options?: {});
    target: any;
    session: any;
    events: any;
    duration: number;
    o: {
        speed: number;
        autoplay: boolean;
    };
    speed: number;
    playing: boolean;
    destroyed: boolean;
    listeners: {};
    time: number;
    idx: number;
    viewport: any;
    _buildUI(): void;
    root: any;
    stage: any;
    scaler: any;
    iframe: any;
    overlay: any;
    cursor: any;
    controls: any;
    playBtn: any;
    timeEl: any;
    timeline: any;
    timelineFill: any;
    timelineHandle: any;
    speedSel: any;
    _onPlayBtn: (() => this) | undefined;
    _onSpeedSel: (() => this) | undefined;
    _onTimelineDown: ((e: any) => void) | undefined;
    _dragging: boolean | undefined;
    _onTimelineMove: ((e: any) => void) | undefined;
    _onTimelineUp: (() => void) | undefined;
    _onKeydown: ((e: any) => void) | undefined;
    _ro: ResizeObserver | null | undefined;
    _seekToPointer(e: any): void;
    _rescale(): void;
    _reset(): void;
    map: Map<number, Node> | null | undefined;
    play(): this;
    _last: any;
    _raf: number | undefined;
    _tick: any;
    pause(): this;
    /**
     * 任意時点へシーク。過去へは「スナップショット再構築 → 差分早送り適用」。
     */
    seek(t: any): this;
    setSpeed(s: any): this;
    _onTick(now: any): void;
    _apply(ev: any, instant: any): void;
    _moveCursor(x: any, y: any, instant: any): void;
    _ripple(x: any, y: any): void;
    _updateUI(): void;
    on(name: any, fn: any): this;
    off(name: any, fn: any): this;
    emit(name: any, ...args: any[]): void;
    destroy(): void;
}
