/**
 * rs-player MediaStream 再生モード（rs-livecam 連携）ユーティリティ — DOM非依存の純粋関数
 *
 * rs-livecam 等が生成した MediaStream を `<video srcObject>` で再生するモードの「判定」と、
 * その際の UI 可視性（シークバー・時刻表示を隠す）を純粋関数として切り出す。
 * rs-livecam は **import しない**。利用側が MediaStream を注入する口
 *   （`options.srcObject` / `player.setStream(stream)`）で連携する。
 *
 * MediaStream にはシーク可能な尺という概念が無いため、再生モードでは
 * シークバーと総時間表示を自動で隠す（§v0.5）。
 */
/**
 * 値が MediaStream かどうかを判定する（instanceof + ダックタイピング）。
 * MediaStream が無い環境（Node 等）でも getTracks/getVideoTracks を持てば真とみなす。
 * @param {*} obj
 * @returns {boolean}
 */
export function isMediaStream(obj: any): boolean;
/** MediaStream の active 状態を安全に取り出す（active 未定義は再生可能とみなし true） */
export function streamActive(stream: any): boolean;
/**
 * MediaStream のトラック構成を要約する。
 * @param {*} stream
 * @returns {{ video: number, audio: number, active: boolean }}
 */
export function streamTrackInfo(stream: any): {
    video: number;
    audio: number;
    active: boolean;
};
/**
 * 再生モードに応じた UI 可視性を返す（純粋関数）。
 * MediaStream 再生モードでは「シークバー」と「時刻表示」を隠す（自動切替）。
 * @param {{ stream?: boolean }} [state] stream: MediaStream 再生モードか
 * @returns {{ seek: boolean, time: boolean }} 各UIの表示可否（true=表示）
 */
export function streamUIVisibility(state?: {
    stream?: boolean;
}): {
    seek: boolean;
    time: boolean;
};
