/**
 * rs-sign ジオメトリ（純粋関数）
 *
 * 点列のリサンプリング・Catmull-Rom→3次ベジェ平滑化・筆圧/速度による線幅補間・
 * 可変幅ストロークの外形パス生成。DOM/canvas に依存しないため node:test で検証できる。
 * パス文字列の座標は小数2桁に丸め、同じ入力から常に同じ文字列が得られる（決定的レンダリング）。
 */
/** 小数2桁丸め（パス文字列の決定性のため） */
export function round2(v: any): number;
/**
 * 近すぎる点を間引くリサンプリング。
 * 先頭は必ず残し、直前の採用点から minDist 以上離れた点を採用する。
 * 末尾の点は位置が変わらないよう、離れていれば追加・近ければ無視。
 * @param {{x,y}[]} points
 * @param {number} minDist 最小距離(px)
 */
export function resamplePoints(points: {
    x: any;
    y: any;
}[], minDist?: number): {
    x: any;
    y: any;
}[];
/**
 * 筆圧が「意味を持つ」かの判定。
 * 変化していれば実ペンとみなし true。全点一定でも 0 / 0.5(マウス既定) / 1(タッチ既定)
 * 以外の値なら true（合成イベントで pressure を明示指定したケースを含む）。
 */
export function hasMeaningfulPressure(points: any): boolean;
/**
 * 各点の線幅を計算する。筆圧を第一候補、無ければ速度から補間（速いほど細い）。
 * 入力点 {x, y, t, p} のみから決まる純粋関数（JSONラウンドトリップで同一描画になる）。
 * @returns {number[]} points と同じ長さの幅配列(px)
 */
export function computeWidths(points: any, opts?: {}): number[];
/**
 * Catmull-Rom スプライン（端点は複製）を3次ベジェのセグメント列へ変換する。
 * @param {{x,y}[]} points 2点以上
 * @returns {{p1, c1, c2, p2}[]}
 */
export function catmullRomToBezier(points: {
    x: any;
    y: any;
}[]): {
    p1: any;
    c1: any;
    c2: any;
    p2: any;
}[];
/**
 * 点列＋幅配列を Catmull-Rom 平滑化して高密度サンプル列 [{x, y, w}] に展開する。
 * 分割数は弦長から決める（座標のみに依存 = 決定的）。
 */
export function sampleStroke(points: any, widths: any, opts?: {}): {
    x: any;
    y: any;
    w: any;
}[];
/** 円をポリゴン近似したパス文字列（点・キャップ用の部品ではなく単独の点描画用） */
export function dotPath(cx: any, cy: any, r: any, steps?: number): string;
/**
 * 高密度サンプル列 [{x, y, w}] から可変幅ストロークの外形パス（SVG path d 文字列）を作る。
 * 左縁→終端の丸キャップ→右縁(逆順)→始端の丸キャップ を1つの閉ポリゴンで表す
 * （サブパスを使わないので fill-rule に依存せず、canvas / SVG どちらでも同じ塗りになる）。
 */
export function outlinePath(samples: any, opts?: {}): string;
/**
 * 1ストローク（点列 {x, y, t, p} ＋ ペン設定）→ 外形パス文字列。
 * 署名パッドの表示・PNG・SVG のすべてがこの関数を通るため、同じJSONからは
 * 常に同じパスが得られる。
 * @param {{x,y,t?,p?}[]} points
 * @param {{minWidth?, maxWidth?, pressure?}} opts
 */
export function strokePathData(points: {
    x: any;
    y: any;
    t?: any;
    p?: any;
}[], opts?: {
    minWidth?: any;
    maxWidth?: any;
    pressure?: any;
}): string;
