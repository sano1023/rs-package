/**
 * rs-player HLSアダプタ（依存ゼロ堅持 — hls.js は同梱せず、利用側が注入する）
 *
 * import { createRSPlayer, hlsAdapter } from 'rs-player';
 * import Hls from 'hls.js';  // ← 利用側が用意（CDN の <script> でも可）
 * createRSPlayer('#el', {
 *   sources: [{ src: '/live.m3u8', type: 'application/x-mpegURL' }],
 *   adapters: [hlsAdapter(Hls)],   // 画質メニューに hls.js のレベルが出る・AUTO対応
 * });
 *
 * アダプタ契約（PlayerCore が期待する形）:
 *   { name, canPlay?(src, source), attach(video, src) → handle }
 * handle:
 *   { levels, currentLevel, autoLevel?, playingLevel?, isLive?, setLevel(i), on(type,cb)?, destroy() }
 *   - levels        … 正規化済みレベル配列（normalizeHlsLevels の戻り）。マニフェスト解析まで []
 *   - currentLevel  … -1 で AUTO、0.. で固定レベル
 *   - setLevel(i)   … i=-1 で AUTO、i>=0 で固定
 *   - on(type,cb)   … 'levels'（レベル確定/更新）/ 'levelswitch'（自律的な切替）/ 'live'（ライブ判定）
 */
/** hls.js の level 1件から画質ラベルを作る（1080p / 名前 / kbps / レベルN の順で解決） */
export function levelLabel(level: any, index: any): string;
/** hls.js の levels 配列 → メニュー用に正規化する（{ index, label, height, width, bitrate }） */
export function normalizeHlsLevels(rawLevels: any): {
    index: number;
    label: string;
    height: any;
    width: any;
    bitrate: any;
}[];
/** 任意アダプタの levels を index/label 付きに整える（PlayerCore が防御的に使う） */
export function normalizeLevelList(levels: any): any[];
/**
 * hls.js をアダプタ化する。
 * @param {any} Hls hls.js の `Hls` クラス（利用側が import / CDN で用意）
 * @param {object} [opts] { config?: hls.js の設定, name?: アダプタ名 }
 * @returns {{ name: string, canPlay(src, source): boolean, attach(video, src): object }}
 */
export function hlsAdapter(Hls: any, opts?: object): {
    name: string;
    canPlay(src: any, source: any): boolean;
    attach(video: any, src: any): object;
};
