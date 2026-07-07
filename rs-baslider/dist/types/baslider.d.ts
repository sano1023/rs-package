/**
 * rs-baslider 本体
 *
 * 2枚の画像（または任意要素）を重ね、ハンドルのドラッグで Before/After を比較する。
 * - after層が通常フローでサイズを決め、before層は絶対配置 + clip-path でクリップ
 * - ドラッグ中は rAF バッチで clip-path / handle の style だけ更新（DOM再構築なし）
 * - Pointer Events でマウス・タッチ・ペンを統一処理
 */
export class BASlider {
    constructor(target: any, options?: {});
    target: any;
    options: {};
    listeners: {};
    destroyed: boolean;
    vertical: boolean;
    position: number;
    _dragging: boolean;
    buildDOM(): void;
    root: any;
    afterLayer: any;
    beforeLayer: any;
    handle: any;
    beforeLabel: any;
    afterLabel: any;
    /** URL文字列 / {src, alt} / HTMLElement を層のコンテンツにする */
    contentOf(src: any, side: any): any;
    bindEvents(): void;
    _onDown: ((e: any) => void) | undefined;
    _onMove: ((e: any) => void) | undefined;
    _onUp: ((e: any) => void) | undefined;
    _onKey: ((e: any) => void) | undefined;
    /** ポインタ位置 → position(%) */
    moveTo(e: any): void;
    requestApply(): void;
    _raf: any;
    applyPosition(): void;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    getPosition(): number;
    /** 位置を設定する。{ animate: true } で滑らかに移動 */
    setPosition(p: any, { animate }?: {
        animate?: boolean | undefined;
    }): void;
    /** オプション差分更新（labels / position / hover / clickToMove） */
    update(partial?: {}): void;
    destroy(): void;
}
