/**
 * プレイヤーを生成する。
 * @param {string|HTMLElement} target コンテナのセレクタ or 要素
 * @param {object} options sources / poster / tracks / autoplay / muted / loop / speeds /
 *   hotkeys / wheelVolume / theme / i18n / adapters / buttons / customButtons / captionStyle など
 * @returns {Player}
 */
export function createRSPlayer(target: string | HTMLElement, options?: object): Player;
/**
 * HLS/DASH 等のソースアダプタ定義のヘルパー（契約の形を検証するだけ。v0.4 で hls.js ラッパーを同梱予定）。
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
import { normalizeSources } from './core.js';
import { STATES } from './state.js';
import { TRANSITIONS } from './state.js';
import { transition } from './state.js';
import { I18N_JA } from './i18n.js';
export { definePlayerButton, Player, PlayerCore, BUILTIN_BUTTONS, ICONS, svgIcon, HOTKEYS, resolveHotkey, isTypingTarget, formatTime, speakTime, clamp, parseVTT, parseTimestamp, activeCues, stripTags, normalizeSources, STATES, TRANSITIONS, transition, I18N_JA };
