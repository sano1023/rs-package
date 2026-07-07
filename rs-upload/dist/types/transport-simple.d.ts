/**
 * simpleTransport({ endpoint, method = 'POST', headers, fieldName = 'file', params })
 * - endpoint: URL 文字列 or (file, meta) => URL
 * - method: 'POST'（multipart/form-data）| 'PUT'（raw ボディ）
 * - headers: オブジェクト or (file, meta) => オブジェクト（トークン等の遅延評価に）
 * - fieldName: multipart のフィールド名（既定 'file'）
 * - params: multipart に追加するフィールド（オブジェクト or (file, meta) => オブジェクト）
 * @returns 転送アダプタ { name: 'simple', upload(file, { onProgress, signal, meta }) }
 */
export function simpleTransport(config?: {}): {
    name: string;
    upload(file: any, { onProgress, signal, meta }?: {
        onProgress?: (() => void) | undefined;
        meta?: {} | undefined;
    }): Promise<any>;
};
