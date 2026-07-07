export class FormManager {
    /**
     * @param {import('./viewer.js').Viewer} viewer
     */
    constructor(viewer: import("./viewer.js").Viewer, options?: {});
    viewer: import("./viewer.js").Viewer;
    options: {};
    fields: Map<any, any>;
    values: Map<any, any>;
    inputs: Map<any, any>;
    _layers: Map<any, any>;
    _scope: string;
    _loaded: boolean;
    _onZoom: () => number;
    _loadAll(): Promise<void>;
    _buildLayer(i: any): void;
    _buildInput(f: any, pageIdx: any): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
    /** 入力のフォント寸法を現在のページ実寸に合わせる */
    _syncFonts(only: any): void;
    getValue(name: any): any;
    /** 値を設定してUIへ反映する（fromUI時はDOM再設定を省略） */
    setValue(name: any, value: any, { fromUI }?: {
        fromUI?: boolean | undefined;
    }): this;
    toJSON(): {
        version: number;
        fields: any;
    };
    fromJSON(json: any): this;
    /** フィールド定義一覧（page は1始まり） */
    listFields(): any[];
    /** flatten 用: ページの入力値を canvas に描く（scale = px/pt） */
    drawPage(ctx: any, pageIdx: any, scale: any): void;
    destroy(): void;
}
