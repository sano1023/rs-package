export class Scanner {
    constructor(target: any, options?: {});
    target: any;
    options: {};
    formats: any;
    listeners: {};
    destroyed: boolean;
    scanning: boolean;
    _lastHits: Map<any, any>;
    _adapters: any;
    _detector: any;
    buildDOM(): void;
    root: any;
    video: any;
    frame: any;
    scanline: any;
    flash: any;
    status: any;
    work: any;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    /**
     * スキャン開始。stream を渡すとカメラの代わりにそれを使う
     * （canvas.captureStream() や画面共有も可）。
     */
    start(stream?: null): Promise<void>;
    stream: MediaStream | null | undefined;
    _timer: number | null | undefined;
    stop(): void;
    tick(): Promise<void>;
    /** デコーダ3段構え: BarcodeDetector → 内蔵1D → アダプタ */
    decodeCanvas(canvas: any, ctx: any): Promise<any>;
    handleResult(result: any): void;
    beep(): void;
    _audio: AudioContext | undefined;
    /**
     * 画像（File / Blob / dataURL / URL / img / canvas）を一発読み取り。
     * @returns {Promise<{ text, format, engine } | null>}
     */
    scanImage(src: any): Promise<{
        text: any;
        format: any;
        engine: any;
    } | null>;
    listCameras(): Promise<MediaDeviceInfo[]>;
    setTorch(on: any): Promise<boolean>;
    destroy(): void;
}
