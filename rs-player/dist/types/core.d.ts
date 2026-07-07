/** sources オプションを正規化する（文字列1本 / 配列の両対応） */
export function normalizeSources(sources: any): any;
export class PlayerCore {
    /**
     * @param {HTMLVideoElement} video
     * @param {object} options createRSPlayer と同じオプション
     */
    constructor(video: HTMLVideoElement, options?: object);
    video: HTMLVideoElement;
    options: object;
    state: string;
    speeds: any;
    adapters: any;
    persistEnabled: boolean;
    _storage: any;
    _listeners: any;
    _cleanups: any[];
    _milestonesFired: Set<any>;
    _switching: {
        label: any;
        time: number;
        paused: boolean;
        rate: number;
    } | null;
    _adapterHandle: any;
    currentSource: any;
    tracks: any;
    _trackCues: Map<any, any>;
    captionIndex: number;
    _lastCaptionIndex: number;
    _cueText: string;
    sources: any;
    /** イベント購読。cb は {type, ...detail} を受け取る */
    on(type: any, cb: any): this;
    off(type: any, cb: any): this;
    emit(type: any, detail?: {}): void;
    /** 正規化入力を状態機械に通し、変化があれば statechange を発火する */
    _input(input: any): void;
    _bindMedia(): void;
    get currentTime(): number;
    get duration(): number;
    play(): Promise<void>;
    pause(): void;
    togglePlay(): void;
    /** 秒位置へシーク（0〜duration にクランプ） */
    seek(time: any): void;
    seekBy(delta: any): void;
    /** duration の pct%（0〜100）位置へジャンプ */
    seekPercent(pct: any): void;
    setVolume(v: any): void;
    volumeBy(delta: any): void;
    setMuted(m: any): void;
    toggleMute(): void;
    get rate(): number;
    setRate(r: any): void;
    /** 速度リスト内で1段上げ/下げ（YouTube の < > キー相当） */
    speedStep(dir: any): void;
    /** バッファ済み範囲を [{start, end}] で返す */
    getBuffered(): {
        start: number;
        end: number;
    }[];
    get quality(): any;
    getQualities(): any;
    /**
     * 画質切替。currentTime・再生状態・速度を維持して src を差し替える。
     * 完了時に qualitychange を発火する。
     * @returns {boolean} 切替を開始したか
     */
    setQuality(label: any): boolean;
    /** 切替後の loadedmetadata で呼ばれ、時刻・速度・再生状態を復元する */
    _finishSwitch(): void;
    /**
     * ソースを video / アダプタに適用する。
     * アダプタ契約: { name, canPlay?(src, source), attach(video, src) → { levels, currentLevel, destroy } }
     * - canPlay が true を返すアダプタを優先使用
     * - canPlay の無いアダプタは、source.adapter === name 指定か、HLS/DASH拡張子のソースに使う
     */
    _applySource(source: any): void;
    /** ソース一式を差し替える（進捗イベントもリセット。v0.1 の最小実装） */
    setSources(sources: any): void;
    /**
     * 字幕トラックを選択する。index: トラック番号 / ラベル文字列 / -1（オフ）。
     * cue の描画は cuechange イベント（{text}）を購読して行う。
     */
    setCaption(index: any): Promise<void>;
    /** 字幕オン/オフ切替（Cキー）。オンにする際は前回のトラック（無ければ先頭）を使う */
    toggleCaptions(): void;
    _updateCue(force: any): void;
    _checkMilestones(ratio: any): void;
    _resetMilestones(): void;
    _restore(): void;
    _save(): void;
    /**
     * 要素に YouTube 互換ショートカットを配線する。
     * @param {HTMLElement} el keydown を拾う要素（コンテナ）
     * @param {object} extra コアで処理できないアクションのハンドラ（toggleFullscreen 等）
     * @param {(ev: KeyboardEvent) => boolean} [shouldIgnore] true を返すと無視する追加条件
     * @returns {() => void} 解除関数
     */
    attachKeyboard(el: HTMLElement, extra?: object, shouldIgnore?: (ev: KeyboardEvent) => boolean): () => void;
    toJSON(): {
        state: string;
        currentTime: number;
        duration: number;
        volume: number;
        muted: boolean;
        rate: number;
        quality: any;
        caption: any;
    };
    destroy(): void;
}
