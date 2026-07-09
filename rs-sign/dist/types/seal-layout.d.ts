/** mm → px 変換。px = mm / 25.4 * dpi */
export function mmToPx(mm: any, dpi?: number): number;
/**
 * シード付き擬似乱数（mulberry32）。かすれ/にじみ(v0.3)の再現性のための契約。
 * ここ（DOM非依存の純粋層）を単一の定義元とし、stamps.js が再輸出する。
 */
export function mulberry32(seed: any): () => number;
/**
 * かすれ/にじみ用の決定的ノイズ格子（gw×gh の 0..1 値配列）。
 * 同じ seed なら完全に同一・別 seed なら変化する（node 単体テストで決定性を検証）。
 * canvas 側（hanko.js）がこの格子をスケールして destination-out（かすれ）や
 * 輪郭膨張（にじみ）の強度に用いる。DOM に依存しない純粋関数。
 * @returns {{gw, gh, grid: number[]}}
 */
export function fadeNoise(seed?: number, gw?: number, gh?: number): {
    gw: any;
    gh: any;
    grid: number[];
};
/**
 * 日付印用の日付書式。
 * - 'wareki'（既定）: 元号イニシャル＋年 → 'R8.7.7'
 * - 'seireki': 西暦下2桁 → '26.7.7'
 */
export function formatSealDate(date: any, format?: string): string;
/**
 * 認印（mitome）: 丸枠・姓の縦組み中央。
 * - 直径 10.5mm 既定（9〜12mm にクランプ）・枠線 0.35mm
 * - 姓を内径の 82% に収める。1字=1.5倍拡大 / 2字=縦1.15倍 / 3字=0.78倍縮小。字間 -5%
 * @param {string} name 姓（1〜3字を想定）
 * @returns {{shape, sizeMm, frameMm, innerMm, chars: [{ch, x, y, fontMm, scaleX, scaleY}]}}
 */
export function mitomeLayout(name: string, opts?: {}): {
    shape: any;
    sizeMm: any;
    frameMm: any;
    innerMm: any;
    chars: [{
        ch: any;
        x: any;
        y: any;
        fontMm: any;
        scaleX: any;
        scaleY: any;
    }];
};
/**
 * 角印（kaku）: 正方形・社名を右列→左列・各列は上→下の伝統的縦書きで配置。
 * - 辺 21mm 既定（15〜30mm にクランプ）・枠線 0.5mm
 * - 列数 = ceil(√文字数)、行数 = ceil(文字数/列数)
 * - 余りマスは「之印」で補完（padNoIn: true 既定。余り1=「印」・2=「之印」・3以上は空きのまま）
 * @returns {{shape, sizeMm, frameMm, cols, rows, text, chars: [{ch, col, row, x, y, fontMm, scaleX, scaleY}]}}
 *          col は 0 が最右列。x/y は mm（原点中央）。
 */
export function kakuLayout(name: any, opts?: {}): {
    shape: any;
    sizeMm: any;
    frameMm: any;
    cols: any;
    rows: any;
    text: any;
    chars: [{
        ch: any;
        col: any;
        row: any;
        x: any;
        y: any;
        fontMm: any;
        scaleX: any;
        scaleY: any;
    }];
};
/**
 * データー印（data）: 丸枠・3段構成（上段=姓 / 中段=日付 / 下段=社名・部署）。
 * - 直径 12mm 既定・段間に水平罫線2本（シヤチハタ日付印様式）
 * - 日付書式は 'wareki'（'R8.7.7'）/ 'seireki'（'26.7.7'）
 * @param {{name?, company?, date?, dateFormat?}} fields
 * @returns {{shape, sizeMm, frameMm, innerMm, dateText, rules: [{y, x1, x2}],
 *            bands: [{role, text, y, fontMm, scaleX, scaleY}]}}
 */
export function dataLayout(fields?: {
    name?: any;
    company?: any;
    date?: any;
    dateFormat?: any;
}, opts?: {}): {
    shape: any;
    sizeMm: any;
    frameMm: any;
    innerMm: any;
    dateText: any;
    rules: [{
        y: any;
        x1: any;
        x2: any;
    }];
    bands: [{
        role: any;
        text: any;
        y: any;
        fontMm: any;
        scaleX: any;
        scaleY: any;
    }];
};
/**
 * 銀行印風（ginko・v0.3）: 丸枠・太枠・姓を横彫り（横一列・右→左）。
 * - 直径 12mm 既定（9〜16mm にクランプ）・太枠 0.6mm
 * - 文字は水平一列（y=0）に中央揃え、伝統に倣い先頭字を最も右（x 正側）に置く
 * @param {string} name 姓（1〜3字を想定）
 * @returns {{shape, sizeMm, frameMm, innerMm, chars: [{ch, x, y, fontMm, scaleX, scaleY}]}}
 */
export function ginkoLayout(name: string, opts?: {}): {
    shape: any;
    sizeMm: any;
    frameMm: any;
    innerMm: any;
    chars: [{
        ch: any;
        x: any;
        y: any;
        fontMm: any;
        scaleX: any;
        scaleY: any;
    }];
};
/**
 * 職印（shoku・v0.3）: 二重円。外周リングに役職名を円弧配置、中央に「之印」を含む縦組み。
 * - 直径 18mm 既定（15〜30mm にクランプ）・外枠 0.7mm・内円 0.4mm
 * - 外周（リング帯）: 役職名を上弧に左→右（時計回り）で配置。各字は接線方向に回転
 * - 中央（内円内）: 氏名＋「之印」を縦組み（氏名省略時は「之印」）
 * @param {{title?, name?}} fields title=役職名 / name=氏名
 * @returns {{shape:'circle-double', sizeMm, outerR, innerR,
 *            rings: [{r, frameMm}], title, centerText,
 *            arc: [{ch, x, y, fontMm, scaleX, scaleY, rotationRad, radiusMm, angleRad}],
 *            center: [{ch, x, y, fontMm, scaleX, scaleY}]}}
 */
export function shokuLayout(fields?: {
    title?: any;
    name?: any;
}, opts?: {}): {
    shape: "circle-double";
    sizeMm: any;
    outerR: any;
    innerR: any;
    rings: [{
        r: any;
        frameMm: any;
    }];
    title: any;
    centerText: any;
    arc: [{
        ch: any;
        x: any;
        y: any;
        fontMm: any;
        scaleX: any;
        scaleY: any;
        rotationRad: any;
        radiusMm: any;
        angleRad: any;
    }];
    center: [{
        ch: any;
        x: any;
        y: any;
        fontMm: any;
        scaleX: any;
        scaleY: any;
    }];
};
/**
 * rs-sign 印面レイアウト計算（純粋関数）
 *
 * 認印・角印・データー印の文字組みを mm 座標系（原点 = 印面中央、x右向き・y下向き）で
 * 計算する。DOM/canvas に依存しないため node:test で検証でき、canvas 描画と SVG 出力の
 * 両方がこの結果を共有する（同一組版）。
 */
/** 朱色の既定値（CSSカスタムプロパティ --rss-seal-color で差し替え可） */
export const SEAL_COLOR: "#d33a2c";
