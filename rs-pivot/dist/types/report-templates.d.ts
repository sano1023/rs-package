export class ReportTemplates {
    /**
     * @param {object} opts { storageKey?: string|null, storage?: Storage }
     *   storageKey を渡すと保存のたびに storage へ JSON 永続化し、構築時に読み込む。
     */
    constructor(opts?: object);
    storageKey: any;
    storage: any;
    map: Map<any, any>;
    /** 保存済みテンプレート名の一覧（保存順） */
    list(): any[];
    /** [{ name, slice }] の配列（保存順・スライスはクローン） */
    entries(): {
        name: any;
        slice: any;
    }[];
    has(name: any): boolean;
    /** 名前でスライスを取得（クローン・無ければ null） */
    get(name: any): any;
    /**
     * 現在のスライスを名前付きで保存する（同名は上書き）。
     * @returns {boolean} 保存できたか（空名は false）
     */
    save(name: any, slice: any): boolean;
    /** テンプレートを削除する。@returns {boolean} 存在して削除したか */
    remove(name: any): boolean;
    /**
     * テンプレートを改名する（挿入順は維持）。
     * @returns {boolean} 成功したか（元が無い/新名が空/衝突で false）
     */
    rename(oldName: any, newName: any): boolean;
    /** 全テンプレートを消す */
    clear(): void;
    /** 直列化（[{ name, slice }]） */
    toJSON(): {
        name: any;
        slice: any;
    }[];
    /** 直列化データから復元する（[{ name, slice }] / 未知要素は無視） */
    fromJSON(arr: any): this;
    _load(): void;
    _persist(): void;
}
