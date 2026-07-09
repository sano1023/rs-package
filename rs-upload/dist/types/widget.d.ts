export class Widget {
    /**
     * @param {HTMLElement} root マウント先
     * @param {UploadQueue} queue
     * @param {object} options createRSUpload のオプション（texts は queue.texts を使う）
     */
    constructor(root: HTMLElement, queue: UploadQueue, options?: object);
    root: HTMLElement;
    queue: UploadQueue;
    options: object;
    texts: any;
    _refs: Map<any, any>;
    _urls: Set<any>;
    _pendingAdds: any[];
    _flushTimer: any;
    _destroyed: boolean;
    _docListeners: any[];
    view: string;
    _camera: CameraCapture | null;
    editOpts: {
        tools: any;
        editor: any;
        enginePath: any;
        height: any;
        editorOptions: any;
        export: any;
    } | null;
    _editor: any;
    _editOverlay: any;
    _editorFactory: any;
    _videoPreview: boolean;
    _pdfRenderer: any;
    _previewSize: any;
    _lastEta: any;
    _build(): void;
    dropzone: any;
    input: HTMLInputElement | undefined;
    cameraBtn: any;
    captureInput: HTMLInputElement | null | undefined;
    notice: any;
    list: any;
    totalWrap: any;
    totalText: any;
    totalBar: any;
    live: any;
    hiddenInput: any;
    _hiddenCreated: boolean | undefined;
    _io: IntersectionObserver | null | undefined;
    _bindDom(): void;
    _onClick: ((e: any) => void) | undefined;
    _onKeydown: ((e: any) => void) | undefined;
    _onDrag: ((e: any) => void) | undefined;
    _onDragLeave: ((e: any) => void) | undefined;
    _onDrop: ((e: any) => void) | undefined;
    _onChange: (() => void) | undefined;
    _onPaste: ((e: any) => void) | undefined;
    _bindQueue(): void;
    _handlers: {
        fileAdded: ({ file }: {
            file: any;
        }) => void;
        fileRejected: ({ message }: {
            message: any;
        }) => void;
        fileStart: ({ file }: {
            file: any;
        }) => void;
        fileProgress: ({ file }: {
            file: any;
        }) => void;
        fileDone: ({ file }: {
            file: any;
        }) => void;
        fileError: ({ file, willRetry }: {
            file: any;
            willRetry: any;
        }) => void;
        fileCanceled: ({ file }: {
            file: any;
        }) => void;
        fileRemoved: ({ file }: {
            file: any;
        }) => void;
        fileReplaced: ({ file }: {
            file: any;
        }) => void;
        progress: (p: any) => void;
        allDone: () => void;
    } | undefined;
    /** 大量投入でも固まらないよう、追加行は rAF でまとめて DocumentFragment 挿入する */
    _scheduleFlush(): void;
    _buildItem(item: any): any;
    _button(kind: any, label: any, item: any): any;
    _isImage(item: any): boolean;
    /** 動画か（プレビュー対象・v0.4） */
    _isVideo(item: any): boolean;
    /** PDF か（プレビュー対象・v0.4） */
    _isPdf(item: any): boolean;
    /** サムネイル（プレビュー）を生成できる種別か。画像 / 動画 / PDF(レンダラ注入時) */
    _hasPreview(item: any): boolean;
    /** サムネイルの種別クラス（CSS のバッジ表示用） */
    _thumbKind(item: any): "video" | "image" | "pdf" | null;
    _onIntersect(entries: any): void;
    _ensureThumb(item: any): Promise<void>;
    _releaseThumb(id: any): void;
    /** 種別に応じたサムネイル URL を作る（画像=EXIF正立 / 動画=フレームキャプチャ / PDF=1ページ目描画） */
    _makeThumbUrlFor(item: any): Promise<string | null>;
    /** { blob } を追跡付き object URL 化（動画/PDF プレビュー用）。失敗・null は null を返す */
    _blobToTrackedUrl(res: any): string | null;
    /**
     * EXIF 向き補正付きサムネイル URL を作る。
     * createImageBitmap の imageOrientation で正立 → 小さな canvas に縮小して object URL 化。
     * 非対応・失敗時は元ファイルの object URL にフォールバック（最新ブラウザは <img> でも EXIF 適用）。
     */
    _makeThumbUrl(file: any): Promise<string | null>;
    _revoke(url: any): void;
    /** アイテムの状態表示・ボタン可視・エラー文言を item.state に合わせる */
    _syncItem(item: any): void;
    _updateProgress(item: any): void;
    _updateTotals(): void;
    _removeItemDom(id: any): void;
    /** done アイテムの結果 URL をフォーム値へ（1件なら素の URL・複数なら JSON 配列） */
    _updateHiddenInput(): void;
    _showNotice(message: any): void;
    _announce(message: any): void;
    /** カメラ撮影ボタン（と、getUserMedia 非対応スマホ向けの capture 属性 input フォールバック）を組む */
    _buildCamera(): void;
    _onCaptureChange: (() => void) | undefined;
    /** カメラ撮影を開始する。getUserMedia が使えればモーダル撮影、非対応なら capture 属性 input を起動 */
    openCamera(): Promise<void>;
    /** 表示モードを切り替える（'list' | 'grid'） */
    setView(view: any): string;
    /** rs-image の createRSImageEditor を解決する（注入優先・無ければ動的 import） */
    _resolveEditorFactory(): Promise<any>;
    /**
     * 簡易編集モーダルを開く。rs-image のエディタ（既定 tools: crop/rotate）で回転・クロップし、
     * 「適用」でエクスポート結果を queue.replaceFile でファイル実体へ反映する（アップロード前）。
     */
    openEditor(id: any): Promise<any>;
    _closeEditor(): void;
    _toFile(blob: any, name: any, type: any, orig: any): any;
    /** ファイル差し替え後にリスト行のサイズ表示とサムネイルを更新する */
    _refreshItem(item: any): void;
    /** DOM・リスナー・object URL をすべて片付ける（queue 本体の destroy は呼び出し側で） */
    destroy(): void;
}
import { CameraCapture } from './camera.js';
