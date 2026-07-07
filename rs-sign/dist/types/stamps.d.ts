/** シード付き擬似乱数（mulberry32）。かすれ/にじみ(v0.3)の再現性のための契約 */
export function mulberry32(seed: any): () => number;
/** スタンプ定義のヘルパー（バリデーションのみ。組み込み印面もこのAPIで作られている） */
export function defineStamp(def: any): any;
/** 認印: 丸枠＋姓の縦組み中央 */
export const mitomeStamp: any;
/** 角印: 正方形＋社名の右→左縦書き（之印補完） */
export const kakuStamp: any;
/** データー印: 丸枠＋姓/日付/社名の3段（罫線2本） */
export const dataStamp: any;
/** 組み込み印面一式 */
export const builtinStamps: any[];
