/**
 * 独自書式を登録する。
 *   defineFormat('mynum', (value, arg) => ...);
 *   { format: 'mynum:2' }  // arg = ['2']
 * @param {string} name
 * @param {(value:any, args:string[], row?:object) => string} fn
 */
export function defineFormat(name: string, fn: (value: any, args: string[], row?: object) => string): void;
/** 登録済み独自書式名の一覧（テスト・デザイナ用） */
export function listFormats(): any[];
/**
 * 数値らしき値を number にする。全角数字・カンマ・円記号を許容する。
 * @param {any} value
 * @returns {number} 変換できないときは NaN
 */
export function toNumber(value: any): number;
/**
 * Excel 互換の数値パターンを解析する。
 * 例: '¥#,##0.00;▲¥#,##0.00;-' → 正/負/ゼロ の3セクション
 * @param {string} pattern
 * @returns {{ sections: Array<{prefix:string,suffix:string,minInt:number,minFrac:number,maxFrac:number,grouped:boolean,percent:boolean,permille:boolean}> }}
 */
export function parseNumericPattern(pattern: string): {
    sections: Array<{
        prefix: string;
        suffix: string;
        minInt: number;
        minFrac: number;
        maxFrac: number;
        grouped: boolean;
        percent: boolean;
        permille: boolean;
    }>;
};
/**
 * Excel 互換パターンで数値を整形する。
 * @param {any} value
 * @param {string} pattern 例 '#,##0' / '#,##0.00;▲#,##0.00' / '0000'
 * @returns {string}
 */
export function formatNumber(value: any, pattern?: string): string;
/**
 * 値を Date にする。日付のみの文字列は**ローカル時刻**として解釈する
 * （'2026-07-28' を UTC 解釈すると時差で前日になる環境があるため）。
 * @param {any} value
 * @returns {Date|null}
 */
export function toDate(value: any): Date | null;
/**
 * 西暦の日付整形。
 * トークン: YYYY YY M MM D DD H HH m mm s ss ddd dddd A a
 * リテラルは '...' で囲む。
 * @param {any} value
 * @param {string} [pattern='YYYY/MM/DD']
 * @returns {string}
 */
export function formatDate(value: any, pattern?: string): string;
/**
 * 元号を求める。
 * @param {Date} d
 * @returns {{ era: typeof ERAS[number], year: number }|null} 明治より前は null
 */
export function findEra(d: Date): {
    era: (typeof ERAS)[number];
    year: number;
} | null;
/**
 * 和暦整形。
 * トークン: GGGG(令和) GG(令) G(R) Y(元/2) YY(01) ＋ 西暦トークン（M D 等）
 * @param {any} value
 * @param {string} [pattern='GGGGY年M月D日']
 * @returns {string}
 */
export function formatWareki(value: any, pattern?: string): string;
/**
 * 整数を漢数字にする。
 * @param {any} value
 * @param {{ daiji?: boolean }} [options]
 * @returns {string}
 */
export function toKansuji(value: any, options?: {
    daiji?: boolean;
}): string;
/**
 * 金額の大字表記（手形・領収書の改ざん防止表記）。
 *   toDaiji(12345) // '金壱萬弐阡参百四拾五円'
 * @param {any} value
 * @param {{ prefix?: string, suffix?: string }} [options]
 * @returns {string}
 */
export function toDaiji(value: any, options?: {
    prefix?: string;
    suffix?: string;
}): string;
/**
 * 全角英数記号 → 半角（スペース含む）。
 * @param {string} text
 * @returns {string}
 */
export function toHankaku(text: string): string;
/**
 * 半角英数記号 → 全角（スペース含む）。
 * @param {string} text
 * @returns {string}
 */
export function toZenkaku(text: string): string;
/**
 * 書式指定を解釈して文字列にする。
 *
 * spec が関数ならそれを呼ぶ。文字列なら以下:
 *   'text'（既定） / 'number' / '#,##0' 等の数値パターン / 'currency[:記号]' / 'percent'
 *   'date[:パターン]' / 'wareki[:パターン]' / 'daiji' / 'kansuji'
 *   'zenkaku' / 'hankaku' / 'pad:8[:文字]' / 'upper' / 'lower' / 'trim'
 *   defineFormat で登録した独自書式名
 *
 * @param {any} value
 * @param {string|((value:any,row?:object)=>string)} [spec]
 * @param {object} [row] 独自書式・関数書式に渡す行データ
 * @returns {string}
 */
export function formatValue(value: any, spec?: string | ((value: any, row?: object) => string), row?: object): string;
/**
 * 元号定義。開始日は一般に流通している境界（改元日）に合わせている。
 * 明治は太陽暦移行の関係で 1868-09-08 を採用（多くの実装と同じ）。
 */
export const ERAS: {
    name: string;
    short: string;
    alpha: string;
    start: {
        y: number;
        m: number;
        d: number;
    };
}[];
