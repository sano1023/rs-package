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
    endScreen: HTMLElement;
    bottomEl: HTMLDivElement;
    menu: {
        el: HTMLElement;
        isOpen(): boolean;
        toggle(force?: boolean): void;
        destroy(): void;
    };
    _gestureCleanup: (() => void) | null;
    _miniCleanup: (() => void) | null;
    watermarkEl: HTMLElement | null;
    playlistPanel: {
        el: HTMLElement;
        isOpen(): boolean;
        toggle(force?: boolean): void;
        destroy(): void;
    } | null;
    _autoThumbs: {
        destroy(): void;
    } | null;
    /** thumbnails:'auto' 指定時、現在ソースが同一オリジンなら自動サムネイル生成器を起動する */
    _setupAutoThumbnails(): void;
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
    setLevel(index: any): boolean;
    seekToLiveEdge(): void;
    setPreservesPitch(on: any): void;
    get isLive(): boolean;
    setStream(stream: any): boolean;
    clearStream(): boolean;
    get isStream(): boolean;
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
        chapter: any;
        playlistIndex: any;
        ab: {
            a: any;
            b: any;
            active: boolean;
        };
        live: boolean;
        level: string | number | null;
        preservesPitch: boolean;
        stream: boolean;
    };
    /** 設定メニューの開閉 */
    toggleMenu(force: any): void;
    /** プレイリストのサイドリストの開閉 */
    togglePlaylistPanel(force: any): void;
    playlistNext(): boolean;
    playlistPrev(): boolean;
    playlistGoto(i: any): boolean;
    setLoopA(t: any): void;
    setLoopB(t: any): void;
    toggleABPoint(t: any): void;
    clearABLoop(): void;
    frameStep(dir: any): void;
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
