/**
 * レコーダーを生成する。
 * @param {object} options maskSelector / ignoreSelector / chunkInterval / chunkEvents /
 *                         maxBufferedEvents / onChunk / keepSession など
 * @returns {Recorder} start / stop / getSession / on / off / destroy
 */
export function createRSReplayRecorder(options?: object): Recorder;
/**
 * プレイヤーを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object|string} session セッションJSON（オブジェクト or JSON文字列）
 * @param {object} options speed / autoplay
 * @returns {Player} play / pause / seek / setSpeed / on / off / destroy
 */
export function createRSReplayPlayer(target: string | HTMLElement, session: object | string, options?: object): Player;
import { Recorder } from './recorder.js';
import { Player } from './player.js';
export { Recorder, Player };
export { SCHEMA_VERSION, EV, validateSession, sessionToJSON, sessionFromJSON, makeChunk, mergeChunks, indexForTime, isRedundantMove } from "./events.js";
export { DEFAULT_MASK_SELECTOR, MASK_CHAR, MASK_FIXED, createMaskReader, maskChars } from "./mask.js";
export { serializeNode, serializeDocument, createIdRegistry } from "./serializer.js";
