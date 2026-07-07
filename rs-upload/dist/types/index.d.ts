/**
 * 転送アダプタ契約（v0.2 の chunked / v0.3 の tus / 自作アダプタもすべてこの形）:
 * {
 *     name: 'chunked',
 *     // 成功で result（{ url?, response?, … }）を resolve。onProgress(loaded, total) を随時呼ぶ
 *     upload(file, { onProgress, signal, meta }) => Promise<result>,
 *     resume?(file, saved, { onProgress, signal, meta }) => Promise<result>,  // 中断再開対応の場合
 * }
 */
export function defineTransport(def: any): any;
/**
 * 前処理アダプタ契約（バリデーション通過後・転送前に配列順で直列適用。v0.3 の rsImageAdapter もこの形）:
 * { name: 'rs-image', match?: (file) => boolean, process(file, { signal, onProgress }) => Promise<Blob|File> }
 */
export function definePreprocessor(def: any): any;
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
 *   locale      'ja'（既定）| 'en'。texts でキー単位の差し替え可
 *   meta        transport に渡す任意メタデータ
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
        start(): void;
        cancel(id: any): boolean;
        cancelAll(): void;
        retry(id: any): boolean;
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
        start(): void;
        cancel(id: any): boolean;
        cancelAll(): void;
        retry(id: any): boolean;
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
    start(): void;
    cancel(id: any): boolean;
    cancelAll(): void;
    retry(id: any): boolean;
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
import { simpleTransport } from './transport-simple.js';
import { LOCALES } from './i18n.js';
import { resolveTexts } from './i18n.js';
import { format } from './i18n.js';
import { formatSize } from './i18n.js';
import { sniffMime } from './magic.js';
import { checkMagic } from './magic.js';
import { readMagic } from './magic.js';
import { extMime } from './magic.js';
import { normalizeMime } from './magic.js';
import { validateFiles } from './validator.js';
import { matchAccept } from './validator.js';
import { normalizeAccept } from './validator.js';
export { UploadQueue, Widget, simpleTransport, LOCALES, resolveTexts, format, formatSize, sniffMime, checkMagic, readMagic, extMime, normalizeMime, validateFiles, matchAccept, normalizeAccept };
