/** 年月日（+時分秒）→ シリアル値。月・日はExcel同様にオーバーフローを繰り上げる */
export function dateToSerial(y: any, m: any, d: any, hh?: number, mm?: number, ss?: number): number;
/** シリアル値 → {y, m, d, hh, mm, ss}（UTC基準の素朴な逆変換） */
export function serialToParts(serial: any): {
    y: number;
    m: number;
    d: number;
    hh: number;
    mm: number;
    ss: number;
    dow: number;
};
/** 現在日時（ローカル）→ シリアル値。dateOnly=true で時刻を切り捨て */
export function nowSerial(dateOnly?: boolean): number;
/** シリアル値 → 和暦 {era, year}。該当なしは null */
export function toWareki(serial: any): {
    era: string;
    year: number;
} | null;
/** 和暦の元号テーブル（開始日のシリアル値つき・新しい順） */
export const ERAS: {
    name: string;
    short: string;
    start: number;
    year: number;
}[];
