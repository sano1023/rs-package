/**
 * rs-upload 動画サムネイル生成（v0.4）— video 要素で1フレームをデコードし canvas にキャプチャする。
 *
 * 画像以外のプレビュー（REQUIREMENTS §v0.4）。依存ゼロ・ブラウザ専用（video/canvas を使う）。
 * デコード不能・非対応コーデック時は null を返し、Widget 側は汎用ファイルアイコン表示にフォールバックする。
 */
/** file が動画か（宣言 MIME か拡張子で判定） */
export function isVideoFile(file: any): boolean;
/**
 * 動画ファイルの1フレームをサムネイル画像（Blob）にする。
 * @param {File|Blob} file 動画ファイル
 * @param {object} options
 *   - maxSize   : 長辺の最大ピクセル数（既定 320）
 *   - seek      : キャプチャする秒数（未指定なら再生時間の約10%＝黒画面回避）
 *   - type      : 出力 MIME（既定 'image/png'）
 *   - quality   : jpeg/webp 品質（0–1）
 *   - timeoutMs : 生成タイムアウト（既定 8000）
 * @returns {Promise<{ blob: Blob, width: number, height: number, duration: number }|null>}
 */
export function captureVideoThumbnail(file: File | Blob, options?: object): Promise<{
    blob: Blob;
    width: number;
    height: number;
    duration: number;
} | null>;
