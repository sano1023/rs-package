/**
 * アップロードウィジェットを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object} options
 *   transport   転送アダプタ（simpleTransport() など。§転送アダプタ契約）
 *   accept      許可する形式（['image/jpeg', 'image/*', '.png'] 等）。宣言MIMEだけでなくマジックバイトでも検査
 *   maxSize     1ファイルの上限バイト数
 *   maxFiles    同時に保持できる枚数上限
 *   minImageSize 画像の最小解像度 { width, height }
 *   parallel    同時アップロード数（既定 3）
 *   retry       { count: 3, baseDelay: 1000 } — 指数バックオフ 1s → 2s → 4s
 *   preprocess  前処理アダプタ配列（rs-image 連携は v0.3）
 *   hiddenInput フォーム連携の hidden input（name 文字列 / セレクタ / 要素）
 *   paste       ペースト取り込み（'document'（既定）| 'element' | false）
 *   multiple    複数選択（既定 true）
 *   autoStart   追加後すぐアップロード開始（既定 true）
 *   view        リスト表示 'list'（既定）| 'grid'（グリッドビュー・v0.2）
 *   camera      カメラ撮影取り込み（true / { facingMode, type, quality }・v0.2）
 *   pdfRenderer PDF1ページ目プレビュー用の rs-pdf レンダラアダプタ注入（pdfjsAdapter(pdfjsLib) 等・v0.4。
 *               未注入なら PDF は汎用アイコン表示のまま）
 *   videoPreview 動画サムネイル生成の有効/無効（既定 true・v0.4）
 *   previewSize  動画/PDF サムネの長辺ピクセル（既定 128・v0.4）
 *   locale      'ja'（既定）| 'en'。texts でキー単位の差し替え可
 *   meta        transport に渡す任意メタデータ
 *   （帯域制限は transport 側で: chunkedTransport({ ..., maxBytesPerSec })・v0.4。
 *    残り時間推定は progress イベントの { speed, eta } で受け取れる・v0.4）
 * @returns インスタンス（on/off・addFiles()・toJSON()・destroy() ほか）
 */
