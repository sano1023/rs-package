export class DatePicker {
    constructor(target: any, options?: {});
    target: any;
    isInput: boolean;
    listeners: {};
    destroyed: boolean;
    isOpen: boolean;
    viewMode: string;
    pendingFrom: Date | null;
    hoverDate: Date | null;
    focusDate: any;
    value: any;
    panel: any;
    view: {
        year: any;
        month: any;
    };
    time: {
        hours: any;
        minutes: number;
    };
    _onDocDown: (e: any) => void;
    _onFocus: () => void;
    _onInputKey: (e: any) => void;
    _onInputBlur: () => void;
    _onPanelKey: (e: any) => void;
    _onResize: () => void;
    /**
     * name オプション指定時、フォーム送信用の hidden input を生成する。
     * - single:   name そのまま1個（YYYY-MM-DD。showTime時は時刻付き）
     * - multiple: 選択数ぶん name[] を生成（配列で受けられる）
     * - range:    {name}_from / {name}_to の2個（hiddenNames で上書き可）
     */
    buildHidden(): void;
    _hiddenWrap: any;
    hiddenFormat(): any;
    syncHidden(): void;
    setOptions(options: any, initial?: boolean): void;
    options: any;
    locale: any;
    format: any;
    markerMap: Map<any, any> | undefined;
    isDisabledFn: any;
    disabledSet: Set<string> | null | undefined;
    applyRangeColors(): void;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    currentBaseDate(): any;
    isDisabled(d: any): boolean;
    isSelected(d: any): boolean;
    /** range 用: 確定済み or プレビュー中の期間 */
    activeRange(): any;
    render(): void;
    renderDays(doc: any): void;
    _hoverKey: any;
    /** 期間プレビューのクラスをDOM再構築なしで更新する */
    updateRangePreview(): void;
    renderYears(doc: any): void;
    renderMonths(doc: any): void;
    renderTime(doc: any): void;
    renderFooter(doc: any): void;
    navigate(dir: any): void;
    handlePanelKey(e: any): void;
    focusPanel(): void;
    selectDay(d: any): void;
    applyTimeToValue(): void;
    afterChange(shouldClose: any): void;
    formatValue(): any;
    syncInput(): void;
    parseInput(): void;
    open(): void;
    close(): void;
    position(): void;
    getValue(): Date | Date[] | {
        from: Date;
        to: Date;
    } | null;
    setValue(v: any, { silent }?: {
        silent?: boolean | undefined;
    }): void;
    clear(): void;
    update(partial: any): void;
    destroy(): void;
}
