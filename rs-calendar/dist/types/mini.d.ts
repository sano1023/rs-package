/**
 * ミニカレンダーを生成する。
 * @param {string|HTMLElement} target
 * @param {object} [options]
 * @returns {MiniCalendar}
 */
export function createRSMiniCalendar(target: string | HTMLElement, options?: object): MiniCalendar;
export class MiniCalendar {
    /**
     * @param {string|HTMLElement} target
     * @param {{ date?: any, weekStart?: number, holidays?: boolean, onPick?: Function }} [options]
     */
    constructor(target: string | HTMLElement, options?: {
        date?: any;
        weekStart?: number;
        holidays?: boolean;
        onPick?: Function;
    });
    _doc: Document;
    _options: {
        date?: any;
        weekStart: number;
        holidays: boolean;
        onPick?: Function;
    };
    _emitter: {
        on: Function;
        emit: Function;
        clear: Function;
    };
    _anchor: number;
    _selected: number;
    _marks: Set<any>;
    _destroyed: boolean;
    _root: HTMLDivElement;
    /** 選択日（'YYYY-MM-DD'） */
    getDate(): string;
    /** 表示・選択日を移動する */
    setDate(date: any): void;
    /** 予定マーク（点）を付ける日を差し替える */
    setMarks(dates: any): void;
    /** イベント購読: 'pick' { date, day } */
    on(event: any, cb: any): any;
    destroy(): void;
    /** 再描画 */
    render(): void;
}
