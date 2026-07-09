/** serial を含む週の月曜日 */
export function weekStart(serial: any): number;
/** serial を含む月の1日 */
export function monthStart(serial: any): number;
/** serial を含む月の末日 */
export function monthEnd(serial: any): number;
/** serial を含む四半期の初日（1/4/7/10月の1日） */
export function quarterStart(serial: any): number;
/** serial を含む四半期の末日 */
export function quarterEnd(serial: any): number;
/** serial を含む四半期番号（1〜4） */
export function quarterOf(serial: any): number;
/** serial を含む年の初日 */
export function yearStart(serial: any): number;
/** serial を含む年の末日 */
export function yearEnd(serial: any): number;
export namespace ZOOM_LEVELS {
    namespace hour {
        let pxPerDay: number;
    }
    namespace day {
        let pxPerDay_1: number;
        export { pxPerDay_1 as pxPerDay };
    }
    namespace week {
        let pxPerDay_2: number;
        export { pxPerDay_2 as pxPerDay };
    }
    namespace month {
        let pxPerDay_3: number;
        export { pxPerDay_3 as pxPerDay };
    }
    namespace quarter {
        let pxPerDay_4: number;
        export { pxPerDay_4 as pxPerDay };
    }
    namespace year {
        let pxPerDay_5: number;
        export { pxPerDay_5 as pxPerDay };
    }
}
/** ズームの並び（細かい→粗い）。Ctrl+ホイール/zoomStep の段階順 */
export const ZOOM_ORDER: string[];
export class TimeScale {
    /**
     * @param {'day'|'week'|'month'} zoom
     * @param {number} minSerial 表示したい最小日
     * @param {number} maxSerial 表示したい最大日
     */
    constructor(zoom: "day" | "week" | "month", minSerial: number, maxSerial: number);
    zoom: "day" | "week" | "month";
    pxPerDay: number;
    start: number;
    end: number;
    /** タイムライン全体の幅(px) */
    get width(): number;
    /** 日シリアル値 → x座標(px) */
    x(serial: any): number;
    /** x座標(px) → 日シリアル値 */
    serialAt(px: any): number;
    /** バーの幅(px): start〜end（両端含む）の暦日スパン */
    barWidth(startSerial: any, endSerial: any): number;
    /**
     * 2段ヘッダーのセルを返す。
     * @returns {{ top: Array<{x,w,label}>, bottom: Array<{x,w,label,sub,serial,nonwork}> }}
     */
    headerCells(calendar: any): {
        top: Array<{
            x: any;
            w: any;
            label: any;
        }>;
        bottom: Array<{
            x: any;
            w: any;
            label: any;
            sub: any;
            serial: any;
            nonwork: any;
        }>;
    };
}
