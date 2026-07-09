/**
 * セッションレコーダー hook（createRSReplayRecorder）。
 *
 * Recorder は画面を持たない記録エンジンなのでコンポーネント化せず hook にした。
 * マウント時に start()、アンマウント時に stop() → destroy() を呼ぶ。
 * 返り値の stop() はセッションを返す（実 API の stop() は recorder を返すため、
 * ここでは stop 後の getSession() をラップ。keepSession:false のときは null）。
 *
 * @param {object} options createRSReplayRecorder のオプション（マウント時スナップショット）
 * @returns 記録操作の集合（stop/getSession/addEvent など。安定参照）
 */
export function useRSReplayRecorder(options?: object): null;
/**
 * セッションリプレイ・プレイヤー（createRSReplayPlayer）。
 * session は構築時にのみ読まれる（setSession は実装に無い）ため、session が
 * 変わったら作り直す。speed / skipInactive は実在するセッターで追従する。
 */
export const RsReplayPlayer: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
/**
 * ヒートマップ・オーバーレイ（createRSHeatmap）。
 * sessions / type / intensity は実在するセッターで追従。他はマウント時スナップショット。
 */
export const RsHeatmap: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
export default RsReplayPlayer;
import React from 'react';
