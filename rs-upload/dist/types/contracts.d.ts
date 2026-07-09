/**
 * rs-upload 契約定義（アダプタのバリデータ）。
 * 転送・前処理・URL取り込みアダプタはすべてここで定義した「形」を満たす。
 * index.js と各アダプタが共有するため、循環 import を避けるべく独立モジュールにしている。
 */
/**
 * 転送アダプタ契約（simple / chunked / tus / S3 / 自作もすべてこの形）:
 * {
 *     name: 'chunked',
 *     // 成功で result（{ url?, response?, … }）を resolve。onProgress(loaded, total) を随時呼ぶ
 *     upload(file, { onProgress, signal, meta }) => Promise<result>,
 *     resume?(file, saved, { onProgress, signal, meta }) => Promise<result>,  // 中断再開対応の場合
 * }
 */
export function defineTransport(def: any): any;
/**
 * 前処理アダプタ契約（バリデーション通過後・転送前に配列順で直列適用。rsImageAdapter もこの形）:
 * { name: 'rs-image', match?: (file) => boolean, process(file, { signal, onProgress }) => Promise<Blob|File> }
 */
export function definePreprocessor(def: any): any;
/**
 * URL取り込みアダプタ契約（v0.3 で定義のみ・具体実装はスコープ外）:
 * { name: 'my-source', fetch(url, { signal }) => Promise<File> }
 *
 * リモートURL（画像URL・Drive/Dropbox 等の共有リンク）を File 化してキューへ入れるためのアダプタ。
 * ブラウザからの直 fetch は CORS で塞がることが多いため、実装は多くの場合「利用者の同一オリジン
 * プロキシ経由で取得して File を組み立てる」形になる（＝ベンダーサーバ不要の思想を保つ）。ここでは
 * その契約（name と fetch(url) => Promise<File>）だけを固め、取り込みロジックはアプリ側の責務とする。
 */
export function defineUrlImporter(def: any): any;
