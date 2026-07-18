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
    _tplLayout: {
        name: any;
        options: any;
    } | null;
    nodeTypes: Map<any, any>;
    linkTypes: Map<any, any>;
    options: any;
    readOnly: boolean;
    wrapper: any;
    renderer: SVGRenderer;
    defs: any;
    viewport: any;
    gridLayer: any;
    laneLayer: any;
    linksLayer: any;
    nodesLayer: any;
    overlayLayer: any;
    model: {
        nodes: never[];
        links: never[];
        lanes: never[];
    };
    stack: CommandStack;
    selection: Set<any>;
    linkSel: Set<any>;
    laneSel: Set<any>;
    view: {
        x: number;
        y: number;
        scale: number;
    };
    _seq: {
        n: number;
        l: number;
        lane: number;
    };
    _markers: Map<any, any>;
    _guides: any;
    _rubber: any;
    _connect: any;
    _raf: number;
    _hidden: Set<any>;
    _nodeEls: Map<any, any>;
    _linkEls: Map<any, any>;
    _frameIndex: Map<any, never> | null;
    _viewRect: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    _fullPass: boolean;
    _themeToken: number;
    _themeSig: string;
    _lastOps: any[];
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
    /** 自動採番。taken（Set）を渡すと衝突チェックをそれで行う（一括ロード用・O(1)） */
    genId(prefix: any, taken?: null): string;
    /** ノードの正規化。未知のプロパティは保持する（toJSONでそのまま返す）。
     *  seen（Set）を渡すと重複/採番チェックをそれで行う（一括ロード用・O(1)） */
    normalizeNode(raw: any, seen?: null): any;
    /** リンクの正規化。router/arrow の既定値は描画時に解決する（データを汚さない） */
    normalizeLink(raw: any, seen?: null): any;
    /** スイムレーンの正規化 */
    normalizeLane(raw: any, seen?: null): any;
    getLane(id: any): null;
    /**
     * v0.4 変更イベントストリーム。
     * コマンドを op 粒度 {type, payload} に細分化し、op ごとに 'op' を発火、
     * さらに modelChange を op 列(ops)付きで発火する（サーバ同期はアプリ側の責務）。
     * direction は 'do' | 'undo'。undo は逆操作の op 列になる（redo は 'do'）。
     */
    _emitChange(cmd: any, direction: any): void;
    /** コマンドを適用して履歴に積み、再描画・変更イベント発火まで行う */
    execute(cmd: any): void;
    /** ドラッグ等で model に適用済みの差分を履歴にだけ積む（1ドラッグ=1undo） */
    pushApplied(cmd: any): void;
    undo(): boolean;
    redo(): boolean;
    /** 直近コマンドが生成した op 列（{type,payload}[]）。コラボ同期の差分に使う */
    getLastOps(): any[];
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
    /** レイアウトを直接適用（履歴なし・テンプレ初期化用） */
    _applyLayoutDirect(name: any, opts: any): void;
    /**
     * 自動レイアウトを適用する（undo 可能）。
     * name: 'tree' | 'layered' | 'grid' | 'radial'。グループ/畳まれた子は動かさない。
     */
    layout(name: any, opts?: {}): this;
    /** 指定ノード（省略時は選択中）を囲むグループを作る */
    group(ids: any, opts?: {}): any;
    /** グループを解除（子ノードは残す） */
    ungroup(id: any): void;
    /** グループの折りたたみ切替（子を隠して見出しだけに畳む） */
    toggleCollapse(id: any): void;
    addLane(raw: any): any;
    updateLane(id: any, props: any): never;
    removeLane(id: any): void;
    /** レーンを選択（ノード/リンク選択は解除） */
    selectLane(id: any): void;
    /** ノード中心が含まれるレーンのID（所属判定）。無ければ null */
    laneOf(nodeId: any): any;
    /** レーンに中心が含まれるノード配列（レーン移動で追従させる対象） */
    nodesInLane(lane: any): never[];
    select(ids: any): void;
    /** リンクを選択する（ノード選択は解除） */
    selectLinks(ids: any): void;
    getLinkSelection(): any[];
    getSelection(): any[];
    toJSON(): {
        nodes: any;
        links: any;
    };
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
    loadFrom(url: any, fetchOptions?: {}): Promise<{
        nodes: any;
        links: any;
    }>;
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
    /** 指定ノードを画面中央に置く（家系図の「本人フォーカス」等。scale 省略時は現在の倍率を維持） */
    centerOnNode(id: any, { scale }?: {}): this;
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
    /** 現フレームの可視範囲（model座標）。仮想化なしなら null */
    _computeViewRect(): {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    /** 描画キャッシュを捨てて層を空にする（fromJSON 等の総入れ替え時） */
    _resetRenderCache(): void;
    /** ホットパス用の O(1) ノード取得（描画中は索引・それ以外は find） */
    _fastNode(id: any): null;
    /** 仮想化のON/OFFを切り替える */
    setVirtualize(on: any): this;
    /**
     * 描画統計（差分描画・仮想化の効き具合の可視化用）。
     * renderedNodes/Links は現在 DOM にある <g> の数（可視域のみ）。
     */
    getRenderStats(): {
        virtualize: boolean;
        renderedNodes: number;
        renderedLinks: number;
        totalNodes: number;
        totalLinks: number;
    };
    /** スイムレーン帯を描く（グリッドの上・リンクの下） */
    renderLanes(): void;
    renderGrid(): void;
    /** 矢印マーカーをdefsに用意してIDを返す（種類×色ごとにキャッシュ） */
    ensureMarker(type: any, color: any, reverse?: boolean): any;
    /** リンク端点の解決（ポート・畳まれたグループの代表・座標端点に対応） */
    resolveEnd(link: any, ref: any, anchorProp: any): {
        node: never;
        bounds: {
            x: any;
            y: any;
            width: any;
            height: any;
        };
        shape: any;
        anchor: any;
    } | {
        node: null;
        bounds: {
            x: any;
            y: any;
            width: number;
            height: number;
        };
        shape: string;
        anchor: null;
        point: {
            x: any;
            y: any;
        };
    } | null;
    renderLinks(): void;
    _labelPts: Map<any, any> | undefined;
    /** リンクの描画署名（幾何＝pts と スタイル／選択が同じなら <g> を再利用する） */
    _linkSig(spec: any): string;
    /** リンク1本の <g>（デタッチ）を組み立てて返す */
    _buildLinkG(spec: any): any;
    renderNodes(): void;
    /** ノードの描画署名（x/y は transform で扱うので除外＝移動では作り直さない） */
    _nodeSig(node: any, selected: any): string;
    /** ノード1個の <g>（デタッチ・transform 未設定）を組み立てて返す */
    _buildNodeG(node: any, selected: any): any;
    /** ノードのポート（明示的な接続点）を描く。ドラッグで接続を作る */
    drawPorts(g: any, node: any): void;
    drawLabel(g: any, node: any, def: any, style: any): void;
    drawAnchors(g: any, node: any, def: any): void;
    renderOverlay(): void;
    /** 単体で表示可能なSVG文字列を返す */
    exportSVG({ padding }?: {
        padding?: number | undefined;
    }): any;
    _exportSVGInner(padding?: number): any;
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
