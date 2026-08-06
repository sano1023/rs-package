/** グローバル設定を変更する */
export function configureToasts(partial: any): void;
/**
 * トースト API。
 *   toast('メッセージ') / toast.success / error / warning / info / loading
 *   toast.promise(p, { loading, success, error })
 *   toast.dismiss(id) / toast.dismissAll()
 */
export function toast(message: any, options: any): any;
export namespace toast {
    function success(message: any, options: any): any;
    function error(message: any, options: any): any;
    function warning(message: any, options: any): any;
    function info(message: any, options: any): any;
    function loading(message: any, options: any): any;
    function update(id: any, options: any): any;
    function dismiss(id: any): any;
    function dismissAll(): any;
    /**
     * Promise の進行に合わせて loading → success / error を出す。
     * @param {Promise} promise
     * @param {{ loading: string, success: string|Function, error: string|Function }} messages
     * @returns {Promise} 元の promise（チェーン継続用）
     */
    function promise(promise: Promise<any>, messages?: {
        loading: string;
        success: string | Function;
        error: string | Function;
    }): Promise<any>;
}
export class Toaster {
    _containers: Map<any, any>;
    _toasts: Map<any, any>;
    _seq: number;
    /** @private ポジションのコンテナ（aria-live リージョン）を用意する */
    private _container;
    /**
     * トーストを表示する。
     * @param {string} message
     * @param {object} [options] { type, duration, position, action: {label, onClick}, closable, id }
     * @returns {string} id（update / dismiss に使う）
     */
    show(message: string, options?: object): string;
    /** @private */
    private _startTimer;
    /** @private */
    private _pause;
    /** @private */
    private _resume;
    /** 内容・種類を更新する（loading → success など） */
    update(id: any, options?: {}): any;
    /** 閉じる（フェードアウト後に DOM 除去） */
    dismiss(id: any): void;
    /** 全部閉じる */
    dismissAll(): void;
}
