export class Renderer {
    /**
     * @param {Document} doc
     * @param {object} opts
     * @param {Record<string,string>} opts.labels aria-label / テキスト
     * @param {object} opts.handlers { onClose, onPrev, onNext, onZoomIn, onZoomOut, onBackdrop, onRetry }
     */
    constructor(doc: Document, { labels, handlers }: {
        labels: Record<string, string>;
        handlers: object;
    });
    doc: Document;
    labels: Record<string, string>;
    handlers: object;
    _build(): void;
    slides: {
        root: HTMLDivElement;
        media: HTMLDivElement;
        img: HTMLImageElement;
        spinner: HTMLDivElement;
        error: HTMLDivElement;
        retryBtn: HTMLButtonElement;
    }[] | undefined;
    zoomOutBtn: HTMLButtonElement | undefined;
    zoomInBtn: HTMLButtonElement | undefined;
    closeBtn: HTMLButtonElement | undefined;
    counter: HTMLDivElement | undefined;
    prevBtn: HTMLButtonElement | undefined;
    nextBtn: HTMLButtonElement | undefined;
    caption: HTMLDivElement | undefined;
    live: HTMLDivElement | undefined;
    root: HTMLDivElement | undefined;
    backdrop: HTMLDivElement | undefined;
    stage: HTMLDivElement | undefined;
    track: HTMLDivElement | undefined;
    _btn(className: any, svg: any, label: any, handler: any): HTMLButtonElement;
    /** root を document.body へ挿入する。 */
    mount(parent: any): void;
    /** ステージ表示領域のサイズを返す（fit 計算用）。 */
    stageSize(): {
        width: number;
        height: number;
    };
    /** 中央スライドの .rslb-media に transform を適用する。 */
    setTransform(transform: any): void;
    /** transform のトランジション有無（操作中は切る）。 */
    setTransformTransition(on: any): void;
    /**
     * トラックの横位置を設定する。base(-33.3333% = 1 スライド分) からの px ずれ。
     * % はトラック自身の幅(300%)基準なので、中央スライド表示は -33.3333%。
     * @param {number} dx px（右へスワイプ = 正）
     * @param {boolean} animate
     */
    setTrackOffset(dx: number, animate: boolean): void;
    /** カウンター表示と 1 枚時の矢印/カウンター表示を更新する。 */
    setCounter(index: any, total: any, { show }?: {
        show?: boolean | undefined;
    }): void;
    /** loop=false のとき端で矢印を無効化する。 */
    setNavEnabled(prevEnabled: any, nextEnabled: any): void;
    /** ズームボタンの有効/無効。 */
    setZoomState(canZoomIn: any, canZoomOut: any): void;
    /** キャプションを「テキストとして」設定する（HTML 解釈しない）。 */
    setCaption(text: any): void;
    /** ライブ領域へスライド位置を通知する。 */
    announce(text: any): void;
    /**
     * 縦スワイプ閉じのドラッグ表現（ステージを下げ、背景を薄く）。
     * @param {number} dy
     * @param {number} [stageH] キャッシュ済みステージ高さ（未指定時のみ測定）
     */
    setCloseDrag(dy: number, stageH?: number): void;
    /** 縦スワイプ閉じのドラッグ表現を戻す。 */
    clearCloseDrag(animate: any): void;
    destroy(): void;
}
