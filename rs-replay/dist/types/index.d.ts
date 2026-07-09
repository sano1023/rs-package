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
/**
 * gzip/非圧縮どちらのバイト列（または JSON文字列・セッションオブジェクト）からでも
 * プレイヤーを生成する（v0.2）。DecompressionStream で自動判別・解凍する。
 * @param {string|HTMLElement} target
 * @param {Uint8Array|ArrayBuffer|string|object} data
 * @param {object} options
 * @returns {Promise<Player>}
 */
export function createRSReplayPlayerFromData(target: string | HTMLElement, data: Uint8Array | ArrayBuffer | string | object, options?: object): Promise<Player>;
/**
 * ヒートマップを生成する（v0.3）。記録済みセッション（単体/配列/JSON文字列）を集計し、
 * 対象要素の上に自前canvasでオーバーレイ描画する。
 * @param {string|HTMLElement} target セレクタ or 要素（この要素にオーバーレイを重ねる）
 * @param {object|Array|string} sessions セッション（複数可・合成される）
 * @param {object} options type('click'|'move'|'scroll') / intensity / radius / opacity /
 *                         showControls / showLegend / lookupRoot / cell / bands / maxDepth
 * @returns {Heatmap} setType / setIntensity / setSessions / getAggregate / on / off / destroy
 */
export function createRSHeatmap(target: string | HTMLElement, sessions: object | any[] | string, options?: object): Heatmap;
import { Recorder } from './recorder.js';
import { Player } from './player.js';
import { Heatmap } from './heatmap.js';
export { Recorder, Player, Heatmap };
export { SCHEMA_VERSION, EV, MARKER_TYPES, validateSession, sessionToJSON, sessionFromJSON, makeChunk, mergeChunks, indexForTime, isRedundantMove, computeInactiveSkips, skipEndFor, extractMarkers, markerLabel } from "./events.js";
export { DEFAULT_MASK_SELECTOR, MASK_CHAR, MASK_FIXED, createMaskReader, maskChars } from "./mask.js";
export { serializeNode, serializeDocument, createIdRegistry } from "./serializer.js";
export { isCompressionSupported, gzipBytes, gunzipBytes, looksGzipped, sessionToGzip, sessionFromGzip } from "./compress.js";
export { isDynamicId, isDynamicClass, isStableId, stableClasses, buildSelector, findNodePath } from "./selector.js";
export { aggregate, aggregateClicks, aggregateMoves, aggregateScroll, normalizeSessions, heatColor, heatGradientCss } from "./heatmap.js";
export { ANALYSIS, detectRageClicks, detectDeadClicks, rageMarker, deadMarker, analysisMarkers, funnelReach } from "./analysis.js";
export { auditSession, findEmails, findPhones, findCardNumbers, luhnValid, isMaskedValue } from "./audit.js";
