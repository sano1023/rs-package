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
    isStream: boolean;
    _stream: any;
    analytics: ((event: object) => void) | null;
    _everPlayed: boolean;
    _leaveSent: boolean;
    levels: any[];
    autoLevel: boolean;
    currentLevelIndex: number;
    isLive: boolean;
    _adapterLive: boolean;
    preservesPitch: boolean;
    tracks: any;
    _trackCues: Map<any, any>;
    captionIndex: number;
    _lastCaptionIndex: number;
    _cueText: string;
    playlist: Playlist | null;
    ab: ABLoop;
    sources: any;
    chapters: any[];
    _chaptersRaw: any[] | {
        start: number;
        end: number;
        title: string;
    }[] | null;
    _activeChapter: number;
    thumbnails: any[] | {
        url: string;
        x: number | null;
        y: number | null;
        w: number | null;
        h: number | null;
        start: number;
        end: number;
    }[] | null;
    thumbnailsAuto: boolean;
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
    /** アダプタの handle からレベル/ライブ情報を取り込み、イベントを共通化して橋渡しする */
    _bindAdapterLevels(handle: any): void;
    _clearLevels(): void;
    /** アダプタ提供の画質レベルがあるか（HLS 等） */
    hasLevels(): boolean;
    /** index 番のレベルのラベル（無ければ null） */
    levelLabelAt(index: any): any;
    /** 現在の実効画質ラベル（AUTO 中は自動選択レベル・固定中はそのレベル。レベル無しは progressive ラベル） */
    getActiveLevelLabel(): any;
    /**
     * 画質レベルを選択する。index は数値（固定）/ 'auto' / -1（AUTO）。
     * setQuality（progressive）と同じ qualitychange イベントに共通化する。
     * @returns {boolean} 選択を実行したか
     */
    setLevel(index: any): boolean;
    /** ライブ判定を更新し、変化したら livechange を発火する */
    _updateLive(): void;
    /** シーク可能な DVR 窓 { start, end, duration } */
    liveWindow(): {
        start: number;
        end: number;
        duration: number;
    };
    /** ライブエッジ（DVR 窓の末尾）秒位置 */
    liveEdge(): number;
    /** currentTime がライブエッジ付近か */
    isAtLiveEdge(): boolean;
    /** ライブエッジへジャンプする（末尾少し手前へ・停止中なら再生も開始） */
    seekToLiveEdge(): void;
    /** 倍速時のピッチ保持の ON/OFF。pitchchange を発火する */
    setPreservesPitch(on: any): void;
    /** ソース一式を差し替える（進捗イベントもリセット。v0.1 の最小実装） */
    setSources(sources: any): void;
    /**
     * MediaStream を <video srcObject> にセットして再生する（rs-livecam 連携の口）。
     * シークバー・時刻表示は UI 側で自動的に隠れる（MediaStream 再生モード）。
     * @param {MediaStream|null} stream null で MediaStream 再生モードを解除
     * @returns {boolean} 適用したか
     */
    setStream(stream: MediaStream | null): boolean;
    /** MediaStream を srcObject にセットして再生モードへ入る（内部） */
    _applyStream(stream: any): void;
    /** MediaStream 再生モードを解除し、通常のソース再生へ戻す（sources があれば先頭を適用） */
    clearStream(): boolean;
    /** 現在再生中の MediaStream（再生モードでなければ null） */
    getStream(): any;
    /**
     * 字幕トラックを選択する。index: トラック番号 / ラベル文字列 / -1（オフ）。
     * cue の描画は cuechange イベント（{text}）を購読して行う。
     */
    setCaption(index: any): Promise<void>;
    /** 字幕オン/オフ切替（Cキー）。オンにする際は前回のトラック（無ければ先頭）を使う */
    toggleCaptions(): void;
    _updateCue(force: any): void;
    _initChapters(input: any): void;
    _loadChaptersVTT(url: any): Promise<void>;
    /** duration が確定/変化したとき、最終章の end などを補完して再正規化する */
    _recomputeChapters(): void;
    _updateActiveChapter(): void;
    getChapters(): any[];
    /** time にかかっているチャプター（無ければ null） */
    chapterAt(time: any): any;
    /** index 番目のチャプター先頭へシークする */
    seekToChapter(index: any): void;
    _initThumbnails(input: any): void;
    /** 自動生成器などが組み立てたサムネイル配列を反映する（メモリキャッシュ済みの data URL 群） */
    setThumbnails(list: any): void;
    _loadThumbnails(url: any): Promise<void>;
    /** time に対応するサムネイル { url, x, y, w, h } を返す（無ければ null） */
    thumbAt(time: any): any;
    _resolveURL(url: any): any;
    _initPlaylist(items: any): void;
    /** index 番のアイテムを適用する（sources と、指定があれば poster/thumbnails/chapters/tracks を切替） */
    _applyPlaylistItem(index: any, { play }?: {
        play?: boolean | undefined;
    }): boolean;
    /** 字幕トラック一式を差し替える（プレイリストのアイテム切替用） */
    _setTracks(tracks: any): void;
    get playlistIndex(): any;
    getPlaylist(): any[];
    /** index 番へ移動して再生する */
    playlistGoto(index: any): boolean;
    /** 次のアイテムへ（無ければ false） */
    playlistNext(): boolean;
    /** 前のアイテムへ（無ければ false） */
    playlistPrev(): boolean;
    /** A点をセット（既定は現在時刻） */
    setLoopA(time?: number): void;
    /** B点をセット（既定は現在時刻） */
    setLoopB(time?: number): void;
    /** なし → A → B → 解除 を巡回する（1操作で A-B ループを組む） */
    toggleABPoint(time?: number): void;
    clearABLoop(): void;
    getABLoop(): {
        a: any;
        b: any;
        active: boolean;
    };
    /** 再生中に B を通過したら A へ戻す */
    _maybeLoopAB(): void;
    /** 1フレーム相当（±1/fps秒）動かす。YouTube同様に一時停止する。dir>0 で進む */
    frameStep(dir: any): void;
    _checkMilestones(ratio: any): void;
    _resetMilestones(): void;
    /**
     * 視聴イベントを整形して利用側ハンドラへ渡す（本体は送信しない）。
     * 同時に `analytics` イベントも発火し、UI/デモから購読できるようにする。
     * @param {string} coreType PlayerCore のイベント種別（progress25 等）
     * @param {object} [detail] 付随情報（milestone / rate / quality など）
     * @returns {object} 整形済みイベント
     */
    _track(coreType: string, detail?: object): object;
    /** PlayerCore の正規化イベントを購読し、視聴イベントに橋渡しする（analytics 指定時のみ配線） */
    _setupAnalytics(): void;
    /** 視聴離脱を1度だけ報告する（destroy / ページ離脱時に呼ばれる）。未再生なら何もしない */
    reportLeave(): void;
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
    destroy(): void;
}
import { Playlist } from './playlist.js';
import { ABLoop } from './abloop.js';
