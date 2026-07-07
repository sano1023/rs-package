/** 範囲内にクランプする */
export function clampZoom(z: any): number;
/** 現在値より1段階大きいプリセット値 */
export function nextZoom(z: any): number;
/** 現在値より1段階小さいプリセット値 */
export function prevZoom(z: any): number;
/** コンテナ幅いっぱいに収まるズーム値（フィット幅） */
export function fitWidthZoom(size: any, rotation: any, containerWidth: any, padding?: number): number;
/** ページ全体がコンテナに収まるズーム値（フィットページ） */
export function fitPageZoom(size: any, rotation: any, containerWidth: any, containerHeight: any, padding?: number): number;
/**
 * ズーム指定（'fit-width' | 'fit-page' | 数値）を実際の倍率に解決する。
 */
export function resolveZoom(mode: any, size: any, rotation: any, containerWidth: any, containerHeight: any, padding?: number): number;
/** '150%' 形式の表示文字列 */
export function formatZoom(z: any): string;
export const ZOOM_MIN: 0.25;
export const ZOOM_MAX: 6;
/** ＋/−ボタンで巡回するプリセット段階 */
export const ZOOM_STEPS: number[];
