/** ノードのパスラベル（ルート直下 → ノード自身） */
export function nodePath(node: any): any[];
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
