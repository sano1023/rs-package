/**
 * コマンドを op 粒度の {type, payload} 配列へ写像する。
 * @param {object} cmd commands.js が生成したコマンド
 * @param {'do'|'undo'} direction 実行方向（undo は逆操作を返す）
 * @returns {{type:string, payload:object}[]}
 */
export function commandOps(cmd: object, direction?: "do" | "undo"): {
    type: string;
    payload: object;
}[];
