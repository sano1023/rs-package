/** MIME（'image/webp'）→ rs-image の format 名（'webp'）。未指定/不明は null（＝元形式を維持） */
export function typeToFormat(type: any): string | null;
/**
 * rs-image 前処理アダプタを作る。返り値は前処理アダプタ契約
 * `{ name, match, process(file, { signal, onProgress }) => Promise<File> }` を満たす。
 *
 * @param {object} options
 *   - maxWidth / maxHeight : 縮小の上限（片方だけでも可・比率維持）
 *   - fit                  : 両方指定時の合わせ方 'contain'（既定）/ 'cover' / 'fill'
 *   - quality              : 0–1（jpeg/webp の品質）
 *   - type                 : 出力 MIME（'image/webp' / 'image/jpeg' / 'image/png'）。未指定なら元形式維持
 *   - targetBytes          : 目標バイト数（品質を二分探索して寄せる。jpeg/webp のみ）
 *   - background           : 非透過形式へ変換する際の下地色（既定 '#ffffff'）
 *   - keepIfLarger         : 加工後が元より大きく、かつ形式変換していない場合は元を返す（既定 true）
 *   - rename               : 形式変換時に拡張子を差し替える（既定 true）
 *   - match                : (file) => boolean 適用対象の判定（既定: image/* かつ SVG 以外）
 *   - engine               : rs-image の processImage 関数、または { processImage } を注入（省略時は動的 import）
 *   - enginePath           : engine 未注入時の動的 import 先（既定 '../../rs-image/src/index.js'）
 * @returns 前処理アダプタ
 */
export function rsImageAdapter(options?: object): any;
