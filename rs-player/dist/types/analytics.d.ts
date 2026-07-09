/**
 * PlayerCore のイベント種別 → アナリティクスの type 名へ正規化する（純粋関数）。
 * 進捗マイルストーン（progress25/50/75/100）は 'progress' に畳み込む。
 * @param {string} coreType
 * @returns {string}
 */
export function analyticsTypeFor(coreType: string): string;
/**
 * 利用側が注入したアナリティクス指定を、単一の dispatch 関数に正規化する。
 * 受け付ける形: 関数 / { track } / { send } / { handleEvent } / それらの配列。
 * 有効なものが無ければ null。
 * @param {*} analytics
 * @returns {((event: object) => void) | null}
 */
export function toAnalyticsHandler(analytics: any): ((event: object) => void) | null;
/**
 * 視聴イベントを整形する（純粋関数・送信はしない）。
 * @param {string} type アナリティクス type（analyticsTypeFor で正規化済み）
 * @param {{ currentTime?: number, duration?: number, at?: number }} [ctx] 再生コンテキスト
 * @param {object} [detail] 付随情報（milestone / rate / quality など。undefined は無視）
 * @returns {{ type: string, position?: number, duration?: number, percent?: number, at?: number }}
 */
export function formatAnalyticsEvent(type: string, ctx?: {
    currentTime?: number;
    duration?: number;
    at?: number;
}, detail?: object): {
    type: string;
    position?: number;
    duration?: number;
    percent?: number;
    at?: number;
};
/** 本体が視聴イベントとして流す PlayerCore イベント種別（順序の目安） */
export const ANALYTICS_EVENTS: string[];
