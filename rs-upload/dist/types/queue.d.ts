export class UploadQueue {
    /**
     * @param {object} options
     *   transport      転送アダプタ { name, upload(file, { onProgress, signal, meta }) } — §転送アダプタ契約
     *   parallel       同時アップロード数（既定 3）
     *   retry          { count: 3, baseDelay: 1000 } — 指数バックオフ 1s → 2s → 4s
     *   preprocess     前処理アダプタ配列 [{ name, match?, process(file, { signal, onProgress }) }]
     *   accept/maxSize/maxFiles/minImageSize/magicCheck/measureImage — バリデーション（validator.js）
     *   meta           transport に渡す任意メタデータ
     *   autoStart      追加後すぐ開始する（既定 true）
     *   locale/texts   エラー文言のロケール
     */
    constructor(options?: object);
    options: object;
    transport: any;
    parallel: any;
    retry: any;
    preprocess: any;
    meta: any;
    autoStart: boolean;
    texts: any;
    items: any[];
    _listeners: Map<any, any>;
    _seq: number;
    _busy: boolean;
    _destroyed: boolean;
    on(event: any, fn: any): this;
    off(event: any, fn: any): this;
    _emit(event: any, payload: any): void;
    _emitChange(): void;
    /**
     * ファイルを検証してキューへ追加する。拒否分は fileRejected、受理分は fileAdded を発火。
     * @param {FileList|File[]|File} fileList
     * @returns {Promise<object[]>} 追加されたアイテム
     */
    addFiles(fileList: FileList | File[] | File): Promise<object[]>;
    /** id からアイテムを取得 */
    get(id: any): any;
    /** キュー全体のスナップショット（§キュー状態のJSON） */
    toJSON(): {
        files: {
            id: any;
            name: any;
            size: any;
            type: any;
            state: any;
            progress: any;
            attempts: any;
            result: any;
            error: string | null;
        }[];
        totals: {
            count: number;
            done: number;
            loaded: number;
            total: number;
        };
    };
    _totals(): {
        count: number;
        done: number;
        loaded: number;
        total: number;
    };
    _emitTotals(): void;
    /** autoStart: false のときに手動で開始する */
    start(): void;
    _activeCount(): any;
    _pump(): void;
    /** 1アイテムの実行（前処理 → 転送）。state は await 前に同期的に更新して二重起動を防ぐ */
    _run(item: any): Promise<void>;
    _setState(item: any, state: any): void;
    /** アップロードをキャンセルする（AbortController.abort）。queued/前処理/転送中が対象 */
    cancel(id: any): boolean;
    /** 進行中・待機中をすべてキャンセルする */
    cancelAll(): void;
    /** error / canceled のアイテムを最初からやり直す（試行回数リセット） */
    retryFile(id: any): boolean;
    /** アイテムをキューから取り除く（進行中なら abort してから） */
    remove(id: any): boolean;
    /** 全アイテムを取り除く */
    clear(): void;
    _clearRetry(item: any): void;
    _checkAllDone(): void;
    /** タイマー・進行中転送・リスナーをすべて破棄する */
    destroy(): void;
}
