/** 春分の日（天文近似式・2000〜2099年有効） */
export function vernalEquinoxDay(y: any): number;
/** 秋分の日（天文近似式・2000〜2099年有効） */
export function autumnalEquinoxDay(y: any): number;
/**
 * その年の祝日一覧（振替休日・国民の休日を含む）を Map<日シリアル値, 名称> で返す。
 * 年単位でメモ化される。有効範囲: 2000〜2099年（範囲外は式の精度保証なし・そのまま計算する）。
 */
export function holidaysOfYear(y: any): any;
/** 祝日名を返す（祝日でなければ null） */
export function holidayName(serial: any): any;
/** その年の祝日を [{ date: 'YYYY-MM-DD', name }] で返す（デバッグ・一覧表示用） */
export function listHolidays(y: any): {
    date: string;
    name: any;
}[];
