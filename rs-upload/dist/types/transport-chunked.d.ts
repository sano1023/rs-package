/** fingerprint = name:size:lastModified（§3-4）。File が持つ実 lastModified を使う */
export function fingerprintOf(file: any, meta?: {}): string;
/**
 * chunkedTransport({ endpoint, chunkSize = 5MB, headers, store, fetchImpl })
 * - endpoint: URL 文字列 or (file, meta) => URL。ハンドシェイクの POST 先。PATCH は endpoint + '/' + uploadId
 * - chunkSize: 1チャンクのバイト数（既定 5 * 1024 * 1024）
 * - headers: オブジェクト or (file, meta) => オブジェクト（認証トークン等の遅延評価に）
 * - store: localStorage 互換（getItem/setItem/removeItem）。既定は localStorage、無ければメモリ
 * - fetchImpl: fetch 差し替え（テスト用）
 * @returns 転送アダプタ { name: 'chunked', upload, resume, resumeState }（§転送アダプタ契約）
 */
export function chunkedTransport(config?: {}): {
    name: string;
    chunkSize: any;
    /** 新規アップロード（既存の記録があれば upload 内のハンドシェイクで自然に続きから送られる） */
    upload(file: any, ctx: any): Promise<any>;
    /** 中断再開（saved は localStorage 記録。実位置はハンドシェイクのサーバ offset を正とする） */
    resume(file: any, saved: any, ctx: any): Promise<any>;
    /** キュー連携: 再開可能な記録（＝過去に途中まで送った痕跡）があれば返す。無ければ null */
    resumeState(file: any, meta?: {}): any;
    _store: any;
    _fingerprint: typeof fingerprintOf;
    _throttle: {
        reserve(bytes: any): number;
        cursor: number | null;
        bytesPerSec: number;
        burst: number;
    } | null;
};
