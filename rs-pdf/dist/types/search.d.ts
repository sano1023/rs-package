/**
 * ページ内アイテムを連結した全文と、文字位置→アイテムの対応表を作る。
 * 行が変わる位置には '\n' を挟み、行をまたぐ誤ヒットを防ぐ。
 * @returns {{ text: string, spans: Array<{itemIndex,start,end}> }}
 */
export function buildPageText(items: any): {
    text: string;
    spans: Array<{
        itemIndex: any;
        start: any;
        end: any;
    }>;
};
/**
 * 1ページ内のクエリ全出現を探す。
 * @param {Array<{str,x,y,w,h}>} items テキストアイテム
 * @param {string} query 検索語
 * @param {object} opts { caseSensitive } 既定は大文字小文字を無視
 * @returns {Array<{start,end,rects}>} rects は PDFポイント（左上原点）の矩形群
 */
export function searchPage(items: Array<{
    str: any;
    x: any;
    y: any;
    w: any;
    h: any;
}>, query: string, { caseSensitive }?: object): Array<{
    start: any;
    end: any;
    rects: any;
}>;
/**
 * 全ページ横断の検索。
 * @param {Array<Array>} pagesItems ページごとのテキストアイテム配列（index 0 = 1ページ目）
 * @returns {{ count: number, matches: Array<{page,start,end,rects}> }} page は1始まり
 */
export function searchDocument(pagesItems: Array<any[]>, query: any, opts: any): {
    count: number;
    matches: Array<{
        page: any;
        start: any;
        end: any;
        rects: any;
    }>;
};
/** 次/前のマッチ番号（末尾↔先頭でラップする） */
export function stepMatchIndex(current: any, total: any, dir: any): number;
