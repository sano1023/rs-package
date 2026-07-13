export class Gestures {
    /**
     * @param {HTMLElement} el ステージ要素
     * @param {object} opts
     * @param {() => { scale: number }} opts.getState 現在の zoom 状態
     * @param {() => { swipeToClose: boolean }} opts.getOptions
     * @param {() => number} opts.now 単調増加のタイムスタンプ供給（テスト差し替え可）
     * @param {object} opts.handlers
     */
    constructor(el: HTMLElement, { getState, getOptions, now, handlers }: {
        getState: () => {
            scale: number;
        };
        getOptions: () => {
            swipeToClose: boolean;
        };
        now: () => number;
        handlers: object;
    });
    el: HTMLElement;
    getState: () => {
        scale: number;
    };
    getOptions: () => {
        swipeToClose: boolean;
    };
    now: () => number;
    handlers: object;
    state: string;
    /** @type {Map<number, {x:number,y:number}>} */
    pointers: Map<number, {
        x: number;
        y: number;
    }>;
    start: {
        x: any;
        y: any;
        t: number;
    } | {
        x: number;
        y: number;
        t: number;
    } | null;
    last: {
        x: any;
        y: any;
        t: number;
    } | {
        x: any;
        y: any;
        t: number;
    } | {
        x: number;
        y: number;
        t: number;
    } | null;
    moved: boolean;
    _lastTap: number;
    _lastTapPt: {
        x: any;
        y: any;
    } | null;
    _clickGuard: boolean;
    _ac: AbortController;
    /** ステージ中心を原点とした座標へ変換する。 */
    _toCenter(clientX: any, clientY: any): {
        x: number;
        y: number;
    };
    _down(e: any): void;
    _pinchStartDist: number | undefined;
    _pinchCenter: {
        x: number;
        y: number;
    } | undefined;
    _move(e: any): void;
    _up(e: any): void;
    _guardClick(): void;
    destroy(): void;
}
