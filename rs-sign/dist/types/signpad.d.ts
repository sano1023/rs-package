/**
 * 署名パッドを生成する。
 * @param {string|HTMLElement} target
 * @param {object} options
 */
export function createRSSignPad(target: string | HTMLElement, options?: object): SignPad;
export class SignPad {
    /**
     * @param {string|HTMLElement} target コンテナ要素（この中に canvas を生成する）
     * @param {object} options
     *   penColor='#1b2a5e' minWidth=1 maxWidth=3.5 pressure=true
     *   hiddenInput=null（input名 or 要素。描画のたびに PNG dataURL を反映）
     *   width/height（省略時はコンテナ実寸に追従）ariaLabel='署名パッド'
     */
    constructor(target: string | HTMLElement, options?: object);
    el: any;
    options: {
        penColor: string;
        minWidth: number;
        maxWidth: number;
        pressure: boolean;
        hiddenInput: null;
        ariaLabel: string;
    };
    strokes: any[];
    _current: {
        color: string;
        minWidth: number;
        maxWidth: number;
        pressure: boolean;
        points: {
            x: number;
            y: number;
            t: number;
            p: number;
        }[];
    } | null;
    _pointerId: any;
    _t0: any;
    _raf: number;
    _replay: {
        raf: number;
        resolve: (value: any) => void;
    } | null;
    _listeners: Map<any, any>;
    canvas: HTMLCanvasElement;
    _committed: HTMLCanvasElement;
    _ro: ResizeObserver | undefined;
    _setupSize(): boolean;
    width: any;
    height: any;
    _dpr: number | undefined;
    _resolveHiddenInput(): void;
    _input: any;
    _createdInput: boolean | undefined;
    _bind(): void;
    _onDown: ((e: any) => void) | undefined;
    _onMove: ((e: any) => void) | undefined;
    _onUp: ((e: any) => void) | undefined;
    _point(e: any): {
        x: number;
        y: number;
        t: number;
        p: number;
    };
    _pointerDown(e: any): void;
    _pointerMove(e: any): void;
    _pointerUp(e: any): void;
    _scheduleDraw(): void;
    /** ストローク1本を任意コンテキストへ描く（表示・PNG・SVGすべて同じパスを共有） */
    _fillStroke(c2d: any, stroke: any, scale: any): void;
    _commitStroke(stroke: any): void;
    _rebuildCommitted(): void;
    /** 表示 = 確定キャッシュ + 描画中ストローク */
    _redraw(): void;
    _redrawAll(): void;
    _afterChange(): void;
    isEmpty(): boolean;
    /** 最後の1ストロークを取り消す */
    undo(): this;
    clear(): this;
    /** ストロークJSON（正のデータ）を返す */
    toJSON(): {
        version: number;
        width: number;
        height: number;
        strokes: any;
    };
    /** ストロークJSON（文字列 or オブジェクト）から復元する */
    fromJSON(json: any): this;
    /**
     * PNG dataURL（透過・決定的レンダリング）。
     * scale はCSS px 基準の倍率（devicePixelRatio に依存しない）。
     */
    toPNG({ scale, background }?: {
        scale?: number | undefined;
        background?: null | undefined;
    }): string;
    /** 可変幅ストロークをパスで再現した単体表示可能なSVG文字列 */
    toSVG(): string;
    /**
     * 描き順アニメーション再生。完了で resolve する Promise を返す。
     * 再生中の入力は無視。完了後は静的描画と同一画素に戻す。
     * @param {{speed?: number, gapMs?: number}} opts speed=倍速 / gapMs=ストローク間ギャップ上限
     */
    replay({ speed, gapMs }?: {
        speed?: number;
        gapMs?: number;
    }): Promise<any>;
    _stopReplay(): void;
    on(name: any, fn: any): this;
    off(name: any, fn: any): this;
    _emit(name: any, payload: any): void;
    destroy(): void;
}
