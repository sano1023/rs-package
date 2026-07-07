export class Player {
    /**
     * @param {string|HTMLElement} target コンテナのセレクタ or 要素
     * @param {object} options REQUIREMENTS §3 のオプション一式
     */
    constructor(target: string | HTMLElement, options?: object);
    el: Element;
    options: object;
    i18n: any;
    _cleanups: (() => void)[];
    _destroyed: boolean;
    _hideDelay: any;
    _idleTimer: number;
    _overControls: boolean;
    captionStyle: any;
    video: HTMLVideoElement;
    core: PlayerCore;
    captionsEl: HTMLDivElement;
    spinnerEl: HTMLDivElement;
    errorEl: HTMLDivElement;
    centerBtn: HTMLButtonElement;
    bottomEl: HTMLDivElement;
    menu: {
        el: HTMLElement;
        isOpen(): boolean;
        toggle(force?: boolean): void;
        destroy(): void;
    };
    on(type: any, cb: any): this;
    off(type: any, cb: any): this;
    play(): Promise<void>;
    pause(): void;
    togglePlay(): void;
    seek(time: any): void;
    setVolume(v: any): void;
    setMuted(m: any): void;
    toggleMute(): void;
    setRate(r: any): void;
    setQuality(label: any): boolean;
    setCaption(index: any): Promise<void>;
    get state(): string;
    toJSON(): {
        fullscreen: boolean;
        pip: boolean;
        state: string;
        currentTime: number;
        duration: number;
        volume: number;
        muted: boolean;
        rate: number;
        quality: any;
        caption: any;
    };
    /** 設定メニューの開閉 */
    toggleMenu(force: any): void;
    isFullscreen(): boolean;
    /** コンテナ要素のフルスクリーン切替（iOS Safari は video のネイティブ全画面へフォールバック） */
    toggleFullscreen(): void;
    /** ピクチャーインピクチャー切替 */
    togglePiP(): Promise<void>;
    /** 字幕の表示スタイル調整（サイズ倍率・背景の有無） */
    setCaptionStyle(style?: {}): void;
    destroy(): void;
    _applyStateClasses(): void;
    _renderCenter(): void;
    /** ユーザー操作を検知してコントロールを再表示し、非表示タイマーを再起動する */
    _activity(): void;
    _maybeHide(): void;
    _renderCaption(text: any): void;
}
import { PlayerCore } from './core.js';
