/** リンクの from/to（"nodeId" または { node }）からノードIDを取り出す */
export function linkEndId(ref: any): string | null;
/** リンク端点が座標（自由線の端）か */
export function isPointEnd(ref: any): boolean;
export class Diagram {
    constructor(target: any, options: any, nodeRegistry: any, linkRegistry: any);
    target: any;
    _uid: number;
    destroyed: boolean;
    listeners: {};
    nodeTypes: Map<any, any>;
    linkTypes: Map<any, any>;
    options: any;
    readOnly: boolean;
    wrapper: any;
    renderer: SVGRenderer;
    defs: any;
    viewport: any;
    gridLayer: any;
    linksLayer: any;
    nodesLayer: any;
    overlayLayer: any;
    model: {
        nodes: never[];
        links: never[];
    };
    stack: CommandStack;
    selection: Set<any>;
    linkSel: Set<any>;
    view: {
        x: number;
        y: number;
        scale: number;
    };
    _seq: {
        n: number;
        l: number;
    };
    _markers: Map<any, any>;
    _guides: any;
    _rubber: any;
    _connect: any;
    _raf: number;
    menu: ContextMenu | null;
    _unbind: () => void;
    palette: {
        destroy(): void;
    } | null;
    styleBar: {
        el: any;
        destroy(): void;
    } | null;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    getNode(id: any): null;
    getLink(id: any): null;
    nodeTypeDef(type: any): any;
    linkTypeDef(name: any): any;
    genId(prefix: any): string;
    /** ノードの正規化。未知のプロパティは保持する（toJSONでそのまま返す） */
    normalizeNode(raw: any): any;
    /** リンクの正規化。router/arrow の既定値は描画時に解決する（データを汚さない） */
    normalizeLink(raw: any): any;
    /** コマンドを適用して履歴に積み、再描画・modelChange 発火まで行う */
    execute(cmd: any): void;
    /** ドラッグ等で model に適用済みの差分を履歴にだけ積む（1ドラッグ=1undo） */
    pushApplied(cmd: any): void;
    undo(): boolean;
    redo(): boolean;
    get canUndo(): boolean;
    get canRedo(): boolean;
    _pruneSelection(): void;
    addNode(raw: any): any;
    updateNode(id: any, props: any): never;
    removeNode(id: any): void;
    addLink(raw: any): any;
    updateLink(id: any, props: any): never;
    removeLink(id: any): void;
    /** ノード削除（リンクは連鎖削除）。ids: ノードIDの配列 */
    _removeItems(ids: any): void;
    deleteSelection(): void;
    /** 選択ノードをオフセット付きで複製する（選択内で完結するリンクも複製） */
    duplicateSelection(offset?: number): any[];
    bringToFront(): void;
    sendToBack(): void;
    _reorder(front: any): void;
    select(ids: any): void;
    /** リンクを選択する（ノード選択は解除） */
    selectLinks(ids: any): void;
    getLinkSelection(): any[];
    getSelection(): any[];
    toJSON(): any;
    fromJSON(json: any): this;
    /**
     * JSON文字列を返す。download指定でファイル保存も行う。
     */
    exportJSON({ download, filename, pretty }?: {
        download?: boolean | undefined;
        filename?: string | undefined;
        pretty?: boolean | undefined;
    }): string;
    /** File/Blob（JSONファイル）から読み込む */
    importJSONFile(file: any): Promise<any>;
    /** URLからJSONを取得して読み込む（fetchOptions は fetch にそのまま渡す） */
    loadFrom(url: any, fetchOptions?: {}): Promise<any>;
    /** 現在の内容をAPIへ送信する（既定 POST・JSONボディ） */
    saveTo(url: any, { method, headers, ...fetchOptions }?: {
        method?: string | undefined;
        headers?: {} | undefined;
    }): Promise<Response>;
    setReadOnly(v: any): void;
    /** クライアント座標 → model座標（パン/ズームを打ち消す） */
    toModelPoint(e: any): {
        x: number;
        y: number;
    };
    /** model座標 → svg左上基準のクライアント相対座標 */
    toClientPoint(mx: any, my: any): {
        x: number;
        y: number;
    };
    getView(): {
        x: number;
        y: number;
        scale: number;
    };
    setView({ x, y, scale }?: {}): void;
    resetView(): void;
    /**
     * 線描画モードの切替。mode: { arrow: 'none'|'triangle'|'open', arrowStart?, keep? } | null
     * モード中はキャンバスのドラッグで線を引く（端はノードに吸着）。既定は1本引いたら解除。
     */
    setDrawMode(mode: any): void;
    _drawMode: any;
    getDrawMode(): any;
    /** 内容全体が収まるようにパン/ズームする */
    zoomToFit({ padding, maxScale }?: {
        padding?: number | undefined;
        maxScale?: number | undefined;
    }): void;
    resolveTheme(): {
        bg: string;
        grid: string;
        gridStrong: string;
        nodeFill: string;
        nodeStroke: string;
        text: string;
        link: string;
        selection: string;
        guide: string;
        anchor: string;
        handle: string;
        fontFamily: string;
        fontSize: number;
        nodeStrokeWidth: number;
        linkWidth: number;
    };
    /** ノードの最終スタイル（node.style > タイプ既定 > テーマ） */
    resolveNodeStyle(node: any, def: any): {
        fill: any;
        stroke: any;
        strokeWidth: any;
        textColor: any;
        fontSize: any;
        radius: any;
        dash: any;
    };
    /** rAFで再描画をまとめる（ドラッグ中のプレビュー用） */
    requestRender(): void;
    render(): void;
    theme: {
        bg: string;
        grid: string;
        gridStrong: string;
        nodeFill: string;
        nodeStroke: string;
        text: string;
        link: string;
        selection: string;
        guide: string;
        anchor: string;
        handle: string;
        fontFamily: string;
        fontSize: number;
        nodeStrokeWidth: number;
        linkWidth: number;
    } | undefined;
    renderGrid(): void;
    /** 矢印マーカーをdefsに用意してIDを返す（種類×色ごとにキャッシュ） */
    ensureMarker(type: any, color: any, reverse?: boolean): any;
    renderLinks(): void;
    renderNodes(): void;
    drawLabel(g: any, node: any, def: any, style: any): void;
    drawAnchors(g: any, node: any, def: any): void;
    renderOverlay(): void;
    /** 単体で表示可能なSVG文字列を返す */
    exportSVG({ padding }?: {
        padding?: number | undefined;
    }): any;
    /** PNG Blob を生成する（既定でダウンロードも行う） */
    exportPNG({ scale, download, filename }?: {
        scale?: number | undefined;
        download?: boolean | undefined;
        filename?: string | undefined;
    }): Promise<any>;
    destroy(): void;
}
import { SVGRenderer } from './renderer.js';
import { CommandStack } from './commands.js';
import { ContextMenu } from './contextmenu.js';
