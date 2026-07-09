/**
 * rs-upload 残り時間推定（v0.4）— 転送速度の移動平均から ETA（残り秒数）を算出する純ロジック。
 *
 * DOM 非依存。累積ロード済みバイト数を push していくと、直近ウィンドウ（既定5秒）内の
 * 平均速度（バイト/秒）と、残りバイトを送り切るまでの推定秒数を返す。now を注入できるので
 * Node 単体テストで決定的に検証できる。
 *
 *   const est = createSpeedEstimator();
 *   est.push(loaded);                 // progress のたびに累積ロード済みバイトを渡す
 *   est.speed();                      // → バイト/秒（不足時 null）
 *   est.eta(total - loaded);          // → 残り秒数（速度不明なら null）
 */
/**
 * 速度推定器を作る。
 * @param {object} options
 *   - windowMs   : 移動平均の窓幅(ms・既定 5000)。この幅より古いサンプルは平均から外す
 *   - now        : 現在時刻(ms)を返す関数（既定 Date.now。テストで注入）
 * @returns 推定器
 */
export function createSpeedEstimator(options?: object): {
    /**
     * 累積ロード済みバイトを記録する。ロードが巻き戻った（リトライ/クリア）ら基準をリセット。
     * 窓外の古いサンプルは、窓内の測定に必要な1点だけ残して捨てる。
     */
    push(loaded: any): /*elided*/ any;
    /** 移動平均の速度（バイト/秒）。サンプル不足・時間差0・増分0なら null */
    speed(): number | null;
    /** remainingBytes を送り切るまでの推定秒数。速度不明・0なら null */
    eta(remainingBytes: any): number | null;
    /** サンプルを破棄して仕切り直す（新しい転送バッチの開始時など） */
    reset(): /*elided*/ any;
    /** 診断・テスト用: 現在のサンプル数 */
    readonly size: number;
};
