/**
 * EXIF Orientation を読む（JPEGのみ）。1〜8、無ければ 1。
 * createImageBitmap の imageOrientation:'from-image' が使える環境では不要だが、
 * 非対応環境のフォールバック用に自前パースも持つ。
 */
export function readExifOrientation(arrayBuffer: any): number;
/** drawable（Image/Canvas/Bitmap）の自然寸法を得る */
export function drawableSize(d: any): {
    width: any;
    height: any;
};
/**
 * 画像を読み込んで { drawable, width, height, orientationApplied } を返す。
 * @param {*} src 入力
 * @param {object} opts { maxSourceDimension = 4096, autoOrient = true }
 */
export function loadImage(src: any, opts?: object): Promise<{
    drawable: any;
    width: any;
    height: any;
    orientationApplied: boolean;
}>;
