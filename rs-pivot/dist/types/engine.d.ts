/** ノードのパスラベル（ルート直下 → ノード自身） */
export function nodePath(node: any): any[];
/**
 * 集計の「軸セットアップ」（フィールド計算器・フィルタ後の行インデックス・Top-N 適用）を作る。
 *
 * aggregate() の重い蓄積ループの前段にあたる純粋な準備工程を切り出したもの。
 * Worker 集計（worker.js）の主スレッド側でも、ドリルスルー明細の再構築に再利用する
 * （辞書化された列指向ストアを共有するため、蓄積ループ本体を Worker に逃がしても
 * このセットアップは決定的に同じ結果になる）。
 * @param {object} store buildStore() の戻り値
 * @param {object} slice 正規化済みスライス（SliceModel.state）
 * @param {Map} registry createRegistry() の戻り値
 */
export function buildAxes(store: object, slice: object, registry: Map<any, any>): {
    options: any;
    fiscal: boolean;
    rowFields: any;
    colFields: any;
    valueDefs: any;
    indices: number[];
};
/**
 * 集計を実行する。
 * @param {object} store buildStore() の戻り値
 * @param {object} slice 正規化済みスライス（SliceModel.state）
 * @param {Map} registry createRegistry() の戻り値
 * @returns 集計結果（行/列ツリー・セル取得・明細取得を含む）
 */
export function aggregate(store: object, slice: object, registry: Map<any, any>): {
    store: object;
    slice: object;
    options: any;
    fiscal: boolean;
    rowFields: any;
    colFields: any;
    valueDefs: any;
    rowRoot: {
        id: number;
        code: any;
        label: any;
        sortVal: any;
        depth: any;
        parent: any;
        children: Map<any, any>;
        childList: never[];
        cells: null;
    };
    colRoot: {
        id: number;
        code: any;
        label: any;
        sortVal: any;
        depth: any;
        parent: any;
        children: Map<any, any>;
        childList: never[];
        cells: null;
    };
    indices: number[];
    cellResult: (rowNode: any, colNode: any, vi: any) => any;
    recordsForCell: (rowNode: any, colNode: any) => any[];
};
/** 集計結果を postMessage 可能なプレーンオブジェクトへ直列化する（セル値は result() 済み） */
export function serializeResult(result: any): {
    rowTree: {
        rootId: any;
        nodes: {
            id: any;
            label: any;
            depth: any;
            code: any;
            sortVal: any;
            parent: any;
            children: any;
        }[];
    };
    colTree: {
        rootId: any;
        nodes: {
            id: any;
            label: any;
            depth: any;
            code: any;
            sortVal: any;
            parent: any;
            children: any;
        }[];
    };
    cells: any[][];
    rowCount: any;
    options: any;
    fiscal: any;
    valueDefs: any;
    rowFields: any;
    colFields: any;
};
/**
 * serializeResult() の出力を aggregate() と同型の結果オブジェクトへ復元する。
 * @param {object} payload serializeResult() の戻り値（Worker から受信）
 * @param {object} store 主スレッドの列指向ストア（ドリルスルー明細に使用）
 * @param {object} slice 集計に使ったスライス
 * @param {Map} registry 集計レジストリ（フォーマッタ判定・明細再構築に使用）
 */
export function hydrateResult(payload: object, store: object, slice: object, registry: Map<any, any>): {
    store: object;
    slice: object;
    options: any;
    fiscal: any;
    rowFields: any;
    colFields: any;
    valueDefs: any;
    rowRoot: any;
    colRoot: any;
    indices: {
        length: any;
    };
    cellResult: (rowNode: any, colNode: any, vi: any) => any;
    recordsForCell: (rowNode: any, colNode: any) => any[];
};
/** Top-N でまとめられたグループを表す番兵コード（実コード・BLANK と衝突しない） */
export const OTHERS: "\0OTHERS";
/** 「その他」グループの表示ラベル */
export const OTHERS_LABEL: "\u305D\u306E\u4ED6";
