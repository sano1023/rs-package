/**
 * 再計算されたセル id 集合のうち、指定シートかつ可視範囲に入るものを
 * 'row,col' キーの Set にして返す（差分描画の対象セル）。純粋関数。
 * @param {Iterable<string>} recalcedIds セル id（`${sheet}:${row},${col}`）
 * @param {number} sheetIndex 表示中のシート
 * @param {{r0:number,r1:number,c0:number,c1:number}} view 可視範囲
 * @returns {Set<string>} 'r,c' キーの集合
 */
export function dirtyCellsInView(recalcedIds: Iterable<string>, sheetIndex: number, view: {
    r0: number;
    r1: number;
    c0: number;
    c1: number;
}): Set<string>;
/**
 * セル id 集合を { [sheet]: Set<'r,c'> } にまとめる純粋関数（複数シートのバッチ整理用）。
 */
export function groupIdsBySheet(ids: any): Map<any, any>;
/**
 * 再描画バッチャ。request() を何回呼んでも、スケジュールされた1回の flush に束ねる。
 * スケジューラ（既定は queueMicrotask）を差し替えられるので node で決定的にテストできる。
 */
export class RenderBatcher {
    /**
     * @param {(ids: Set<string>, full: boolean) => void} flushFn 束ねた再描画を実行する
     * @param {(cb: () => void) => void} [schedule] 既定 queueMicrotask
     */
    constructor(flushFn: (ids: Set<string>, full: boolean) => void, schedule?: (cb: () => void) => void);
    _flush: (ids: Set<string>, full: boolean) => void;
    _schedule: (cb: () => void) => void;
    pending: Set<any>;
    full: boolean;
    scheduled: boolean;
    requestCount: number;
    flushCount: number;
    /**
     * 再描画を要求する（実行は microtask に遅延・束ねられる）。
     * @param {Iterable<string>} [ids] 差分描画したいセル id
     * @param {boolean} [full] 全面再描画が必要か（結合・条件付き書式など）
     */
    request(ids?: Iterable<string>, full?: boolean): void;
    /** スケジュールされた flush を実行する（内部・スケジューラから呼ばれる） */
    run(): void;
    /** 保留中の再描画があれば即時に実行する（同期が要る箇所・破棄前用） */
    flushNow(): void;
    /** 保留をスケジュールごと捨てる（destroy 用） */
    cancel(): void;
}
