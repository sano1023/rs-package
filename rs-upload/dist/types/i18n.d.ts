/**
 * ロケール＋個別上書きを解決した文言テーブルを返す。
 * @param {string} locale 'ja'（既定）| 'en'
 * @param {object} overrides texts オプション（キー単位の差し替え）
 */
export function resolveTexts(locale?: string, overrides?: object): any;
/** '{name} は {max} まで' 形式のプレースホルダ置換 */
export function format(template: any, params?: {}): string;
/** バイト数の人間向け表記（1024基数。20971520 → '20 MB'） */
export function formatSize(bytes: any): string;
export namespace LOCALES {
    namespace ja {
        let dropText: string;
        let dropSub: string;
        let dropzoneLabel: string;
        let stateQueued: string;
        let statePreprocessing: string;
        let stateUploading: string;
        let stateDone: string;
        let stateError: string;
        let stateRetrying: string;
        let stateCanceled: string;
        let cancel: string;
        let retry: string;
        let remove: string;
        let totalProgress: string;
        let errAccept: string;
        let errMagic: string;
        let errMaxSize: string;
        let errMaxFiles: string;
        let errMinImageSize: string;
        let errUpload: string;
        let liveAdded: string;
        let liveStart: string;
        let liveDone: string;
        let liveError: string;
        let liveCanceled: string;
        let liveAllDone: string;
    }
    namespace en {
        let dropText_1: string;
        export { dropText_1 as dropText };
        let dropSub_1: string;
        export { dropSub_1 as dropSub };
        let dropzoneLabel_1: string;
        export { dropzoneLabel_1 as dropzoneLabel };
        let stateQueued_1: string;
        export { stateQueued_1 as stateQueued };
        let statePreprocessing_1: string;
        export { statePreprocessing_1 as statePreprocessing };
        let stateUploading_1: string;
        export { stateUploading_1 as stateUploading };
        let stateDone_1: string;
        export { stateDone_1 as stateDone };
        let stateError_1: string;
        export { stateError_1 as stateError };
        let stateRetrying_1: string;
        export { stateRetrying_1 as stateRetrying };
        let stateCanceled_1: string;
        export { stateCanceled_1 as stateCanceled };
        let cancel_1: string;
        export { cancel_1 as cancel };
        let retry_1: string;
        export { retry_1 as retry };
        let remove_1: string;
        export { remove_1 as remove };
        let totalProgress_1: string;
        export { totalProgress_1 as totalProgress };
        let errAccept_1: string;
        export { errAccept_1 as errAccept };
        let errMagic_1: string;
        export { errMagic_1 as errMagic };
        let errMaxSize_1: string;
        export { errMaxSize_1 as errMaxSize };
        let errMaxFiles_1: string;
        export { errMaxFiles_1 as errMaxFiles };
        let errMinImageSize_1: string;
        export { errMinImageSize_1 as errMinImageSize };
        let errUpload_1: string;
        export { errUpload_1 as errUpload };
        let liveAdded_1: string;
        export { liveAdded_1 as liveAdded };
        let liveStart_1: string;
        export { liveStart_1 as liveStart };
        let liveDone_1: string;
        export { liveDone_1 as liveDone };
        let liveError_1: string;
        export { liveError_1 as liveError };
        let liveCanceled_1: string;
        export { liveCanceled_1 as liveCanceled };
        let liveAllDone_1: string;
        export { liveAllDone_1 as liveAllDone };
    }
}
