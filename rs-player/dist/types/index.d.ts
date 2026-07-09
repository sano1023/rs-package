/**
 * プレイヤーを生成する。
 * @param {string|HTMLElement} target コンテナのセレクタ or 要素
 * @param {object} options sources / poster / tracks / autoplay / muted / loop / speeds /
 *   hotkeys / wheelVolume / theme / i18n / adapters / buttons / customButtons / captionStyle など
 * @returns {Player}
 */
export function createRSPlayer(target: string | HTMLElement, options?: object): Player;
/**
 * HLS/DASH 等のソースアダプタ定義のヘルパー（契約の形を検証するだけ）。
 * hls.js を使うだけなら同梱の `hlsAdapter(Hls)` を使う。
 */
export function defineSourceAdapter(def: any): any;
import { Player } from './player.js';
import { definePlayerButton } from './buttons.js';
import { PlayerCore } from './core.js';
import { BUILTIN_BUTTONS } from './buttons.js';
import { ICONS } from './buttons.js';
import { svgIcon } from './buttons.js';
import { HOTKEYS } from './hotkeys.js';
import { resolveHotkey } from './hotkeys.js';
import { isTypingTarget } from './hotkeys.js';
import { formatTime } from './format.js';
import { speakTime } from './format.js';
import { clamp } from './format.js';
import { parseVTT } from './vtt.js';
import { parseTimestamp } from './vtt.js';
import { activeCues } from './vtt.js';
import { stripTags } from './vtt.js';
import { normalizeChapters } from './chapters.js';
import { chapterIndexAt } from './chapters.js';
import { parseSpriteCue } from './thumbnails.js';
import { buildThumbnails } from './thumbnails.js';
import { thumbAt } from './thumbnails.js';
import { normalizeSources } from './core.js';
import { Playlist } from './playlist.js';
import { normalizePlaylistItems } from './playlist.js';
import { nextIndex } from './playlist.js';
import { prevIndex } from './playlist.js';
import { ABLoop } from './abloop.js';
import { frameStepTime } from './abloop.js';
import { isSameOrigin } from './thumbnails-auto.js';
import { computeThumbTimes } from './thumbnails-auto.js';
import { createAutoThumbnails } from './thumbnails-auto.js';
import { watermarkPositionClass } from './watermark.js';
import { STATES } from './state.js';
import { TRANSITIONS } from './state.js';
import { transition } from './state.js';
import { I18N_JA } from './i18n.js';
import { hlsAdapter } from './adapter-hls.js';
import { normalizeHlsLevels } from './adapter-hls.js';
import { normalizeLevelList } from './adapter-hls.js';
import { levelLabel } from './adapter-hls.js';
import { dvrWindow } from './live.js';
import { liveEdgeTime } from './live.js';
import { atLiveEdge } from './live.js';
import { detectLive } from './live.js';
import { applyPreservesPitch } from './live.js';
import { isMediaStream } from './stream-mode.js';
import { streamActive } from './stream-mode.js';
import { streamTrackInfo } from './stream-mode.js';
import { streamUIVisibility } from './stream-mode.js';
import { toAnalyticsHandler } from './analytics.js';
import { formatAnalyticsEvent } from './analytics.js';
import { analyticsTypeFor } from './analytics.js';
import { ANALYTICS_EVENTS } from './analytics.js';
export { definePlayerButton, Player, PlayerCore, BUILTIN_BUTTONS, ICONS, svgIcon, HOTKEYS, resolveHotkey, isTypingTarget, formatTime, speakTime, clamp, parseVTT, parseTimestamp, activeCues, stripTags, normalizeChapters, chapterIndexAt, parseSpriteCue, buildThumbnails, thumbAt, normalizeSources, Playlist, normalizePlaylistItems, nextIndex, prevIndex, ABLoop, frameStepTime, isSameOrigin, computeThumbTimes, createAutoThumbnails, watermarkPositionClass, STATES, TRANSITIONS, transition, I18N_JA, hlsAdapter, normalizeHlsLevels, normalizeLevelList, levelLabel, dvrWindow, liveEdgeTime, atLiveEdge, detectLive, applyPreservesPitch, isMediaStream, streamActive, streamTrackInfo, streamUIVisibility, toAnalyticsHandler, formatAnalyticsEvent, analyticsTypeFor, ANALYTICS_EVENTS };
