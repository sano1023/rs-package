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
    _build(): void;
    dropzone: any;
    input: HTMLInputElement | undefined;
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
        progress: () => void;
        allDone: () => void;
    } | undefined;
    /** 大量投入でも固まらないよう、追加行は rAF でまとめて DocumentFragment 挿入する */
    _scheduleFlush(): void;
    _buildItem(item: any): any;
    _button(kind: any, label: any, item: any): any;
    _isImage(item: any): boolean;
    _onIntersect(entries: any): void;
    _ensureThumb(item: any): Promise<void>;
    _releaseThumb(id: any): void;
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
    /** DOM・リスナー・object URL をすべて片付ける（queue 本体の destroy は呼び出し側で） */
    destroy(): void;
}