export function createRSUpload(target: string | HTMLElement, options?: object): {
    el: Element;
    queue: UploadQueue;
    widget: Widget;
    /** イベント購読: fileAdded / fileRejected / fileStart / fileProgress / fileDone /
     *  fileError / fileCanceled / fileRemoved / progress / allDone / change */
    on(event: any, fn: any): {
        el: Element;
        queue: UploadQueue;
        widget: Widget;
        on(event: any, fn: any): /*elided*/ any;
        off(event: any, fn: any): /*elided*/ any;
        /** プログラマティック投入（FileList / File[] / File） */
        addFiles(files: any): Promise<object[]>;
        /** ファイル選択ダイアログを開く */
        openFileDialog(): void;
        /** カメラ撮影を開始する（getUserMedia モーダル / 非対応時は capture 属性 input・v0.2） */
        openCamera(): Promise<void>;
        /** 表示モードを切り替える（'list' | 'grid'・v0.2） */
        setView(view: any): string;
        /** 簡易編集モーダル（回転・クロップ）を開く（edit オプション有効時・v0.3） */
        openEditor(id: any): Promise<any>;
        start(): void;
        cancel(id: any): boolean;
        cancelAll(): void;
        retry(id: any): boolean;
        /** ファイル実体を差し替える（編集結果の反映等・v0.3） */
        replaceFile(id: any, file: any): boolean;
        remove(id: any): boolean;
        clear(): void;
        toJSON(): {
            files: {
                id: any;
                name: any;
                size: any;
                type: any;
                state: any;
                progress: any;
                attempts: any;
                result: any;
                error: string | null;
            }[];
            totals: {
                count: number;
                done: number;
                loaded: number;
                total: number;
            };
        };
        /** object URL の revoke・リスナー解除・DOM 破棄まで行う */
        destroy(): void;
    };
    off(event: any, fn: any): {
        el: Element;
        queue: UploadQueue;
        widget: Widget;
        /** イベント購読: fileAdded / fileRejected / fileStart / fileProgress / fileDone /
         *  fileError / fileCanceled / fileRemoved / progress / allDone / change */
        on(event: any, fn: any): /*elided*/ any;
        off(event: any, fn: any): /*elided*/ any;
        /** プログラマティック投入（FileList / File[] / File） */
        addFiles(files: any): Promise<object[]>;
        /** ファイル選択ダイアログを開く */
        openFileDialog(): void;
        /** カメラ撮影を開始する（getUserMedia モーダル / 非対応時は capture 属性 input・v0.2） */
        openCamera(): Promise<void>;
        /** 表示モードを切り替える（'list' | 'grid'・v0.2） */
        setView(view: any): string;
        /** 簡易編集モーダル（回転・クロップ）を開く（edit オプション有効時・v0.3） */
        openEditor(id: any): Promise<any>;
        start(): void;
        cancel(id: any): boolean;
        cancelAll(): void;
        retry(id: any): boolean;
        /** ファイル実体を差し替える（編集結果の反映等・v0.3） */
        replaceFile(id: any, file: any): boolean;
        remove(id: any): boolean;
        clear(): void;
        toJSON(): {
            files: {
                id: any;
                name: any;
                size: any;
                type: any;
                state: any;
                progress: any;
                attempts: any;
                result: any;
                error: string | null;
            }[];
            totals: {
                count: number;
                done: number;
                loaded: number;
                total: number;
            };
        };
        /** object URL の revoke・リスナー解除・DOM 破棄まで行う */
        destroy(): void;
    };
    /** プログラマティック投入（FileList / File[] / File） */
    addFiles(files: any): Promise<object[]>;
    /** ファイル選択ダイアログを開く */
    openFileDialog(): void;
    /** カメラ撮影を開始する（getUserMedia モーダル / 非対応時は capture 属性 input・v0.2） */
    openCamera(): Promise<void>;
    /** 表示モードを切り替える（'list' | 'grid'・v0.2） */
    setView(view: any): string;
    /** 簡易編集モーダル（回転・クロップ）を開く（edit オプション有効時・v0.3） */
    openEditor(id: any): Promise<any>;
    start(): void;
    cancel(id: any): boolean;
    cancelAll(): void;
    retry(id: any): boolean;
    /** ファイル実体を差し替える（編集結果の反映等・v0.3） */
    replaceFile(id: any, file: any): boolean;
    remove(id: any): boolean;
    clear(): void;
    toJSON(): {
        files: {
            id: any;
            name: any;
            size: any;
            type: any;
            state: any;
            progress: any;
            attempts: any;
            result: any;
            error: string | null;
        }[];
        totals: {
            count: number;
            done: number;
            loaded: number;
            total: number;
        };
    };
    /** object URL の revoke・リスナー解除・DOM 破棄まで行う */
    destroy(): void;
};
import { UploadQueue } from './queue.js';
import { Widget } from './widget.js';
import { defineTransport } from './contracts.js';
import { definePreprocessor } from './contracts.js';
import { defineUrlImporter } from './contracts.js';
import { simpleTransport } from './transport-simple.js';
import { chunkedTransport } from './transport-chunked.js';
import { fingerprintOf } from './transport-chunked.js';
import { tusTransport } from './transport-tus.js';
import { encodeTusMetadata } from './transport-tus.js';
import { tusFingerprint } from './transport-tus.js';
import { resolveLocation } from './transport-tus.js';
import { s3PutTransport } from './transport-s3.js';
import { s3MultipartTransport } from './transport-s3.js';
import { s3PartPlan } from './transport-s3.js';
import { parseETag } from './transport-s3.js';
import { rsImageAdapter } from './preprocess-rsimage.js';
import { typeToFormat } from './preprocess-rsimage.js';
import { filenameFromUrl } from './url-import.js';
import { filesFromDataTransfer } from './folder.js';
import { supportsFolderDrop } from './folder.js';
import { CameraCapture } from './camera.js';
import { captureFrameToFile } from './camera.js';
import { supportsCamera } from './camera.js';
import { captureVideoThumbnail } from './preview-video.js';
import { isVideoFile } from './preview-video.js';
import { renderPdfFirstPage } from './preview-pdf.js';
import { isPdfFile } from './preview-pdf.js';
import { isRenderer } from './preview-pdf.js';
import { createThrottle } from './throttle.js';
import { normalizeThrottle } from './throttle.js';
import { createSpeedEstimator } from './eta.js';
import { LOCALES } from './i18n.js';
import { resolveTexts } from './i18n.js';
import { format } from './i18n.js';
import { formatSize } from './i18n.js';
import { formatDuration } from './i18n.js';
import { sniffMime } from './magic.js';
import { checkMagic } from './magic.js';
import { readMagic } from './magic.js';
import { extMime } from './magic.js';
import { normalizeMime } from './magic.js';
import { validateFiles } from './validator.js';
import { matchAccept } from './validator.js';
import { normalizeAccept } from './validator.js';
export { UploadQueue, Widget, defineTransport, definePreprocessor, defineUrlImporter, simpleTransport, chunkedTransport, fingerprintOf, tusTransport, encodeTusMetadata, tusFingerprint, resolveLocation, s3PutTransport, s3MultipartTransport, s3PartPlan, parseETag, rsImageAdapter, typeToFormat, filenameFromUrl, filesFromDataTransfer, supportsFolderDrop, CameraCapture, captureFrameToFile, supportsCamera, captureVideoThumbnail, isVideoFile, renderPdfFirstPage, isPdfFile, isRenderer, createThrottle, normalizeThrottle, createSpeedEstimator, LOCALES, resolveTexts, format, formatSize, formatDuration, sniffMime, checkMagic, readMagic, extMime, normalizeMime, validateFiles, matchAccept, normalizeAccept };
