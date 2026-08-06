/**
 * 属性を検証・正規化する。既定値と同じものは落とす（出力HTMLを最小に保ち、
 * テーマ側の色や太さをそのまま活かせるようにする）。
 */
export function normDividerAttrs(attrs: any): {
    color: any;
    lineStyle: any;
    thickness: number;
    width: number;
};
export function serializeDivider(node: any): string;
/** DOMの <hr> から属性を読む（data-rse-* が正。プレーンな <hr> は既定スタイル） */
export function parseDivider(el: any): {
    type: string;
};
/** 区切り線を挿入する（空段落ならそこを置き換え、そうでなければ現在ブロックの直後） */
export function insertDivider(doc: any, pos: any, attrs: any): {
    selection: {
        anchor: number;
        head: number;
    };
};
/** index番目の区切り線の属性を置き換える */
export function setDividerAttrs(doc: any, index: any, attrs: any): boolean;
/** index番目の区切り線を削除する */
export function removeDivider(doc: any, index: any): false | {
    selection: {
        anchor: number;
        head: number;
    };
};
/** 線種の選択肢（ダイアログのセレクト・プリセットで共用） */
export const LINE_STYLES: {
    value: string;
    label: string;
}[];
export const divider: any;
