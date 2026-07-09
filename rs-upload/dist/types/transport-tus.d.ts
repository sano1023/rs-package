/** fingerprint = name:size:lastModified（chunked と同じ規約） */
export function tusFingerprint(file: any, meta?: {}): string;
/**
 * tus の Upload-Metadata ヘッダ値を作る（"key base64val,key2 base64val2"）。
 * 値が null/undefined のキーは「値なしフラグ」として key だけを出す。
 */
export function encodeTusMetadata(meta?: {}): string;
/** Location（絶対 / ルート相対 / 相対）をアップロード先の絶対URLに解決する */
export function resolveLocation(endpoint: any, location: any): any;
/**
 * tusTransport({ endpoint, headers, chunkSize = 5MB, metadata, store, fetchImpl })
 * - endpoint : creation を投げる URL（文字列 or (file, meta) => URL）
 * - headers  : 認証等（オブジェクト or (file, meta) => オブジェクト）
 * - chunkSize: 1 PATCH のバイト数（既定 5MB）。0 以下なら一括
 * - metadata : Upload-Metadata に載せる追加キー（filename/filetype は既定で付与）
 * - store    : localStorage 互換（getItem/setItem/removeItem）
 * - fetchImpl: fetch 差し替え（テスト用）
 * @returns 転送アダプタ { name: 'tus', upload, resume, resumeState }
 */
export function tusTransport(config?: {}): {
    name: string;
    chunkSize: any;
    upload(file: any, ctx: any): Promise<{
        status: any;
        url: any;
        location: any;
        offset: any;
    }>;
    resume(file: any, saved: any, ctx: any): Promise<{
        status: any;
        url: any;
        location: any;
        offset: any;
    }>;
    resumeState(file: any, meta?: {}): any;
    _store: any;
    _fingerprint: typeof tusFingerprint;
};
