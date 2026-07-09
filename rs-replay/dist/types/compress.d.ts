/** CompressionStream/DecompressionStream が使えるか */
export function isCompressionSupported(): boolean;
/** バイト列を gzip 圧縮する（非対応環境では入力をそのまま返す） */
export function gzipBytes(bytes: any): Promise<any>;
/** gzip バイト列を解凍する */
export function gunzipBytes(bytes: any): Promise<Uint8Array<ArrayBuffer>>;
/** 先頭マジックで gzip かどうか判定する */
export function looksGzipped(bytes: any): boolean;
/**
 * セッションJSON → 送出用バイト列（既定gzip・非対応時は非圧縮UTF-8）。
 * @param {object} session
 * @param {{compress?: 'auto'|false}} [opts]
 * @returns {Promise<Uint8Array>}
 */
export function sessionToGzip(session: object, opts?: {
    compress?: "auto" | false;
}): Promise<Uint8Array>;
/**
 * 送出用バイト列 → セッション（gzip/非圧縮を先頭マジックで自動判別・検証込み）。
 * @param {Uint8Array|ArrayBuffer} data
 * @returns {Promise<object>} session
 */
export function sessionFromGzip(data: Uint8Array | ArrayBuffer): Promise<object>;
