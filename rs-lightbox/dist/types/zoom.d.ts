/**
 * rs-lightbox ズーム・パンの純関数群
 *
 * 座標系:
 *  - 画像は「fit サイズ」（ステージへ contain した基準サイズ）で配置し、scale=1 が原寸表示にあたる。
 *  - transform は translate3d(tx, ty, 0) scale(s)、原点は要素中心（transform-origin: center）。
 *  - tx, ty は px 単位で、画像中心をステージ中心からどれだけずらすか。
 *
 * ここは DOM に触れない純関数のみ。テストしやすさと 60fps のために計算だけを担う。
 */
/**
 * 自然サイズを viewport に contain した基準サイズ（fit サイズ）を返す。
 * @param {{ width: number, height: number }} natural 画像自然サイズ
 * @param {{ width: number, height: number }} viewport ステージ表示領域
 * @returns {{ width: number, height: number, scale: number }} fit サイズと、自然サイズ比の縮小率
 */
export function fitSize(natural: {
    width: number;
    height: number;
}, viewport: {
    width: number;
    height: number;
}): {
    width: number;
    height: number;
    scale: number;
};
/**
 * scale を [1, maxScale] にクランプする（fit=1 が下限）。
 * @param {number} scale
 * @param {number} maxScale
 * @returns {number}
 */
export function clampScale(scale: number, maxScale: number): number;
/**
 * パンの許容範囲（半幅）を返す。scale 済み画像が viewport をはみ出す分の半分。
 * はみ出していなければ 0（＝中央固定）。
 * @param {number} fitLength fit サイズの幅または高さ
 * @param {number} viewportLength ステージの幅または高さ
 * @param {number} scale
 * @returns {number} 片側の最大オフセット（px, >=0）
 */
export function maxOffset(fitLength: number, viewportLength: number, scale: number): number;
/**
 * オフセットを許容範囲にクランプし、端に過剰な空白が残らないようにする。
 * @param {{ x: number, y: number }} offset
 * @param {{ width: number, height: number }} fit fit サイズ
 * @param {{ width: number, height: number }} viewport
 * @param {number} scale
 * @returns {{ x: number, y: number }}
 */
export function clampOffset(offset: {
    x: number;
    y: number;
}, fit: {
    width: number;
    height: number;
}, viewport: {
    width: number;
    height: number;
}, scale: number): {
    x: number;
    y: number;
};
/**
 * ある一点（ステージ中心を原点とする px 座標）を保ったまま scale を変更したときの
 * 新しい transform を返す。ズーム後のオフセットは clampOffset 済み。
 *
 * 導出: ステージ座標 p にある画像上の点は、変換前は (p - t)/s。ズーム後も p に留めるには
 *   p = s2 * (p - t)/s + t2  →  t2 = p - (s2/s) * (p - t)
 *
 * @param {{ scale: number, x: number, y: number }} state 現在の transform
 * @param {number} nextScale クランプ前の目標 scale
 * @param {{ x: number, y: number }} point ステージ中心基準のズーム中心（px）
 * @param {{ width: number, height: number }} fit
 * @param {{ width: number, height: number }} viewport
 * @param {number} maxScale
 * @returns {{ scale: number, x: number, y: number }}
 */
export function zoomAtPoint(state: {
    scale: number;
    x: number;
    y: number;
}, nextScale: number, point: {
    x: number;
    y: number;
}, fit: {
    width: number;
    height: number;
}, viewport: {
    width: number;
    height: number;
}, maxScale: number): {
    scale: number;
    x: number;
    y: number;
};
/**
 * transform 文字列を生成する。scale と位置を translate3d + scale に統一する。
 * @param {{ scale: number, x: number, y: number }} state
 * @returns {string}
 */
export function toTransform(state: {
    scale: number;
    x: number;
    y: number;
}): string;
