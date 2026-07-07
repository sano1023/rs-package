/**
 * rs-image 幾何計算（純関数）
 * リサイズ・fit・トリミング・回転の寸法計算を描画から分離する。
 */
/**
 * リサイズ後の寸法を計算する。
 * @param {number} sw 元の幅
 * @param {number} sh 元の高さ
 * @param {object} resize { width?, height?, fit? }
 *   - width/height の片方だけ指定 → 比率維持
 *   - 両方指定 + fit: 'contain'（内接）/ 'cover'（外接）/ 'fill'（歪める）
 * @returns {{ width, height }} 描画先キャンバスの寸法（整数）
 */
export function fitSize(sw: number, sh: number, resize?: object): {
    width: any;
    height: any;
};
/**
 * cover 用: 元画像から切り出す矩形（中央寄せ）と描画先を返す。
 * @returns {{ sx, sy, sWidth, sHeight, dWidth, dHeight }}
 */
export function describeCover(sw: any, sh: any, dw: any, dh: any): {
    sx: any;
    sy: any;
    sWidth: any;
    sHeight: any;
    dWidth: any;
    dHeight: any;
};
/**
 * トリミング矩形を画像範囲内にクランプする。
 */
export function clampCrop(crop: any, sw: any, sh: any): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * 90°単位の回転で幅高さが入れ替わるかを返す。
 * @param {number} deg 0/90/180/270（負や360超も正規化）
 */
export function normalizeRotation(deg: number): number;
export function isSwapped(deg: any): boolean;
/**
 * 段階縮小のステップ列を返す（各ステップは前段の最大1/2まで）。
 * 大縮小のジャギ防止。目標が拡大や僅かな縮小ならステップ無し。
 * @returns {Array<{width, height}>} 中間サイズ列（最後が目標）
 */
export function downscaleSteps(sw: any, sh: any, dw: any, dh: any): Array<{
    width: any;
    height: any;
}>;
/** MIME からファイル拡張子 */
export function extForFormat(format: any): any;
export function mimeForFormat(format: any): string;
/** 透過を保持できる形式か */
export function supportsAlpha(format: any): boolean;
