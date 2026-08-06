/**
 * その日の occurrence をシリーズから除外する。
 * @param {object} event 正規化済みイベント（rrule 必須）
 * @param {number} day 日シリアル値
 * @returns {object} EXDATE を追加した複製
 */
export function excludeOccurrence(event: object, day: number): object;
/**
 * 「この予定のみ」変更 — occurrence を単発イベントへ切り出す。
 * @param {object} event 正規化済みイベント（rrule 必須）
 * @param {number} day 切り出す occurrence の開始日（日シリアル値）
 * @param {object} [patch] 切り出した単発への上書き（start/end/title など normalizeEvent 入力）
 * @returns {{ series: object, detached: object }} series=EXDATE 追加済み・detached=単発
 */
export function detachOccurrence(event: object, day: number, patch?: object): {
    series: object;
    detached: object;
};
/**
 * 「これ以降すべて」変更 — day を境にシリーズを分割する。
 * 元イベントは UNTIL=day-1 で打ち切り、day から始まる新シリーズを作る。
 *
 * @param {object} event 正規化済みイベント（rrule 必須）
 * @param {number} day 分割点（この日の occurrence から新シリーズ）
 * @param {object} [patch] 新シリーズへの上書き（title / start の時刻変更など）
 * @returns {{ before: object|null, after: object }}
 *   before=打ち切った旧シリーズ（分割点が初回なら null）・after=新シリーズ
 */
export function splitSeries(event: object, day: number, patch?: object): {
    before: object | null;
    after: object;
};
