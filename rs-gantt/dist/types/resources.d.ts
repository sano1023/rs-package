/**
 * rs-gantt リソース（担当者）割当・稼働集計（純粋関数群）
 *
 * リソース定義・割当の正規化と、リソースヒストグラム（日別の割当合計・過負荷判定・稼働率）を
 * 日シリアル値の純関数として提供する。DOM に依存しないため Node 単体でテストできる。
 *
 * - リソース: { id, name, color?, capacity? }（capacity 既定 1 = 1人日/日）
 * - 割当（task.assignees）: [{ resource, units? }] または ['r1', 'r2']（units 既定 1 = 100%）
 */
/** リソース定義一式を正規化する（id 補完・capacity 既定 1） */
export function normalizeResources(list: any): any;
/**
 * タスクの割当を正規化する。以下をすべて受け付ける:
 *   ['r1', 'r2'] / [{ resource: 'r1', units: 0.5 }] / 'r1' / { resource:'r1' }
 * 同一リソースの重複は最初のものを残す。units は正数のみ（既定 1）。
 * @returns {Array<{resource:any, units:number}>}
 */
export function normalizeAssignees(raw: any): Array<{
    resource: any;
    units: number;
}>;
/** 割当の合計単位（units の総和）。バー上の表示・並び順用 */
export function totalUnits(assignees: any): any;
/** リソース名からアバターのイニシャル（先頭1文字。日本語は姓の頭、英字は大文字） */
export function resourceInitial(name: any): string;
/**
 * リソースヒストグラム: 各リソースの日別割当合計・ピーク・過負荷日を集計する。
 *
 * @param {Array<{start:number, end:number, milestone?:boolean, assignees:Array}>} assignments
 *        内部タスクから作った割当入力（start/end は日シリアル値）。マイルストーンは対象外。
 * @param {Array<{id, name, color, capacity}>} resources normalizeResources 済みのリソース
 * @param {import('./calendar.js').Calendar} calendar 稼働日判定（非稼働日は負荷0）
 * @param {{start:number, end:number}} range 集計する日シリアル値の範囲（両端含む）
 * @returns {{ byResource: Array<{id,name,color,capacity,days:Map<number,number>,peak:number,overloadDays:number[]}>, maxLoad:number, range:object }}
 */
export function computeHistogram(assignments: Array<{
    start: number;
    end: number;
    milestone?: boolean;
    assignees: any[];
}>, resources: Array<{
    id: any;
    name: any;
    color: any;
    capacity: any;
}>, calendar: import("./calendar.js").Calendar, range: {
    start: number;
    end: number;
}): {
    byResource: Array<{
        id: any;
        name: any;
        color: any;
        capacity: any;
        days: Map<number, number>;
        peak: number;
        overloadDays: number[];
    }>;
    maxLoad: number;
    range: object;
};
/** ヒストグラム1リソースの指定日の負荷（未割当日は0） */
export function loadAt(resourceEntry: any, serial: any): any;
