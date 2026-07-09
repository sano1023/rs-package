/** スタンプ定義のヘルパー（バリデーションのみ。組み込み印面もこのAPIで作られている） */
export function defineStamp(def: any): any;
export { mulberry32 };
/** 認印: 丸枠＋姓の縦組み中央 */
export const mitomeStamp: any;
/** 角印: 正方形＋社名の右→左縦書き（之印補完） */
export const kakuStamp: any;
/** データー印: 丸枠＋姓/日付/社名の3段（罫線2本） */
export const dataStamp: any;
/** 銀行印風（ginko・v0.3）: 太丸枠＋姓の横彫り（右→左） */
export const ginkoStamp: any;
/** 職印（shoku・v0.3）: 二重円＋外周リングに役職名を円弧配置＋中央に「之印」縦組み */
export const shokuStamp: any;
/** 組み込み印面一式（v0.3 で銀行印・職印を追加） */
export const builtinStamps: any[];
import { mulberry32 } from './seal-layout.js';
