export class DateSelect {
    constructor(target: any, options?: {});
    target: any;
    options: {};
    listeners: {};
    destroyed: boolean;
    labels: any;
    format: any;
    chain: boolean;
    yearFrom: any;
    yearTo: any;
    order: any;
    year: number | null;
    month: any;
    day: any;
    buildDOM(): void;
    root: any;
    yearSelect: any;
    monthBtn: any;
    dayBtn: any;
    hidden: any;
    _onKey: ((e: any) => void) | undefined;
    openModal(title: any, buildBody: any): void;
    overlay: any;
    closeModal(): void;
    openMonthModal(): void;
    openDayModal(): void;
    /** 月末を超えた日を丸める（1/31 → 2月 → 2/28,29） */
    clampDay(): void;
    /** 表示と hidden を状態に同期する */
    sync(): void;
    emitIfComplete(): void;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    getDate(): Date | null;
    /** 整形済み文字列（未完成なら null） */
    getValue(): any;
    /** yyyy-mm-dd 文字列 / Date / null を受け付ける */
    setValue(v: any, { silent }?: {
        silent?: boolean | undefined;
    }): void;
    clear(): void;
    destroy(): void;
}
