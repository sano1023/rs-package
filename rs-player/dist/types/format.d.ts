/**
 * rs-player 時刻フォーマット等の純粋関数（DOM非依存）
 */
/** 値を [min, max] に収める */
export function clamp(v: any, min: any, max: any): any;
/**
 * 秒数を "M:SS" / "H:MM:SS" に整形する。
 * ref（総時間）を渡すと、総時間が1時間以上のとき "0:00:05" のように桁を揃える。
 * NaN / Infinity / 負値は "0:00" 扱い。
 * @param {number} sec 秒
 * @param {number} [ref] 桁揃えの基準になる総時間（秒）
 */
export function formatTime(sec: number, ref?: number): string;
/**
 * aria-valuetext 用の日本語読み（例: 65 → "1分5秒"、3600 → "1時間"）。
 */
export function speakTime(sec: any): string;
