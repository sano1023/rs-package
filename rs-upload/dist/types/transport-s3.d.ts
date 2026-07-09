/** ETag ヘッダ値から余計な引用符を除いて返す（S3 は "\"abc...\"" のように引用符付きで返す） */
export function parseETag(raw: any): string | null;
/**
 * サイズと partSize からマルチパートの分割計画を返す（純関数）。
 * S3 は最終以外のパートが 5MB 以上・パート数 1..10000 の制約があるが、計画自体は素直に等分する。
 * @returns {Array<{ partNumber, start, end, size }>} end は排他（file.slice(start, end)）
 */
export function s3PartPlan(size: any, partSize?: number): Array<{
    partNumber: any;
    start: any;
    end: any;
    size: any;
}>;
/**
 * s3PutTransport — 単発 presigned PUT。
 * @param {object} config
 *   - presign(file, meta) => Promise<string | { url, headers? }>  自前バックエンドで PUT 用 presigned URL を発行
 *   - objectUrl(file, meta, signedUrl) => string  完了後に返す公開URL（省略時は署名URLのクエリを除いたもの）
 *   - fetchImpl  テスト用 fetch 差し替え
 * @returns 転送アダプタ { name: 's3-put', upload }
 */
export function s3PutTransport(config?: object): {
    name: string;
    upload(file: any, { onProgress, signal, meta }?: {
        onProgress?: (() => void) | undefined;
        meta?: {} | undefined;
    }): Promise<{
        url: any;
        etag: any;
        status: any;
    }>;
};
/**
 * s3MultipartTransport — マルチパートアップロード。各コールバックは利用者のバックエンドを叩く。
 * @param {object} config
 *   - createMultipartUpload(file, meta) => Promise<{ uploadId, key, bucket? }>
 *   - signPart({ partNumber, uploadId, key, file, meta }) => Promise<string | { url, headers? }>
 *   - completeMultipartUpload({ uploadId, key, parts, file, meta }) => Promise<{ url?, location? } | any>
 *       parts は [{ PartNumber, ETag }]（PartNumber 昇順）
 *   - abortMultipartUpload({ uploadId, key, file, meta }) => Promise<any>  （中断時のクリーンアップ・任意）
 *   - partSize   1パートのバイト数（既定 5MB）
 *   - fetchImpl  テスト用 fetch 差し替え
 * @returns 転送アダプタ { name: 's3-multipart', upload }
 */
export function s3MultipartTransport(config?: object): {
    name: string;
    partSize: any;
    upload(file: any, { onProgress, signal, meta }?: {
        onProgress?: (() => void) | undefined;
        meta?: {} | undefined;
    }): Promise<{
        url: any;
        uploadId: any;
        key: any;
        parts: {
            PartNumber: any;
            ETag: any;
        }[];
        response: any;
    }>;
};
