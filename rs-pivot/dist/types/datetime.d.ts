/**
 * 値が日付らしいかどうか（型推定に使う）。
 * Date インスタンス、または 'YYYY-MM-DD' / 'YYYY/M/D'（時刻付き可）の文字列を日付とみなす。
 */
export function isDateLike(v: any): boolean;
/**
 * 値を { y, m, d } に解析する。解析できなければ null。
 * 文字列はタイムゾーンの影響を避けるため自前でパースする（ローカル日付として扱う）。
 */
export function parseYMD(v: any): {
    y: number;
    m: number;
    d: number;
} | null;
/** 会計年度（4月始まり）。2026年3月 → 2025年度、2026年4月 → 2026年度 */
export function fiscalYearOf(y: any, m: any): any;
/** 四半期番号 1〜4。fiscal=true なら会計四半期（Q1 = 4〜6月） */
export function quarterOf(m: any, fiscal: any): number;
/**
 * 月の並び順コード 0〜11。fiscal=true なら4月=0（年度内の並び順）。
 */
export function monthOrder(m: any, fiscal: any): number;
/** monthOrder の逆変換（コード → 月 1〜12） */
export function monthFromOrder(code: any, fiscal: any): any;
/**
 * ISO 8601 週番号（月曜始まり・木曜を含む週がその年の第1週）を返す（v0.4）。
 * 年またぎの週は「週の属する年（ISO週年）」を持つため、code は isoYear*100+week で単調増加。
 * @returns {{ isoYear:number, week:number }}
 */
export function isoWeek(y: any, m: any, d: any): {
    isoYear: number;
    week: number;
};
/**
 * 日付グルーピングのグループキー（ソート可能な数値コード）を返す。
 * @param {{y:number,m:number,d:number}} ymd
 */
export function dateGroupCode(ymd: {
    y: number;
    m: number;
    d: number;
}, group: any, fiscal: any): any;
/** 日付グルーピングのコード → 表示ラベル */
export function dateGroupLabel(code: any, group: any, fiscal: any): string;
/**
 * rs-pivot 日付ユーティリティ（純粋関数・DOM非依存）
 *
 * 日付フィールドの解析と、年/四半期/月グルーピング（暦年・会計年度=4月始まり）の
 * キー/ラベル計算を担当する。
 */
/**
 * 日付を軸に置いたときに自動展開する粒度（年/四半期/月の3段）。
 * 週/日（v0.4）は自動展開には含めず、明示的な dateGroup 指定でのみ使う。
 */
export const DATE_GROUPS: string[];
/** 指定可能な全粒度（v0.4 で週/日を追加）。dateGroup の妥当性検証・粒度切替UIに使う */
export const DATE_GROUP_ALL: string[];
export namespace DATE_GROUP_LABELS {
    let year: string;
    let quarter: string;
    let month: string;
    let week: string;
    let day: string;
}
