export class Recorder {
    constructor(options?: {});
    o: {
        maskSelector: string;
        ignoreSelector: string;
        chunkInterval: number;
        chunkEvents: number;
        maxBufferedEvents: number;
        moveThrottle: number;
        scrollThrottle: number;
        compress: string;
        keepSession: boolean;
        onChunk: null;
    };
    win: any;
    doc: any;
    reader: {
        selector: string;
        masked(el: any): boolean;
        value(el: any): string;
        select(el: any): number;
        text(node: any): string;
        attr(el: any, name: any, raw: any): any;
    };
    reg: {
        map: WeakMap<object, any>;
        next: number;
    };
    listeners: {};
    recording: boolean;
    destroyed: boolean;
    session: {
        version: number;
        meta: {
            startedAt: number;
            url: any;
            viewport: {
                w: any;
                h: any;
            };
            userAgent: any;
        };
        snapshot: {
            node: object;
        };
        events: never[];
    } | null;
    sessionId: string;
    _chunkBuf: any[];
    _seq: number;
    _pendingRecs: any[];
    _rafId: number;
    _moveTimer: number;
    _scrollTimer: number;
    _resizeTimer: number;
    _mv1: any;
    _mv2: any;
    _boundListeners: any[];
    on(name: any, fn: any): this;
    off(name: any, fn: any): this;
    emit(name: any, ...args: any[]): void;
    start(): this;
    _startedAt: number | undefined;
    _t0: any;
    _ctx: {
        reader: {
            selector: string;
            masked(el: any): boolean;
            value(el: any): string;
            select(el: any): number;
            text(node: any): string;
            attr(el: any, name: any, raw: any): any;
        };
        reg: {
            map: WeakMap<object, any>;
            next: number;
        };
        ignore: (el: any) => boolean;
    } | undefined;
    _inIgnored: ((node: any) => boolean) | undefined;
    _chunkTimer: any;
    stop(): this;
    destroy(): void;
    /** その場再生用のセッションJSON（進行中でも保留分を反映して返す） */
    getSession(): {
        version: number;
        meta: {
            duration: any;
            startedAt: number;
            url: any;
            viewport: {
                w: any;
                h: any;
            };
            userAgent: any;
        };
        snapshot: {
            node: object;
        };
        events: any[];
    };
    _now(): number;
    /** イベントを追記する。生値を含むデータをここに渡してはならない（reader経由のみ） */
    _push(type: any, data: any): {
        t: number;
        type: any;
        data: any;
    } | null;
    _flushChunk(): void;
    /** rAF待ち・スロットル待ちの記録をすべて確定させる */
    _drainPending(): void;
    _movePending: {
        x: any;
        y: any;
    } | null | undefined;
    _installMutationObserver(): void;
    _mo: any;
    _flushMutations(): void;
    _listen(target: any, name: any, fn: any, opts: any): void;
    _installInteractionListeners(): void;
    _lastMoveTs: any;
    _scrollPending: Map<any, any> | undefined;
    _pushMove(x: any, y: any): void;
    _flushScroll(): void;
    _installRouteHooks(): void;
    _origPushState: any;
    _origReplaceState: any;
    _onPop: (() => void) | undefined;
    _pushRoute(kind: any): void;
    _teardown(): void;
}
