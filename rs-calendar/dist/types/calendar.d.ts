/**
 * カレンダーを生成する。
 * @param {string|HTMLElement} target
 * @param {object} [options]
 * @returns {Calendar}
 */
export function createRSCalendar(target: string | HTMLElement, options?: object): Calendar;
export namespace DEFAULTS {
    let view: string;
    let date: null;
    let events: never[];
    let weekStart: number;
    let holidays: boolean;
    let hourStart: number;
    let hourEnd: number;
    let slotMinutes: number;
    let snapMinutes: number;
    let slotHeight: number;
    let monthMaxLanes: number;
    let editable: boolean;
    let selectable: boolean;
    let listDays: number;
    let fixedWeeks: boolean;
    let popover: boolean;
    let resources: never[];
    let businessHours: null;
    let eventOverlap: boolean;
    let weekNumbers: boolean;
    let defaultColor: string;
    namespace labels {
        let today: string;
        let month: string;
        let week: string;
        let day: string;
        let list: string;
        let resource: string;
        let prev: string;
        let next: string;
        let allDay: string;
        function more(n: any): string;
        function monthTitle(y: any, m: any): string;
        let noEvents: string;
    }
}
export class Calendar {
    /**
     * @param {string|HTMLElement} target
     * @param {object} [options] {@link DEFAULTS}
     */
    constructor(target: string | HTMLElement, options?: object);
    _doc: Document;
    _container: Element;
    _options: {
        labels: any;
        view: string;
        date: null;
        events: never[];
        weekStart: number;
        holidays: boolean;
        hourStart: number;
        hourEnd: number;
        slotMinutes: number;
        snapMinutes: number;
        slotHeight: number;
        monthMaxLanes: number;
        editable: boolean;
        selectable: boolean;
        listDays: number;
        fixedWeeks: boolean;
        popover: boolean;
        /** リソース（人/部屋/設備）。指定すると 'resource' ビューが使える */
        resources: never[];
        /** 営業時間。{ start: '9:00', end: '18:00', days: [1,2,3,4,5], holidays: false } */
        businessHours: null;
        /** false にすると同じ列（日/リソース）で予定を重ねられない（ドラッグを拒否） */
        eventOverlap: boolean;
        /** ISO 8601 週番号を表示する（月ビューの各週・週ビューのタイトル） */
        weekNumbers: boolean;
        defaultColor: string;
    };
    _emitter: {
        on: Function;
        emit: Function;
        clear: Function;
    };
    _views: string[];
    _view: string;
    _anchor: number;
    _events: object[];
    _destroyed: boolean;
    _drag: any;
    /** 現在のビュー名 */
    getView(): string;
    /** 表示基準日（'YYYY-MM-DD'） */
    getDate(): string;
    /** ビューを切り替える */
    setView(view: any): void;
    /** 表示日を移動する */
    setDate(date: any): void;
    next(): void;
    prev(): void;
    today(): void;
    /** イベント購読: eventClick / dateClick / select / eventChange / change / viewChange */
    on(event: any, cb: any): any;
    /** イベントを追加する（正規化して返す） */
    addEvent(input: any): object;
    /** id 指定で更新する（start/end/title など部分パッチ） */
    updateEvent(id: any, patch: any): object | null;
    /** id 指定で削除する */
    removeEvent(id: any): boolean;
    /** 全イベントを差し替える */
    setEvents(list: any): void;
    /** 正規化済みイベントの複製を返す */
    getEvents(): {}[];
    /** ICS テキストを取り込む（追加・取り込んだ件数を返す） */
    importICS(text: any): number;
    /** 全イベントを ICS テキストにする */
    exportICS(options: any): string;
    /**
     * 繰り返しの occurrence を編集する（v0.2）。
     * @param {string} id シリーズのイベント id
     * @param {number|string} day occurrence の開始日（日シリアル値 or 'YYYY-MM-DD'）
     * @param {object} patch 変更内容（start/end/title など）
     * @param {'one'|'future'|'all'} [scope='one'] この予定のみ / これ以降すべて / シリーズ全体
     * @returns {object|null} 変更後の主イベント（one=切り出した単発 / future=新シリーズ / all=シリーズ）
     */
    updateOccurrence(id: string, day: number | string, patch: object, scope?: "one" | "future" | "all"): object | null;
    /**
     * 繰り返しの occurrence を削除する（v0.2）。
     * @param {string} id
     * @param {number|string} day
     * @param {'one'|'future'|'all'} [scope='one']
     * @returns {boolean}
     */
    removeOccurrence(id: string, day: number | string, scope?: "one" | "future" | "all"): boolean;
    /** DOM・リスナーを破棄する */
    destroy(): void;
    /** @private */
    private _mount;
    _root: HTMLDivElement | undefined;
    _title: HTMLDivElement | undefined;
    _viewButtons: {} | undefined;
    _body: HTMLDivElement | undefined;
    /** @private ビューごとの移動量 */
    private _shift;
    /** @private 再描画（現在ビュー） */
    private render;
    /** @private 週の先頭（weekStart 基準） */
    private _weekStartOf;
    /** @private イベント → normalizeEvent へ渡し直せる入力形式 */
    private _eventToInput;
    /** @private イベント色 */
    private _colorOf;
    /** @private */
    private _renderMonth;
    /** @private 週帯のセグメント DOM（月ビュー・終日行 共用） */
    private _renderSegment;
    /** @private 月ビューのドラッグ（日単位の移動） */
    private _attachMonthDrag;
    _dragMoved: boolean | undefined;
    /**
     * @private その日の営業時間外レンジ（当日分・[from, to) の配列）を返す。
     * businessHours 未設定なら空。非営業日（曜日外・祝日）は全日。
     */
    private _nonBusinessRanges;
    /**
     * @private 重複禁止（eventOverlap: false）の違反判定。
     * 同じ列（リソース指定時は同一リソース）の時間つき予定と重なるなら true。
     */
    private _violatesOverlap;
    /** @private 繰り返し occurrence の移動（「この予定のみ」・array スナップショットで revert） */
    private _commitOccurrenceMove;
    /** @private 変更を反映して eventChange を発火（revert つき） */
    private _commitMove;
    /**
     * @private 時間グリッド（週/日/リソースビュー共用）
     * @param {number} startDay
     * @param {number} dayCount
     * @param {object[]|null} [resources] 指定するとリソースビュー（列 = リソース・同一日）
     */
    private _renderTimeGrid;
    /** @private 週/日ビューのドラッグ（移動・リサイズ・空き選択） */
    private _attachTimeGridDrag;
    /** @private */
    private _closePopover;
    _popover: {
        el: HTMLDivElement;
        cleanup: () => void;
    } | null | undefined;
    /** @private イベント詳細/編集ポップオーバー */
    private _openPopover;
    /** @private */
    private _renderList;
}
