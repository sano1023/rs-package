/**
 * rs-player 自動サムネイル生成（thumbnails: 'auto'）
 *
 * 同一オリジンの動画に限り、裏の <video preload> を等間隔にシークして canvas に描画し、
 * data URL（メモリキャッシュ）としてサムネイル配列を組み立てる。生成した配列は VTTスプライト版と
 * 同じ表示層（seekbar の thumbAt / renderPreview）で使えるよう { start, end, url, x:0, y:0, w, h } 形式。
 * クロスオリジン等でキャンバスが汚染される（toDataURL が投げる）場合は静かに無効化して例外を投げない。
 *
 * computeThumbTimes / isSameOrigin は DOM 非依存の純粋関数（単体テスト対象）。
 */
/**
 * url が現在ページと同一オリジンか判定する。blob: / data: は同一オリジン扱い。
 * location が無い環境（Node）では判定不能なので true を返す（純粋部のテスト用）。
 * @param {string} url
 * @param {string} [base]
 */
export function isSameOrigin(url: string, base?: string): boolean;
/**
 * duration を count 区間に等分し、各区間の中央時刻でサムネを撮る計画を返す。
 * @param {number} duration 秒
 * @param {number} count コマ数
 * @returns {{start:number, end:number, time:number}[]}
 */
export function computeThumbTimes(duration: number, count: number): {
    start: number;
    end: number;
    time: number;
}[];
/**
 * 自動サムネイル生成器を作る。同一オリジンでない src は生成せず null を返す（静かに無効化）。
 * @param {object} opts
 * @param {string} opts.src 動画URL（同一オリジン。ブラウザでシーク可能なこと）
 * @param {Document} opts.doc
 * @param {(list:Array)=>void} opts.onReady サムネ配列が更新されるたびに呼ばれる（逐次反映）
 * @param {number} [opts.count] コマ数（省略時は duration から自動）
 * @param {number} [opts.width] サムネ幅px（既定160）
 * @param {number} [opts.quality] JPEG品質（既定0.6）
 * @returns {{ destroy():void }|null}
 */
export function createAutoThumbnails({ src, doc, onReady, count, width, quality }: {
    src: string;
    doc: Document;
    onReady: (list: any[]) => void;
    count?: number | undefined;
    width?: number | undefined;
    quality?: number | undefined;
}): {
    destroy(): void;
} | null;
