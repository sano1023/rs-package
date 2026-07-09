/** カレンダーを生成する（オプションは Calendar のコンストラクタ参照） */
export function createCalendar(options: any): Calendar;
export class Calendar {
    /**
     * @param {object} [options]
     * @param {number[]} [options.workdays] 稼働曜日（0=日〜6=土）。既定 [1,2,3,4,5]
     * @param {'jp'|false} [options.holidays] 'jp'=日本の祝日を非稼働に（既定）。false で無効
     * @param {boolean} [options.yearEnd] 年末年始 12/29〜1/3 を非稼働に（既定 true）
     * @param {Array<string|Date|number>} [options.customHolidays] 追加の休日
     * @param {Array<string|Date|number>} [options.customWorkdays] 例外的な出勤日（休日出勤）
     * @param {boolean} [options.scheduleOnHolidays] true で休日にも予定を引ける
     *   （スナップ・日数計算が暦日ベースになる。isWorkday/isHoliday は表示用に実カレンダーのまま）
     */
    constructor(options?: {
        workdays?: number[] | undefined;
        holidays?: false | "jp" | undefined;
        yearEnd?: boolean | undefined;
        customHolidays?: (string | number | Date)[] | undefined;
        customWorkdays?: (string | number | Date)[] | undefined;
        scheduleOnHolidays?: boolean | undefined;
    });
    workdays: Set<number>;
    holidays: string | boolean;
    yearEnd: boolean;
    customHolidays: Set<number>;
    customWorkdays: Set<number>;
    scheduleOnHolidays: boolean;
    /** 稼働日か（customWorkdays > customHolidays > 祝日/年末年始/曜日 の優先順） */
    isWorkday(serial: any): boolean;
    /** 非稼働日か */
    isHoliday(serial: any): boolean;
    /** serial 以降（当日含む）で最初の稼働日 */
    nextWorkday(serial: any): any;
    /** serial 以前（当日含む）で最初の稼働日 */
    prevWorkday(serial: any): any;
    /**
     * 稼働日 serial から営業日で n 日進めた稼働日を返す（n=0 で当日、負数で戻る）。
     * serial が非稼働日なら、まず次（負方向なら前）の稼働日に揃えてから数える。
     */
    addWorkdays(serial: any, n: any): any;
    /** [start, end]（両端含む）の営業日数 */
    countWorkdays(start: any, end: any): number;
    /** 開始稼働日 + 営業日数 duration（>=1）→ 終了日（含む）。duration=1 なら開始日当日 */
    endFromDuration(start: any, duration: any): any;
    /** 終了稼働日 − 営業日数 duration（>=1）→ 開始日。endFromDuration の逆（SS/FF/SF・後退パス用） */
    startFromDuration(end: any, duration: any): any;
    /** 開始〜終了（両端含む）→ 営業日数（最低1） */
    durationFromRange(start: any, end: any): number;
}
