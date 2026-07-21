/** 既定の時間帯プリセット（timePresets オプションで差し替え可能） */
export const DEFAULT_TIME_PRESETS: ({
    key: string;
    label: string;
    from: null;
    to: string;
} | {
    key: string;
    label: string;
    from: string;
    to: null;
})[];
export class SchedulePicker {
    constructor(target: any, options?: {});
    target: any;
    listeners: {};
    destroyed: boolean;
    options: {
        months: number;
        timeStep: number;
        timePresets: ({
            key: string;
            label: string;
            from: null;
            to: string;
        } | {
            key: string;
            label: string;
            from: string;
            to: null;
        })[];
        showTime: boolean;
        showSummary: boolean;
        responsive: boolean;
        hiddenFormat: string;
    };
    locale: any;
    time: {
        type: string;
        from: null;
        to: null;
    };
    build(): void;
    root: any;
    picker: DatePicker | undefined;
    _appliedMonths: any;
    _ro: any;
    summaryEl: any;
    hiddenWrap: any;
    hiddens: {} | undefined;
    buildTimeSection(doc: any): void;
    chipEls: {} | undefined;
    customFrom: any;
    customTo: any;
    customHint: any;
    customRow: any;
    /** コンテナ幅に収まる月数を算出して DatePicker に反映する */
    fitMonths(): void;
    presetByKey(key: any): {
        key: string;
        label: string;
        from: null;
        to: string;
    } | {
        key: string;
        label: string;
        from: string;
        to: null;
    } | null;
    pickTime(type: any): void;
    applyCustomTime(): void;
    /** 時間帯の表示ラベル（サマリー・ヒント共用） */
    timeLabel(): any;
    refresh(): void;
    notify(): void;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    countDays(range: any): number;
    /**
     * @returns {{ from: Date, to: Date, days: number, time: { type, label, from, to } } | null 日付未選択ならnull}
     */
    getValue(): {
        from: Date;
        to: Date;
        days: number;
        time: {
            type: any;
            label: any;
            from: any;
            to: any;
        };
    } | null;
    /** v = { from, to, time?: 'none' | プリセットkey | { from, to } } | null */
    setValue(v: any, { silent }?: {
        silent?: boolean | undefined;
    }): void;
    clear(): void;
    destroy(): void;
}
import { DatePicker } from './picker.js';
