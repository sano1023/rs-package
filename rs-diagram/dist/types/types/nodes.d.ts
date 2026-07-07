/** 四角形（処理） */
export const rect: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** 角丸四角形（開始/終了） */
export const rounded: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** 楕円 */
export const ellipse: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** ひし形（判断） */
export const diamond: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** テキスト（枠なしラベル。注釈・メモ用） */
export const text: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** 画像（node.image にURL/データURI。未指定はプレースホルダ） */
export const image: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** スタンプ（絵文字。node.emoji を大きく描く。枠なし・ラベルは下） */
export const stamp: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** 標準ノードタイプ一式 */
export const builtinNodeTypes: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
}[];
