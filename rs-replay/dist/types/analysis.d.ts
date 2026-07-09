/**
 * レイジクリック（短時間連打）を検出する。
 * 連続するクリックのうち「前のクリックから windowMs 以内」かつ「クラスタ先頭から
 * radius(px) 以内」のものを1クラスタにまとめ、minClicks 以上のクラスタを返す。
 * @param {Array} events t 昇順のイベント配列
 * @param {{minClicks?:number, windowMs?:number, radius?:number}} [options]
 * @returns {Array<{count, tStart, tEnd, t, x, y, id}>}
 */
export function detectRageClicks(events: any[], options?: {
    minClicks?: number;
    windowMs?: number;
    radius?: number;
}): Array<{
    count: any;
    tStart: any;
    tEnd: any;
    t: any;
    x: any;
    y: any;
    id: any;
}>;
/**
 * デッドクリック（DOM無反応クリック）を検出する。
 * クリック後 windowMs 以内に mutation / route / input のいずれも無いクリックを返す。
 * @param {Array} events t 昇順のイベント配列
 * @param {{windowMs?:number}} [options]
 * @returns {Array<{t, x, y, id}>}
 */
export function detectDeadClicks(events: any[], options?: {
    windowMs?: number;
}): Array<{
    t: any;
    x: any;
    y: any;
    id: any;
}>;
/** レイジクリッククラスタ → タイムラインマーカー（Player が使う形 {t,type,label,...}） */
export function rageMarker(cluster: any): {
    t: any;
    type: string;
    label: string;
    count: any;
    x: any;
    y: any;
};
/** デッドクリック → タイムラインマーカー */
export function deadMarker(dead: any): {
    t: any;
    type: string;
    label: string;
    x: any;
    y: any;
};
/**
 * レイジ/デッドクリックをまとめてタイムラインマーカー配列にする（t 昇順）。
 * @param {Array} events
 * @param {{rage?:object, dead?:object}} [options]
 * @returns {Array<{t,type,label}>}
 */
export function analysisMarkers(events: any[], options?: {
    rage?: object;
    dead?: object;
}): Array<{
    t: any;
    type: any;
    label: any;
}>;
/**
 * ファネル（カスタムイベントの到達段階）を集計する。
 * steps は段階を表すカスタムイベント名の配列。既定（ordered: true）では、各セッションで
 * steps を順番どおりに辿れた段階までを「到達」とみなす（前段階を踏まないと次に進めない）。
 * ordered: false では順序を問わず、その名前のイベントが発火したかだけで数える。
 * @param {object|Array|string} sessions セッション（複数可）
 * @param {string[]} steps 段階名の配列
 * @param {{ordered?:boolean}} [options]
 * @returns {{total, ordered, steps: Array<{name,count,rate,stepRate,dropoff}>}}
 */
export function funnelReach(sessions: object | any[] | string, steps: string[], options?: {
    ordered?: boolean;
}): {
    total: any;
    ordered: any;
    steps: Array<{
        name: any;
        count: any;
        rate: any;
        stepRate: any;
        dropoff: any;
    }>;
};
export namespace ANALYSIS {
    let RAGE: string;
    let DEAD: string;
}
