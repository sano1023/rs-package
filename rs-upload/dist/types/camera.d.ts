/**
 * rs-upload カメラ撮影取り込み — getUserMedia でプレビュー→静止画キャプチャ→File 化。
 *
 * getUserMedia が使える環境ではモーダルでプレビューを出し、撮影ボタンで1フレームを canvas に焼いて File を作る。
 * getUserMedia 非対応（スマホ Safari の一部等）では、呼び出し側が <input capture> フォールバックに委ねる想定。
 */
/** この環境で getUserMedia が使えるか（＝モーダル撮影が可能か） */
export function supportsCamera(): boolean;
/**
 * video（または drawImage 可能なソース）の1フレームを canvas に描画して File 化する。
 * @param {HTMLVideoElement|HTMLCanvasElement|HTMLImageElement} source
 * @param {object} opts { name, type = 'image/jpeg', quality = 0.92, width, height }
 * @returns {Promise<File>}
 */
export function captureFrameToFile(source: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement, opts?: object): Promise<File>;
/**
 * カメラ撮影モーダル。open() でプレビュー起動、撮影ボタンで onCapture(File) を呼ぶ（複数枚可）。close() で停止。
 */
export class CameraCapture {
    /**
     * @param {object} options { facingMode = 'environment', type, quality, texts, onCapture, onError, getUserMedia }
     */
    constructor(options?: object);
    options: object;
    texts: any;
    stream: any;
    video: HTMLVideoElement | null;
    overlay: HTMLDivElement | null;
    _destroyed: boolean;
    _getUserMedia: any;
    /** モーダルを開いてカメラを起動する。onCapture(file) は撮影ごとに呼ばれる */
    open(onCapture: any): Promise<HTMLDivElement | undefined>;
    _stopStream(): void;
    /** カメラを停止しモーダルを閉じる */
    close(): void;
    destroy(): void;
}
