export class LiveCam {
    constructor(options?: {});
    options: {};
    listeners: {};
    destroyed: boolean;
    running: boolean;
    mode: any;
    params: {
        smooth: any;
        brightness: any;
        saturate: any;
        mosaicSize: any;
    };
    background: any;
    avatarConfig: any;
    segAdapter: any;
    trackAdapter: any;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    _raw: HTMLCanvasElement;
    _rawCtx: CanvasRenderingContext2D | null;
    _tmp: HTMLCanvasElement;
    _tmpCtx: CanvasRenderingContext2D | null;
    video: HTMLVideoElement;
    stream: MediaStream;
    _lastFrameAt: number;
    _rig: any;
    on(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    /** カメラ起動（stream を渡すとそれを使う: テスト・画面共有等） */
    start(stream?: null): Promise<void>;
    input: MediaStream | null | undefined;
    stop(): void;
    _loop(): void;
    _raf: number | undefined;
    _render(): Promise<void>;
    /** camera: フィルタのみ（美肌=ぼかしレイヤーのアルファ合成。全てGPUのctx.filter） */
    _renderCamera(): void;
    /** 全体モザイク / 全体ぼかし（プライバシーモード・アダプタ不要） */
    _renderPrivacy(): void;
    /** background: セグメンテーション必須。マスクが無ければ人は描かれない（消える） */
    _renderBackground(): Promise<void>;
    /** 背景の描画（仮想背景画像 / モザイク / ぼかし） */
    _drawBackdrop(): void;
    /** avatar: 本人の映像は一切描かない。リグ値で2Dアバターを動かす */
    _renderAvatar(): Promise<void>;
    /** 情報プレート（生フレームは絶対に描かない） */
    _plate(text: any): void;
    _paintBackgroundOnly(): void;
    _paint(text: any): void;
    setMode(mode: any): void;
    /** パラメータ変更（smooth / brightness / saturate / mosaicSize）— 次フレームから反映 */
    set(key: any, value: any): void;
    /** 背景設定: 'mosaic' | 'blur' | 画像(HTMLImage/canvas) */
    setBackground(bg: any): void;
    setAvatar(partial: any): void;
    setSegmentation(adapter: any): void;
    setTracking(adapter: any): void;
    destroy(): void;
}
