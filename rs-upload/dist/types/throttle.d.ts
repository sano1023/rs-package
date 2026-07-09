/**
 * rs-upload 帯域スロットリング（v0.4）— maxBytesPerSec を守るトークンバケット的レートリミッタ。
 *
 * DOM 非依存の純ロジック。仮想クロック方式のリーキーバケットで、送信するバイト数を予約すると
 * 「送信開始まで待つべきミリ秒」を返す。呼び出し側（chunkedTransport 等）はその時間だけ sleep してから
 * 実際に送る。now を注入できるので Node 単体テストで決定的に検証できる。
 *
 *   const throttle = createThrottle({ bytesPerSec: 1024 * 1024 });   // 1 MB/s
 *   const wait = throttle.reserve(chunk.size);                       // このチャンクを送るまでの待ち(ms)
 *   if (wait > 0) await sleep(wait);
 *
 * 長期的な平均送信レートは bytesPerSec を超えない（burst を指定した分だけ瞬間的な先出しを許す）。
 */
/**
 * レートリミッタを作る。
 * @param {object} options
 *   - bytesPerSec : 上限レート（バイト/秒・正の数・必須）
 *   - burst       : 瞬間的に先出しを許すバイト数（アイドル後のバースト上限。既定 0 ＝ 厳密ペーシング）
 *   - now         : 現在時刻(ms)を返す関数（既定 Date.now。テストで注入）
 * @returns {{ reserve(bytes): number, cursor: number|null, bytesPerSec: number, burst: number }}
 */
export function createThrottle(options?: object): {
    reserve(bytes: any): number;
    cursor: number | null;
    bytesPerSec: number;
    burst: number;
};
/**
 * maxBytesPerSec 指定を createThrottle に渡せる形へ正規化する（未指定/0/負なら null＝制限なし）。
 * @param {number|object} spec 数値（bytesPerSec）または { bytesPerSec, burst }
 * @param {object} extra now などの追加設定
 */
export function normalizeThrottle(spec: number | object, extra?: object): {
    reserve(bytes: any): number;
    cursor: number | null;
    bytesPerSec: number;
    burst: number;
} | null;
