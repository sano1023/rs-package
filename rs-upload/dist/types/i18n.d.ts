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
/**
 * 秒数を人間向けの残り時間表記にする（残り時間推定の表示・v0.4）。
 * texts の durHour/durMin/durSec/durJoin/durLessThanSec を使ってロケール差を吸収する。
 * 1時間以上は「時間＋分」、1分以上は「分＋秒」、1分未満は「秒」、1秒未満は durLessThanSec。
 * @param {number} seconds 残り秒数
 * @param {object} texts resolveTexts() 済みの文言テーブル（省略時は日本語既定）
 * @returns {string} 例: '1分30秒' / '1m 30s'。数値でなければ ''
 */
export function formatDuration(seconds: number, texts?: object): string;
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
        let remaining: string;
        let durHour: string;
        let durMin: string;
        let durSec: string;
        let durJoin: string;
        let durLessThanSec: string;
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
        let liveCaptured: string;
        let cameraButton: string;
        let cameraTitle: string;
        let cameraCapture: string;
        let cameraClose: string;
        let cameraError: string;
        let viewList: string;
        let viewGrid: string;
        let editButton: string;
        let editTitle: string;
        let editApply: string;
        let editCancel: string;
        let editApplied: string;
        let editError: string;
        let editUnavailable: string;
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
        let remaining_1: string;
        export { remaining_1 as remaining };
        let durHour_1: string;
        export { durHour_1 as durHour };
        let durMin_1: string;
        export { durMin_1 as durMin };
        let durSec_1: string;
        export { durSec_1 as durSec };
        let durJoin_1: string;
        export { durJoin_1 as durJoin };
        let durLessThanSec_1: string;
        export { durLessThanSec_1 as durLessThanSec };
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
        let liveCaptured_1: string;
        export { liveCaptured_1 as liveCaptured };
        let cameraButton_1: string;
        export { cameraButton_1 as cameraButton };
        let cameraTitle_1: string;
        export { cameraTitle_1 as cameraTitle };
        let cameraCapture_1: string;
        export { cameraCapture_1 as cameraCapture };
        let cameraClose_1: string;
        export { cameraClose_1 as cameraClose };
        let cameraError_1: string;
        export { cameraError_1 as cameraError };
        let viewList_1: string;
        export { viewList_1 as viewList };
        let viewGrid_1: string;
        export { viewGrid_1 as viewGrid };
        let editButton_1: string;
        export { editButton_1 as editButton };
        let editTitle_1: string;
        export { editTitle_1 as editTitle };
        let editApply_1: string;
        export { editApply_1 as editApply };
        let editCancel_1: string;
        export { editCancel_1 as editCancel };
        let editApplied_1: string;
        export { editApplied_1 as editApplied };
        let editError_1: string;
        export { editError_1 as editError };
        let editUnavailable_1: string;
        export { editUnavailable_1 as editUnavailable };
    }
}
