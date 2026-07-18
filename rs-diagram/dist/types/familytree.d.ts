/** 生没年の表示文字列（born/died から） */
export function formatYears(p: any): string;
/** people 配列を id → person の Map にする（id 無しは無視） */
export function familyIndex(people: any): Map<any, any>;
/**
 * father/mother の組と spouse 指定から夫婦（union）を導出する。
 * @returns {{ byId: Map, unions: Map<key, { key, partners: string[], children: string[] }> }}
 */
export function familyUnions(people: any): {
    byId: Map<any, any>;
    unions: Map<key, {
        key: any;
        partners: string[];
        children: string[];
    }>;
};
/**
 * ego からの世代番号（親=-1・子=+1・配偶者=同世代）。届かない人物は含まれない。
 * @returns {Map<id, number>}
 */
export function familyGenerations(people: any, egoId: any): Map<id, number>;
/**
 * 家系図を構築する（テンプレートの build）。
 * @param {object} data { ego, people, layout?, scope? }。people 省略時はサンプル家系
 *   - scope: 'reachable'（既定）… ego から辿れる親族だけ（直系祖先＋兄弟姉妹＋子孫＋配偶者）
 *            'all' … 全員を配置（親を持たない人を根に系統樹の森として並べる。
 *                    ego は刈り込みに使わずハイライトのみ — 大きな家系を丸ごと探索する用途）
 * @returns {{ nodes, links, ego }} 座標確定済み（自動レイアウト不要）
 */
export function buildFamilyTree(data?: object): {
    nodes: any;
    links: any;
    ego: any;
};
/**
 * 合成家系を生成する（大規模サンプル・性能検証用）。
 * 始祖夫婦から世代ごとに子1〜4人（72%が結婚して家庭を持つ）を決定的に生やす。
 * ego: true は下位世代（全体の7割地点以降で最初に親を持つ人）に付く —
 * 人が密集する場所なので scope: 'all' で「本人フォーカス→周囲を探索」の起点に向く。
 * @param {object} opts { size = 10000, seed = 42 }
 */
export function makeRandomFamily({ size, seed }?: object): any[];
/**
 * サンプル家系（35人・4世代上〜2世代下）。ego='me'。
 * 叔父一家（uncle/auntw/cousin1/cousin2）は本人視点では現れず、
 * 父（father）視点に切り替えると兄弟として現れる — 視点切替のデモ用。
 */
export function sampleFamily(): ({
    id: string;
    name: string;
    sex: string;
    born: number;
    died: number;
    father?: undefined;
    mother?: undefined;
    spouse?: undefined;
    ego?: undefined;
} | {
    id: string;
    name: string;
    sex: string;
    born: number;
    died: number;
    father: string;
    mother: string;
    spouse?: undefined;
    ego?: undefined;
} | {
    id: string;
    name: string;
    sex: string;
    born: number;
    died: number;
    father: string;
    mother: string;
    spouse: string;
    ego?: undefined;
} | {
    id: string;
    name: string;
    sex: string;
    born: number;
    father: string;
    mother: string;
    died?: undefined;
    spouse?: undefined;
    ego?: undefined;
} | {
    id: string;
    name: string;
    sex: string;
    born: number;
    died?: undefined;
    father?: undefined;
    mother?: undefined;
    spouse?: undefined;
    ego?: undefined;
} | {
    id: string;
    name: string;
    sex: string;
    born: number;
    father: string;
    mother: string;
    spouse: string;
    died?: undefined;
    ego?: undefined;
} | {
    id: string;
    name: string;
    sex: string;
    born: number;
    father: string;
    mother: string;
    spouse: string;
    ego: boolean;
    died?: undefined;
})[];
export namespace FAMILY_LAYOUT {
    let personW: number;
    let personH: number;
    let spouseGap: number;
    let siblingGap: number;
    let rowGap: number;
    let unionSize: number;
}
/**
 * 家系図の人物カード（氏名＋生没年。sex でアクセント色、ego は強調＋「本人」バッジ）。
 *   - node.image があれば左に円形の顔写真（URL / dataURL）
 *   - node.url があればカーソルが pointer になる（遷移はアプリ側で nodeClick を拾う）
 */
export const familyPerson: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** 夫婦の結合点（婚姻マーク。ここから子へ線を降ろす） */
export const familyUnion: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
