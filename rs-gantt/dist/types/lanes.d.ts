/**
 * rs-gantt v0.5 スケジューラビュー: 重なり段組み（レーン）レイアウト（純粋関数群）
 *
 * 同一リソース内で時間が重なるイベントを別々の「レーン（段）」へ振り分ける。
 * 入力（イベントの [start, end) 半開区間）→ 出力（各イベントのレーン番号・レーン総数）の純関数で、
 * DOM に依存しないため Node 単体でテストできる。start/end は分シリアル値（date-utils の分単位整数）。
 *
 * アルゴリズム: 開始時刻でソートし、各イベントを「最後のイベントが現在時刻までに終わっている
 * 最初の空きレーン」へ割り当てる（first-fit）。区間グラフの彩色数（=最大同時重なり数）に一致する
 * 最小レーン数になる。end == 次の start（隣接）は重ならない扱い。
 */
/**
 * イベント群を重なりでレーンに振り分ける。
 * @param {Array<{id:any, start:number, end:number}>} events start/end は分シリアル値（end 排他）
 * @returns {{ laneOf: Map<any, number>, lanes: number, order: Array }}
 *   laneOf: イベントID → レーン番号（0 始まり） / lanes: レーン総数（最低 0） / order: 並び替え後の配列
 */
export function packLanes(events: Array<{
    id: any;
    start: number;
    end: number;
}>): {
    laneOf: Map<any, number>;
    lanes: number;
    order: any[];
};
/** 2つの区間が重なるか（半開区間 [start, end)。隣接 end==start は重ならない） */
export function overlaps(a: any, b: any): boolean;
/**
 * イベント一式をリソースごとに段組みレイアウトする（純粋関数）。
 * リソース定義順を保ち、割当先リソースが未定義のイベントは unresourced にまとめる。
 *
 * @param {Array<{id, resource, start:number, end:number}>} events 分シリアル値の start/end を持つイベント
 * @param {Array<{id}>} resources 表示するリソース（順序を保持）
 * @returns {{
 *   byResource: Array<{ id, laneCount:number, placements: Array<{event, lane:number}> }>,
 *   unresourced: Array<{event, lane:number}>,
 *   maxLanes: number
 * }}
 */
export function layoutScheduler(events: Array<{
    id: any;
    resource: any;
    start: number;
    end: number;
}>, resources: Array<{
    id: any;
}>): {
    byResource: Array<{
        id: any;
        laneCount: number;
        placements: Array<{
            event: any;
            lane: number;
        }>;
    }>;
    unresourced: Array<{
        event: any;
        lane: number;
    }>;
    maxLanes: number;
};
