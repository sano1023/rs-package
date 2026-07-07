/**
 * rs-livecam アダプタヘルパ
 *
 * MediaPipe 等の実モデルを rs-livecam の契約に変換する。
 * コアはこれらに依存しない（利用側が読み込んで渡す）。
 */
/**
 * MediaPipe Selfie Segmentation → セグメンテーションアダプタ。
 * const seg = new SelfieSegmentation({locateFile: ...}); を渡す。
 */
export function selfieSegAdapter(selfieSegmentation: any): {
    name: string;
    segment(frame: any): Promise<any>;
};
/**
 * MediaPipe FaceMesh → トラッキングアダプタ（468点 → リグ値）。
 */
export function faceMeshAdapter(faceMesh: any): {
    name: string;
    track(frame: any): Promise<any>;
};
/** FaceMesh 468点 → リグ値（目の開閉はEAR・口はMAR・頭位置は鼻先） */
export function landmarksToRig(lm: any): {
    present: boolean;
    eyeL: number;
    eyeR: number;
    mouth: number;
    headX: number;
    headY: number;
    roll: number;
};
