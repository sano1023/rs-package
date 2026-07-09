export class FieldPanel {
    /**
     * @param {HTMLElement} host 描画先
     * @param {object} ctx { model: SliceModel, getStore: () => store, registry: Map }
     */
    constructor(host: HTMLElement, ctx: object);
    ctx: object;
    grabbed: {
        pill: any;
        zone: any;
        index: number;
        field: any;
        dateGroup: any;
        keep?: undefined;
    } | {
        keep: boolean;
        field: any;
        dateGroup: any;
        pill?: undefined;
        zone?: undefined;
        index?: undefined;
    } | {
        pill: any;
        zone: any;
        index: number;
        field: any;
        dateGroup: any;
        keep?: undefined;
    } | null;
    pendingFocus: {
        zone: any;
        field: any;
        dateGroup: any;
        grab?: undefined;
    } | {
        zone: string;
        field: any;
        dateGroup: null;
        grab?: undefined;
    } | {
        zone: string;
        field: any;
        dateGroup: null;
        grab?: undefined;
    } | {
        zone: string;
        field: any;
        dateGroup: any;
        grab: boolean;
    } | {
        zone: string;
        field: any;
        dateGroup: null;
        grab: boolean;
    } | {
        zone: any;
        field: any;
        dateGroup: any;
        grab: boolean;
    } | {
        zone: string;
        field: any;
        dateGroup: null;
        grab?: undefined;
    } | {
        zone: any;
        field: any;
        dateGroup: any;
        grab?: undefined;
    } | {
        zone: any;
        field: any;
        dateGroup: any;
        grab?: undefined;
    } | {
        zone: string;
        field: any;
        dateGroup: null;
        grab?: undefined;
    } | {
        zone: any;
        field: any;
        dateGroup: any;
        grab?: undefined;
    } | null;
    popup: HTMLDivElement | null;
    el: HTMLDivElement;
    templateSelect: HTMLSelectElement | null;
    templateName: HTMLInputElement | null;
    zoneEls: {};
    liveEl: HTMLDivElement;
    _onDocDown: (e: any) => void;
    _makeZone(zone: any): HTMLDivElement;
    /** レポートテンプレート管理バー（名前付きスライスの保存/呼び出し/削除・v0.4） */
    _makeTemplateBar(): HTMLDivElement;
    /** テンプレート選択 <select> を保存済み一覧で作り直す */
    renderTemplates(): void;
    _announce(msg: any): void;
    /** モデルからピルを再構築する */
    render(): void;
    _makePill({ zone, index, field, dateGroup, label, placed, filtered, sorted, topN, ratio, calc }: {
        zone: any;
        index: any;
        field: any;
        dateGroup: any;
        label: any;
        placed: any;
        filtered: any;
        sorted: any;
        topN: any;
        ratio: any;
        calc: any;
    }): HTMLSpanElement;
    _attachDrag(pill: any): void;
    /** ドロップ位置（ゾーン内の挿入インデックス）を求める */
    _insertIndexIn(zoneBody: any, x: any, y: any, exclude: any): number;
    _drop(from: any, to: any): void;
    _onPillKey(e: any, pill: any): void;
    _restoreFocus(): void;
    _closePopup(): void;
    _openPopup(anchor: any, className: any): HTMLDivElement;
    _menu(anchor: any, items: any, onPick: any): void;
    _openAggMenu(anchor: any, index: any): void;
    /** 日付粒度メニュー（行/列の日付ピル）: 年/四半期/月/週/日（v0.4） */
    _openDateGroupMenu(anchor: any, zone: any, index: any): void;
    _openSortMenu(anchor: any, zone: any, index: any): void;
    /** 割合表示メニュー（値ピル）: 生値 / 行比 / 列比 / 総計比 */
    _openShowAsMenu(anchor: any, index: any): void;
    /** Top-N メニュー（行/列ピル）: 上位/下位 N 件でまとめる */
    _openTopNMenu(anchor: any, zone: any, index: any): void;
    _openFilterPopup(anchor: any, field: any): void;
    destroy(): void;
}
