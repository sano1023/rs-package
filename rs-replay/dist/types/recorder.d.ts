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
        recordCanvas: boolean;
        recordConsoleErrors: boolean;
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
    _observers: any[];
    _roots: Set<any>;
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
        recordCanvas: boolean;
        onSubRoot: (root: any) => void;
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
    /**
     * カスタムイベントを記録する（v0.2・タイムラインにマーカーとして表示される）。
     * data は利用側が JSON化可能な値を渡す責務を持つ（生値マスクの対象外）。
     * @param {string} name イベント名
     * @param {*} [data] 付随データ
     */
    addEvent(name: string, data?: any): this;
    /**
     * セッションを gzip 圧縮した Uint8Array を返す（v0.2）。
     * CompressionStream 非対応環境では非圧縮のUTF-8バイト列（先頭マジックで自動判別）。
     * @returns {Promise<Uint8Array>}
     */
    getCompressedSession(): Promise<Uint8Array>;
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
    /** rAF でまとめて Mutation をシリアライズするようスケジュールする */
    _scheduleFlush(): void;
    _installMutationObserver(): void;
    /**
     * ルート（document / ShadowRoot / iframeのdocument）に MutationObserver を張る（v0.2）。
     * subtree はシャドウ境界・iframe境界を越えないため、境界ごとに別 observer が要る。
     */
    _observeRoot(root: any): void;
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
    /** console.error をフックしてマーカー用に記録する（本来の出力はそのまま通す・v0.2） */
    _installConsoleHook(): void;
    _origConsoleError: any;
    _teardown(): void;
}
