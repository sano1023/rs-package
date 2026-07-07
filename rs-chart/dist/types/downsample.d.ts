/**
 * rs-chart ダウンサンプリング
 *
 * LTTB (Largest Triangle Three Buckets):
 * 視覚的特徴（ピーク・谷）を保ったまま点数を threshold まで間引く定番アルゴリズム。
 * 大量データ（Turbo mode）で描画点数を一定に保つために使う。
 */
/**
 * @param {Array<{x:number, y:number}>} points x昇順・y非null前提（nullは事前に除外すること）
 * @param {number} threshold 目標点数（3以上）
 * @returns 間引き後の点配列（元の点オブジェクトをそのまま返す）
 */
export function lttb(points: Array<{
    x: number;
    y: number;
}>, threshold: number): any[];
/** 等間隔ストライド間引き（ナビゲータのミニ表示など、精度不要な用途向け） */
export function stride(points: any, threshold: any): any;
