/**
 * "sprite.png#xywh=0,0,160,90" を { url, x, y, w, h } に分解する。
 * base（VTTファイルのURL）が与えられれば相対URLを解決する。#xywh が無ければ x/y/w/h は null。
 * @param {string} text cue テキスト
 * @param {string} [base] 相対URL解決の基準
 * @returns {{url:string, x:number|null, y:number|null, w:number|null, h:number|null}|null}
 */
export function parseSpriteCue(text: string, base?: string): {
    url: string;
    x: number | null;
    y: number | null;
    w: number | null;
    h: number | null;
} | null;
/**
 * サムネイルVTTのテキストを { start, end, url, x, y, w, h }[] にパースする（start 昇順）。
 * @param {string} vttText VTTファイルの中身
 * @param {string} [base] 画像URLの相対解決基準（= VTTファイルのURL）
 */
export function buildThumbnails(vttText: string, base?: string): {
    url: string;
    x: number | null;
    y: number | null;
    w: number | null;
    h: number | null;
    start: number;
    end: number;
}[];
/**
 * time に対応するサムネイルを返す（start <= time < end。範囲外は最も近いコマ）。
 * @param {Array} thumbs buildThumbnails の結果
 * @param {number} time 秒
 */
export function thumbAt(thumbs: any[], time: number): any;
