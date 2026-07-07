/** MIME 文字列を正規化する（小文字化・パラメータ除去・別名解決） */
export function normalizeMime(mime: any): any;
/** ファイル名から拡張子ベースの MIME を推定する（不明は ''） */
export function extMime(name: any): any;
/**
 * 先頭バイト列から MIME を推定する。
 * @param {Uint8Array} bytes 先頭 MAGIC_BYTES_LENGTH バイト以上
 * @returns {string|null} 判定できなければ null
 */
export function sniffMime(bytes: Uint8Array): string | null;
/** Blob/File の先頭バイトを読む（Node の Blob でも動く） */
export function readMagic(file: any): Promise<Uint8Array<any>>;
/**
 * マジックバイト検査。宣言 MIME（空なら拡張子から推定）が「シグネチャで検証できる形式」
 * なのに実バイトが一致しない場合のみ偽装として不合格にする。
 * text/plain 等のシグネチャを持たない形式は検査対象外（ok: true）。
 * @returns {Promise<{ ok: boolean, sniffed: string|null, claimed: string }>}
 */
export function checkMagic(file: any): Promise<{
    ok: boolean;
    sniffed: string | null;
    claimed: string;
}>;
/**
 * rs-upload マジックバイト検査 — 先頭バイトのシグネチャ照合で宣言MIME/拡張子の偽装を検出する。
 * DOM 非依存（Blob.slice().arrayBuffer() のみ使用）。Node でもそのまま動く。
 */
/** 検査に必要な先頭バイト数 */
export const MAGIC_BYTES_LENGTH: 16;
