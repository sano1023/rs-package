/** スライス全体を正規化する（未知キーは無視） */
export function normalizeSlice(raw: any, fieldType: any): {
    rows: {
        dateGroup: any;
        field: any;
        sort: any;
        topN: {
            n: number;
        } | null;
    }[];
    columns: {
        dateGroup: any;
        field: any;
        sort: any;
        topN: {
            n: number;
        } | null;
    }[];
    values: {
        field: any;
        agg: any;
        label: any;
        format: any;
        showAs: any;
    }[];
    filters: {
        field: any;
        include: any[] | null;
        exclude: any[] | null;
    }[];
    options: {
        fiscalYear: boolean;
        subtotals: boolean;
        grandTotals: boolean;
        flat: boolean;
        collapsed: {
            rows: string[][];
            columns: string[][];
        };
        valuePlacement: string;
    };
};
/** ゾーン名の一覧（D&D・キーボード移動の巡回順） */
export const ZONES: string[];
/**
 * スライスの状態と操作をまとめたモデル。変更のたびに onChange() を呼ぶ。
 */
export class SliceModel {
    /**
     * @param {object} raw 初期スライス定義
     * @param {(name:string) => string|null} fieldType フィールド型の解決関数
     */
    constructor(raw: object, fieldType: (name: string) => string | null);
    fieldType: (name: string) => string | null;
    onChange: any;
    state: {
        rows: {
            dateGroup: any;
            field: any;
            sort: any;
            topN: {
                n: number;
            } | null;
        }[];
        columns: {
            dateGroup: any;
            field: any;
            sort: any;
            topN: {
                n: number;
            } | null;
        }[];
        values: {
            field: any;
            agg: any;
            label: any;
            format: any;
            showAs: any;
        }[];
        filters: {
            field: any;
            include: any[] | null;
            exclude: any[] | null;
        }[];
        options: {
            fiscalYear: boolean;
            subtotals: boolean;
            grandTotals: boolean;
            flat: boolean;
            collapsed: {
                rows: string[][];
                columns: string[][];
            };
            valuePlacement: string;
        };
    };
    _emit(): void;
    toJSON(): {
        rows: {
            field: any;
        }[];
        columns: {
            field: any;
        }[];
        values: {
            field: any;
            agg: any;
        }[];
        filters: {
            field: any;
        }[];
        options: {
            fiscalYear: boolean;
            subtotals: boolean;
            grandTotals: boolean;
            flat: boolean;
            collapsed: {
                rows: string[][];
                columns: string[][];
            };
            valuePlacement: string;
        };
    };
    fromJSON(json: any): void;
    /** ゾーンの項目リストを返す（available は placed 以外の全フィールド名） */
    items(zone: any): {
        dateGroup: any;
        field: any;
        sort: any;
        topN: {
            n: number;
        } | null;
    }[] | {
        field: any;
        agg: any;
        label: any;
        format: any;
        showAs: any;
    }[] | {
        field: any;
        include: any[] | null;
        exclude: any[] | null;
    }[];
    /** 行/列から同一フィールドの項目を取り除く（dateGroup 不問） */
    _removeFieldFromAxes(field: any): void;
    /**
     * フィールドをゾーンへ追加する。
     * 行/列へ日付フィールドを dateGroup なしで置くと3段に自動展開。
     * すでに行/列にある同一フィールドは移動として扱う。
     */
    addField(zone: any, field: any, index?: number, dateGroup?: null): void;
    /** ゾーンから index の項目を取り除く */
    removeField(zone: any, index: any): void;
    /** ゾーン間/ゾーン内の移動。toZone='available' は除去 */
    moveField(fromZone: any, fromIndex: any, toZone: any, toIndex?: number): void;
    /** 値フィールドの集計方法を変更する */
    setAgg(index: any, agg: any): void;
    /** 行/列フィールドのソートを設定する（'asc'|'desc'|{byValue,dir}|null） */
    setSort(zone: any, index: any, sort: any): void;
    /**
     * 行/列に置いた日付フィールドの粒度を切り替える（v0.4: year/quarter/month/week/day）。
     * 同一 field+group が既にそのゾーンにあれば何もしない（重複防止）。
     */
    setDateGroup(zone: any, index: any, group: any): void;
    /**
     * 値リストフィルタを設定する。include=null でフィルタ解除。
     * フィルタゾーンに無いフィールドなら追加する。
     */
    setFilter(field: any, include: any): void;
    /** 表示オプション（真偽値: fiscalYear/subtotals/grandTotals/flat）を設定する */
    setOption(key: any, value: any): void;
    /** 複数値フィールドの列配置を切り替える（v0.4: 'inner'=列の内側 / 'outer'=列の外側） */
    setValuePlacement(placement: any): void;
    /** 値フィールドの割合表示を設定する（'value'|'row'|'column'|'total'） */
    setShowAs(index: any, showAs: any): void;
    /** 行/列フィールドの Top-N を設定する（null で解除） */
    setTopN(zone: any, index: any, topN: any): void;
    /** 展開/折りたたみを切り替える（axis: 'rows'|'columns'、path はラベル配列） */
    toggleCollapse(axis: any, path: any): void;
    /** 指定パスが折りたたまれているか */
    isCollapsed(axis: any, path: any): any;
    /** setData 後、消えたフィールドをスライスから除去する */
    pruneFields(fieldExists: any): void;
}
