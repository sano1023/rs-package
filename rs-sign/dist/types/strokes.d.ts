/** 記録・復元共通の点正規化（丸めによりラウンドトリップが無損失になる） */
export function normalizePoint(x: any, y: any, t?: number, p?: number): {
    x: number;
    y: number;
    t: number;
    p: number;
};
/**
 * 内部状態 → ストロークJSON（プレーンオブジェクト）。
 * @param {{width, height, strokes}} data
 */
export function encodeStrokes(data: {
    width: any;
    height: any;
    strokes: any;
}): {
    version: number;
    width: number;
    height: number;
    strokes: any;
};
/**
 * ストロークJSON（文字列 or オブジェクト）→ 正規化済み内部構造。
 * 不正な入力は例外を投げる。
 */
export function decodeStrokes(json: any): {
    version: number;
    width: number;
    height: number;
    strokes: any;
};
/**
 * rs-sign ストロークJSONコーデック（純粋関数）
 *
 * 署名の「正のデータ」はストロークJSON（点列 {x, y, t, p} ＋ ペン設定）。
 * PNG/SVG はここから導出される派生物にすぎない。
 * 記録時点で座標を丸めるため encode→decode は完全なラウンドトリップになる。
 *
 * スキーマ (version 1):
 * {
 *   version: 1,
 *   width, height,                     // 記録時のパッド寸法(CSS px)
 *   strokes: [{
 *     color, minWidth, maxWidth, pressure,
 *     points: [{ x, y, t, p }],        // x,y: px(小数2桁) / t: ms(整数) / p: 筆圧0..1(小数3桁)
 *   }],
 * }
 */
export const STROKE_JSON_VERSION: 1;
