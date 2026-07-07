/**
 * スキャナを生成する。
 * @param {string|HTMLElement} target ビューポートのコンテナ
 * @param {object} options
 *   - formats: ['qr_code','code_128','ean_13']（既定すべて）
 *   - continuous: false で1回読んだら自動停止（既定 true）
 *   - dedupMs: 同一コードの再通知間隔（既定1500ms）
 *   - interval: フレーム解析間隔ms（既定150）
 *   - beep: false でビープ無効
 *   - facingMode: 'environment'（背面・既定）| 'user'
 *   - adapters: 外部デコーダ配列
 *   - onScan / onError / onStart / onStop
 */
export function createRSScanner(target: string | HTMLElement, options?: object): Scanner;
/**
 * jsQR をアダプタ化する（QRを全ブラウザで読むために）。
 * <script src="jsQR.js"></script> 等で読み込んだ関数を渡す。
 */
export function jsQRAdapter(jsQR: any): {
    name: string;
    formats: string[];
    detect(imageData: any): {
        text: any;
        format: string;
    } | null;
};
import { Scanner } from './scanner.js';
import { decode1D } from './decode1d.js';
export { Scanner, decode1D };
