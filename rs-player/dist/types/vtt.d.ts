/**
 * rs-player WebVTT パーサ（DOM非依存・字幕の自前レンダリング用）
 *
 * 対応: WEBVTT ヘッダ / NOTE / STYLE / REGION ブロックのスキップ、cue ID 行、
 * タイムスタンプ（HH:MM:SS.mmm / MM:SS.mmm）、複数行テキスト、VTTタグ除去、実体参照の復元。
 * 位置指定などの cue 設定は v0.1 では無視する（テキストのみ取り出す）。
 */
/**
 * "01:02:03.500" / "02:03.500" 形式を秒に変換する。不正なら null。
 * @returns {number|null}
 */
export function parseTimestamp(str: any): number | null;
/** VTTタグ（<v Name> / <b> / <c.class> 等）を除去し、実体参照を戻す */
export function stripTags(text: any): string;
/**
 * WebVTT テキストを cue の配列にパースする。
 * @param {string} text VTTファイルの中身
 * @returns {{start: number, end: number, text: string}[]} start 昇順でソート済み
 */
export function parseVTT(text: string): {
    start: number;
    end: number;
    text: string;
}[];
/**
 * time にかかっている cue を返す（start <= t < end）。
 * @param {{start: number, end: number}[]} cues parseVTT の結果（start 昇順）
 * @param {number} time 秒
 */
export function activeCues(cues: {
    start: number;
    end: number;
}[], time: number): {
    start: number;
    end: number;
}[];
