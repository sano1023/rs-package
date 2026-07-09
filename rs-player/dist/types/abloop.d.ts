/**
 * コマ送りの到達秒。dir>0 で +1/fps、dir<=0 で -1/fps。0〜duration にクランプする。
 * @param {number} current 現在秒
 * @param {number} dir 進む(>0) / 戻る(<=0)
 * @param {number} [fps] フレームレート（既定30）
 * @param {number} [duration] 総時間（既知なら上限）
 * @returns {number}
 */
export function frameStepTime(current: number, dir: number, fps?: number, duration?: number): number;
export class ABLoop {
    constructor(a?: null, b?: null);
    a: any;
    b: any;
    /** A も B も定まり B > A のときだけループ有効 */
    get active(): boolean;
    /** A点をセット（既存 B が A 以下なら無効化） */
    setA(t: any): this;
    /** B点をセット（A 未設定なら A として扱い、A 以下なら A を置き換える） */
    setB(t: any): this;
    /** なし → A → B → 解除 の順に巡回する（1つのキー/ボタンで A-B ループを組む） */
    toggle(t: any): this;
    clear(): this;
    /**
     * time が B を通過した直後なら戻り先 A を返す（それ以外は null）。
     * window でごく近い通過だけをループ対象にし、B より遥か先への手動シークは巻き戻さない。
     * @param {number} time 秒
     * @param {number} [eps] B の手前側の許容
     * @param {number} [window] B の先側でループ対象とみなす幅
     */
    loopTarget(time: number, eps?: number, window?: number): any;
    toJSON(): {
        a: any;
        b: any;
        active: boolean;
    };
}
