/**
 * rs-player チャプター（DOM非依存の純粋ロジック）
 *
 * チャプター定義は 2 形式を受け付ける:
 *   1. 配列: [{ start, title, end? }]（秒）
 *   2. WebVTT テキスト: parseVTT の cue（text = チャプタータイトル）
 * normalizeChapters() で start 昇順・end 補完（次章の開始 / 総時間）済みの配列にそろえる。
 * UI 層（seekbar のマーカー・設定メニューのチャプター一覧）はこの配列だけを描画に使う。
 */
/**
 * チャプター入力を正規化する。
 * @param {Array<{start:number,title?:string,end?:number}>} input
 * @param {number} [duration] 総時間（秒）。既知なら最終章の end を埋める
 * @returns {Array<{start:number,end:number,title:string,index:number}>}
 */
export function normalizeChapters(input: Array<{
    start: number;
    title?: string;
    end?: number;
}>, duration?: number): Array<{
    start: number;
    end: number;
    title: string;
    index: number;
}>;
/**
 * time にかかっているチャプターの index を返す（start <= time < end、最終章は end 含む）。
 * @param {Array<{start:number,end:number}>} chapters normalizeChapters の結果
 * @param {number} time 秒
 * @returns {number} index。該当なしは -1
 */
export function chapterIndexAt(chapters: Array<{
    start: number;
    end: number;
}>, time: number): number;
