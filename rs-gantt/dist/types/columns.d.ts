/** 列定義のヘルパー（バリデーションのみ・そのまま返す） */
export function defineGanttColumn(def: any): any;
/**
 * リソースのアバターチップ（色付き丸＋イニシャル）を作る。バー・グリッド列で共用。
 * @param {{name, color}} resource
 */
export function makeAvatar(resource: {
    name: any;
    color: any;
}): HTMLSpanElement;
/** 標準列一式（footer は集計フッター行の値を返す・null で空セル） */
export const builtinColumns: any[];
