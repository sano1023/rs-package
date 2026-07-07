export class ImageEditor {
    constructor(target: any, options?: {});
    target: any;
    options: {};
    listeners: {};
    destroyed: boolean;
    base: HTMLCanvasElement | null;
    hasAlpha: boolean;
    layers: any[];
    selId: any;
    mode: string;
    cropRect: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | {
        x: number;
        y: number;
        width: any;
        height: any;
    } | {
        x: number;
        y: number;
        width: number;
        height: number;
    } | {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    cropRatio: any;
    layerCropRect: any;
    _history: any[];
    _hIndex: number;
    _drag: any;
    _rotateSession: {
        src: any;
        layers: {
            id: any;
            x: any;
            y: any;
            rotation: any;
        }[];
    } | null;
    adjust: {
        brightness: number;
        contrast: number;
        saturate: number;
        hue: number;
        blur: number;
        vignette: number;
    };
    filterPreset: string;
    frame: {
        type: string;
        color: string;
        width: number;
    };
    drawStyle: {
        color: string;
        width: number;
    };
    mosaicSize: number;
    eraseStyle: {
        size: number;
        hardness: number;
        restore: boolean;
    };
    _eraseSession: {
        layerId: any;
        src: HTMLCanvasElement;
    } | null;
    pathPts: any[];
    shapePenPts: any[];
    pathClosed: boolean;
    pathSmooth: boolean;
    pathFeather: number;
    pathTrim: boolean;
    _hoverPt: {
        x: any;
        y: any;
    } | null;
    wandTol: number;
    _segAdapter: any;
    autoCutOpts: {
        invert: boolean;
        feather: number;
    };
    pickedColor: string | null;
    selIds: any[];
    _guides: ({
        type: string;
        x: any;
        y?: undefined;
    } | {
        type: string;
        y: any;
        x?: undefined;
    })[] | null;
    cloneStyle: {
        size: number;
        hardness: number;
    };
    _cloneSrc: {
        x: number;
        y: number;
    } | null;
    retouchStyle: {
        mode: string;
        size: number;
        strength: number;
    };
    _toneSession: any;
    _hslSession: {
        src: HTMLCanvasElement;
        params: {
            [k: string]: {
                h: number;
                s: number;
                l: number;
            };
        };
        range: string;
    } | null;
    buildDOM(): void;
    root: any;
    toolbar: any;
    enabledTools: any;
    _toolBtns: {} | undefined;
    _undoBtn: any;
    _redoBtn: any;
    stageWrap: any;
    stage: any;
    ctx: any;
    panel: any;
    _fileInput: any;
    loadFonts(): Promise<void>;
    fontNames: string[] | undefined;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    emit(event: any, payload: any): void;
    /** ベース画像を設定する（最背面・固定） */
    setImage(src: any): Promise<void>;
    /** 文字レイヤーを追加して選択する（リアルタイム編集はパネルから） */
    addText(text?: string, opts?: {}): {
        id: string;
        type: string;
        text: string;
        color: any;
        fontSize: any;
        fontFamily: any;
        x: any;
        y: any;
        scale: number;
        rotation: number;
        opacity: any;
    } | null;
    /** スタンプ/画像レイヤーを追加して選択する */
    addImageLayer(src: any, opts?: {}): Promise<{
        id: string;
        type: string;
        drawable: any;
        src: string;
        sw: any;
        sh: any;
        crop: null;
        stamp: boolean;
        name: any;
        x: any;
        y: any;
        scale: any;
        rotation: number;
        opacity: any;
    } | null>;
    selected(): any;
    /** レイヤーの見た目上の自然サイズ（トリミング反映後・スケール前） */
    naturalSize(layer: any): {
        w: any;
        h: any;
    };
    deleteLayer(id?: any): void;
    /** 選択中のレイヤー一覧（複数選択対応。単一選択なら1件） */
    selectedLayers(): any[];
    /** 選択中レイヤーをまとめて削除 */
    deleteSelected(): void;
    /** レイヤーを複製して返す（Alt+ドラッグ・少しずらして重ねる） */
    duplicateLayer(src: any): any;
    /** 複数選択の整列・分布 */
    alignSelected(mode: any): void;
    moveLayer(id: any, dir: any): void;
    setMode(mode: any): void;
    updateToolbar(): void;
    applyCrop(): void;
    /** レイヤー個別トリミングの適用 */
    applyLayerCrop(): void;
    /** 回転セッション: スライダの入力ごとに元canvasから回し直す（劣化を防ぐ） */
    rotateBy(deg: any, { session }?: {
        session?: boolean | undefined;
    }): void;
    endRotateSession(): void;
    serialize(): {
        base: any;
        hasAlpha: boolean;
        adjust: {
            brightness: number;
            contrast: number;
            saturate: number;
            hue: number;
            blur: number;
            vignette: number;
        };
        filterPreset: string;
        frame: {
            type: string;
            color: string;
            width: number;
        };
        layers: any[];
    };
    pushHistory(): void;
    restore(snap: any): Promise<void>;
    undo(): Promise<void>;
    redo(): Promise<void>;
    /** ステージ上の表示スケールとオフセット（css px） */
    fit(): {
        s: number;
        ox: number;
        oy: number;
        cw: any;
        ch: any;
    };
    toImage(px: any, py: any): {
        x: number;
        y: number;
    };
    toScreen(ix: any, iy: any): {
        x: number;
        y: number;
    };
    /** レイヤーローカル座標へ（中心原点・スケール/回転を打ち消す） */
    toLayerLocal(layer: any, ix: any, iy: any): {
        x: number;
        y: number;
    };
    layerLocalToImage(layer: any, lx: any, ly: any): {
        x: number;
        y: any;
    };
    requestRender(): void;
    _raf: any;
    renderStage(): void;
    /** 複数選択時の枠（ハンドルなし） */
    drawMultiBox(ctx: any, layer: any): void;
    /** 移動中のスナップガイド線（マゼンタ・スクリーン座標） */
    drawGuides(ctx: any, f: any): void;
    /** シーン全体（ベース+調整+レイヤー+フレーム）を image 座標系の ctx に描く。ステージと書き出しで共用 */
    drawScene(ctx: any): void;
    /** 色調整 + プリセットを CSS filter 文字列に */
    filterString(): string;
    filterPresets(): {
        none: {
            label: string;
            css: string;
        };
    };
    drawFrame(ctx: any): void;
    strokePath(ctx: any, points: any, color: any, width: any): void;
    /** レイヤー描画（image座標系のctxに対して）。exportとステージで共用 */
    drawLayer(ctx: any, layer: any): void;
    /** shadow系プロパティはCTMの影響を受けない仕様のため、現在の合成スケールを掛けてステージと書き出しの見た目を揃える */
    setLayerShadow(ctx: any, color: any, blur: any, dx: any, dy: any): void;
    /** レイヤー本体（レイヤーローカル座標・影/グローの掛かる素の描画。縁取りはここで描く） */
    drawLayerBody(ctx: any, layer: any): void;
    /** 図形本体。閉じた図形は 縁取り→塗り→線 の順。破線・両端矢印対応 */
    drawShapeBody(ctx: any, layer: any): void;
    /** 閉じた図形の輪郭パスを作る（beginPath込み・レイヤーローカル座標） */
    traceShapePath(ctx: any, layer: any): void;
    /** 塗りスタイル（単色 / 線形・放射グラデーション）。fill が無ければ null */
    shapeFillStyle(ctx: any, layer: any): any;
    /** 選択レイヤーの枠とハンドル */
    drawSelection(ctx: any, layer: any): void;
    /** 図形の辺リサイズハンドル（スクリーン座標）。pts図形は頂点編集があるので出さない */
    shapeSideHandles(layer: any, n?: {
        w: any;
        h: any;
    }): {
        side: string | number;
        x: number;
        y: number;
    }[];
    /** レイヤーの画像座標での軸平行バウンディングボックス */
    layerBBox(layer: any, n?: {
        w: any;
        h: any;
    }): {
        cx: number;
        cy: number;
        w: number;
        h: number;
    };
    /**
     * 移動中のスナップ。ベースの端/中央・他レイヤーの端/中央に吸着し、
     * 吸着したガイド線を _guides に積む（Ctrlで無効化・renderStageで描画）。
     */
    applySnap(layer: any): void;
    layerCorners(layer: any, n?: {
        w: any;
        h: any;
    }): {
        x: number;
        y: number;
    }[];
    rotateHandlePos(layer: any, n?: {
        w: any;
        h: any;
    }): {
        x: number;
        y: number;
    };
    /** トリミング枠（マスク＋グリッド＋8ハンドル） */
    drawCropUI(ctx: any, f: any): void;
    cropHandlePoints(p0: any, p1: any): any[][];
    drawLayerCropUI(ctx: any, f: any): void;
    _layerCropCorners: {
        x: number;
        y: number;
    }[] | undefined;
    bindEvents(): void;
    _onDown: ((e: any) => void) | undefined;
    _onMove: ((e: any) => void) | undefined;
    _onUp: ((e: any) => void) | undefined;
    _ro: ResizeObserver | undefined;
    _onKey: ((e: any) => void) | undefined;
    pointerDown(e: any): void;
    pointerMove(e: any): void;
    pointerUp(e: any): void;
    /** ペンの1ストロークをレイヤー化（描いた後も移動・削除できる） */
    commitStroke(points: any): void;
    /** 図形レイヤーを追加して選択する */
    addShape(kind: any, opts?: {}): {
        id: string;
        type: string;
        kind: any;
        w: any;
        h: any;
        stroke: any;
        fill: any;
        strokeWidth: any;
        x: any;
        y: any;
        scale: number;
        rotation: number;
        opacity: number;
    } | null;
    /**
     * ペン図形（多角形）の確定。クリックで置いたアンカーを1つの図形レイヤーにする。
     * @returns {object|null} 追加したレイヤー
     */
    finishShapePen(): object | null;
    /**
     * 辺ハンドルのドラッグで幅・高さを個別に変える（反対側の辺を固定＝縦横比の変更）。
     * ドラッグ開始時の中心 (d.x0, d.y0) と自然サイズ (d.nw0, d.nh0) を基準に毎回計算し、累積誤差を避ける。
     */
    resizeShapeSide(d: any, ip: any): void;
    /** 四角・円を頂点編集できる多角形（poly）に変換する */
    convertToPoly(layer: any): void;
    /** 頂点ドラッグ後に pts の外接矩形中心をレイヤー原点へ寄せ直す（選択枠・ヒットテストの整合） */
    recenterShapePts(layer: any): void;
    /** ベースを左右/上下反転する（レイヤー位置・向きも追従） */
    flip(axis?: string): void;
    /** 8ハンドルのリサイズ（比率固定対応） */
    resizeRectByHandle(start: any, index: any, ip: any): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    applyRatio(rect: any, anchorX: any, anchorY: any): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    setCropRatio(ratio: any): void;
    renderPanel(): void;
    _stampCat: any;
    _bgSession: {
        layerId: any;
        src: HTMLCanvasElement;
    } | null | undefined;
    /** 連続入力（文字タイプ・スライダ）用の遅延履歴 */
    scheduleHistory(): void;
    _historyTimer: number | undefined;
    /** 画像レイヤーの drawable を編集可能な canvas に置き換える（消しゴム・マジックワンド共用） */
    ensureLayerCanvas(layer: any): void;
    /** 画像座標 → レイヤー素材座標（回転・拡縮を打ち消し、crop分をオフセット） */
    imageToTargetPoint(layer: any, p: any): {
        x: any;
        y: any;
    };
    /** 消しゴムのセッション開始。復元ブラシ用に元画像を保持し、対象レイヤーは編集可能な canvas に置き換える */
    ensureEraseSession(target: any): void;
    /**
     * 2点間にブラシスタンプを打つ。消す=destination-out / 戻す=セッション元画像から復元。
     * 硬さはラジアルグラデーションの内側実円の割合（ctx.filter 非対応環境でも動く）。
     */
    eraseSegment(aImg: any, bImg: any, target: any): void;
    /** 消しゴム1ストロークの確定（undo単位・レイヤーはundo復元用に dataURL を更新） */
    commitErase(target: any): void;
    /** ブラシカーソル（消しゴム/コピースタンプ/ブラシ補正・スクリーン座標） */
    drawBrushCursor(ctx: any, f: any): void;
    /**
     * パスを確定してベースへ適用する。3点以上あれば未クローズでも自動で閉じる。
     * @param {boolean} keep true=内側を残す（destination-in） / false=内側を消す（destination-out）
     */
    applyPathCut(keep: boolean): void;
    /** パスの外接矩形（フェザー＋曲線の膨らみ分の余白込み）でベースを切り詰める */
    trimToPathBounds(): void;
    /** ペン切り抜きのパス・アンカー・暗転オーバーレイ（スクリーン座標） */
    drawPathUI(ctx: any, f: any): void;
    /** ペン図形（多角形）のプレビューとアンカー（スクリーン座標） */
    drawShapePenUI(ctx: any, f: any): void;
    /**
     * セグメンテーションアダプタを設定する（rs-livecam と同じ契約）。
     * @param {{name: string, segment: (canvas: HTMLCanvasElement) => any}|null} adapter
     *   segment はベース画像を受け取り、被写体マスク（canvas | ImageData | null）を返す。
     *   マスクはアルファ値を被写体度として使う。全画素が不透明ならグレースケール輝度を被写体度とみなす。
     */
    setSegmentation(adapter: {
        name: string;
        segment: (canvas: HTMLCanvasElement) => any;
    } | null): void;
    /**
     * アダプタで被写体マスクを取得してベースへ適用する。
     * 失敗時は lastAutoCutError に理由が入る（'no-adapter' | 'error' | 'no-mask' | 'empty'）。
     * 'empty' はマスクがほぼ空（または反転時にほぼ全面）で、適用すると画像が丸ごと消えるため
     * 何もせず false を返したケース（例: 人物用アダプタに人物のいない画像を渡した）。
     * @param {{invert?: boolean, feather?: number}} opts invert=被写体を消して背景を残す
     * @returns {Promise<boolean>} 適用できたか
     */
    autoCut({ invert, feather }?: {
        invert?: boolean;
        feather?: number;
    }): Promise<boolean>;
    lastAutoCutError: string | null | undefined;
    /** セッション元画像からレベル→カーブ→WB→シャープを再計算してプレビュー（デバウンス） */
    renderTonePreview(): void;
    _toneTimer: number | undefined;
    /** トーン補正を確定（プレビュー結果を焼き込み） */
    applyTone(): void;
    /** 輝度ヒストグラムの0.5%/99.5%点で黒点・白点を決める */
    autoContrast(): void;
    /** グレーワールド仮定のホワイトバランス（各chの平均を灰色に寄せるゲイン） */
    autoWhiteBalance(): void;
    /** カーブエディタ描画（ヒストグラム背景＋グリッド＋現在チャンネルのLUT曲線＋制御点） */
    drawCurveEditor(canvas: any, sess: any): void;
    /** 8色域それぞれの色相/彩度/明度シフトをセッション元画像から再計算してプレビュー */
    renderHslPreview(): void;
    _hslTimer: number | undefined;
    /** 色域調整を確定 */
    applyHsl(): void;
    /** コピースタンプ: ストローク開始時のスナップショットから offset 分ずらして転写 */
    cloneSegment(a: any, b: any, d: any): void;
    /** ブラシ補正: 線分カプセル内のピクセルを 明るく/暗く/ぼかし */
    retouchSegment(a: any, b: any): void;
    /** コピースタンプの採取点マーカー（スクリーン座標） */
    drawCloneSource(ctx: any): void;
    /**
     * 背景透過のライブプレビュー。スライダを動かすたびにセッション元画像から
     * 計算し直すので、許容度を上げ下げしても劣化しない。
     * @param {number} tol 許容度 0-80
     * @param {object|null} layer 対象レイヤー（null ならベース画像）
     */
    previewBgRemoval(tol: number, layer: object | null): void;
    _bgTol: number | undefined;
    /** 背景透過の確定（スライダを離したとき）。undo用に状態を記録する */
    commitBgRemoval(layer: any): void;
    /** シーンを平坦化した canvas を返す */
    flatten(): HTMLCanvasElement;
    /**
     * エクスポート（v0.1 エンジンに委譲。resize/targetBytes 等もそのまま使える）
     */
    export(ops?: {}): Promise<{
        blob?: any;
        dataURL?: any;
        canvas?: any;
        width: any;
        height: any;
        bytes: any;
        format: any;
    }>;
    getState(): {
        width: any;
        height: any;
        layers: any[];
        mode: string;
        cropRect: any;
        adjust: {
            brightness: number;
            contrast: number;
            saturate: number;
            hue: number;
            blur: number;
            vignette: number;
        };
        filterPreset: string;
        frame: {
            type: string;
            color: string;
            width: number;
        };
    };
    destroy(): void;
}
