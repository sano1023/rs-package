/** serial を含む週の月曜日 */
export function weekStart(serial: any): number;
/** serial を含む月の1日 */
export function monthStart(serial: any): number;
export namespace ZOOM_LEVELS {
    namespace day {
        let pxPerDay: number;
    }
    namespace week {
        let pxPerDay_1: number;
        export { pxPerDay_1 as pxPerDay };
    }
    namespace month {
        let pxPerDay_2: number;
        export { pxPerDay_2 as pxPerDay };
    }
}
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
