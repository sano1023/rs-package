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
        width: any;
        height: any;
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
    _histMax: number;
    _histChain: Promise<void>;
    _historyOpen: boolean;
    _baseCache: {
        canvas: any;
        url: any;
    } | {
        canvas: HTMLCanvasElement;
        url: any;
    } | null;
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
    cutStyle: {
        tol: number;
        feather: number;
        contiguous: boolean;
        invert: boolean;
        brush: string;
        size: number;
    };
    _cutSession: {
        layerId: any;
        img: ImageData;
        w: any;
        h: any;
        seeds: never[];
        seedMark: null;
        paint: null;
        region: null;
        shade: null;
        outline: null;
    } | null;
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
    objTrimStyle: {
        pad: number;
        shape: string;
    };
    _objSession: {
        img: ImageData;
        w: any;
        h: any;
        pt: null;
        bounds: null;
    } | null;
    buildDOM(): void;
    root: any;
    toolbar: any;
    enabledTools: any;
    _toolBtns: {} | undefined;
    _undoBtn: any;
    _redoBtn: any;
    _histBtn: any;
    stageWrap: any;
    stage: any;
    ctx: any;
    side: any;
    panel: any;
    historyPanel: any;
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
    /**
     * @param {string} [label] ヒストリー表示名
     * @param {string} [type] change イベントの type
     */
    applyCrop(label?: string, type?: string): void;
    /** レイヤー個別トリミングの適用 */
    applyLayerCrop(): void;
    /** 回転セッション: スライダの入力ごとに元canvasから回し直す（劣化を防ぐ） */
    rotateBy(deg: any, { session }?: {
        session?: boolean | undefined;
    }): void;
    endRotateSession(): void;
    /**
     * base の dataURL 化はコストが高いので、キャンバスが差し替わる／描き込まれるまで使い回す。
     * ピクセルを直に書き換える処理（消しゴム・モザイク・ワンド・コピースタンプ・ブラシ補正）は
     * 必ず touchBase() を呼ぶこと。
     */
    baseDataURL(): any;
    /** base のピクセルを直接書き換えたときに呼ぶ（dataURL キャッシュを捨てる） */
    touchBase(): void;
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
    /**
     * 現在の状態を1段としてヒストリーに積む。
     * @param {string} [label] ヒストリーパネルに出す操作名（Photoshop のヒストリー項目相当）
     */
    pushHistory(label?: string): void;
    /** ヒストリーの一覧（読み取り用）。[{ label, current, index }] */
    historyList(): {
        index: number;
        label: any;
        ts: any;
        current: boolean;
    }[];
    restore(snap: any): Promise<void>;
    _bgSession: {
        layerId: any;
        src: HTMLCanvasElement;
    } | null | undefined;
    /**
     * ヒストリーの位置を動かす。連打しても復元が交錯しないよう直列化し、
     * 途中の段は描かずに最終位置だけ反映する（Ctrl+Z 連打が軽い）。
     */
    _applyHistory(type: any): Promise<void>;
    /** 1段戻る */
    undo(): Promise<void>;
    /** 1段進む */
    redo(): Promise<void>;
    /** ヒストリーの任意の段へ飛ぶ（ヒストリーパネルのクリック） */
    jumpHistory(index: any): Promise<void>;
    /** 今の状態を残して、それ以外のヒストリーを捨てる（Photoshop の「ヒストリーを消去」相当） */
    clearHistory(): void;
    toggleHistoryPanel(open?: boolean): void;
    /** ヒストリーパネルの描画（常設なので renderPanel とは独立） */
    renderHistory(): void;
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
    _mods: {
        shiftKey: any;
        altKey: any;
    } | {
        shiftKey: any;
        altKey: any;
    } | {
        shiftKey: any;
        altKey: any;
    } | null | undefined;
    _onModKey: ((e: any) => void) | undefined;
    _onBlur: (() => void) | undefined;
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
    /** 連続入力（文字タイプ・スライダ）用の遅延履歴。打ち終わりで1段にまとめる */
    scheduleHistory(label: any): void;
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
     * 自動トリミングのセッション開始。
     * ベース画像の ImageData を1度だけ読んでおき（クリックで選び直すときに使い回す）、
     * 四隅の色を背景とみなして対象の外接矩形を検出し、トリミング枠を合わせる。
     */
    startObjTrim(): void;
    /** 対象を検出し直してトリミング枠を合わせ直す（クリック点があればその対象、なければ四隅の色から） */
    detectObjBounds(): void;
    /**
     * クリックした対象（近い色で繋がっている範囲）に枠を合わせる。
     * @param {{x: number, y: number}|null} ip image座標。null なら四隅の色からの自動検出に戻す
     */
    pickObjRegion(ip: {
        x: number;
        y: number;
    } | null): void;
    /**
     * 検出範囲に余白と形を反映してトリミング枠（cropRect）を作り直す。
     * 長方形=検出範囲の縦横比を保って拡縮 / 正方形=1:1 / フリー=縦横比自由。
     */
    fitObjTrimRect(): void;
    /** トリミング予定エリア（= 今のトリミング枠）。未開始なら null */
    objTrimRect(): {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null;
    /**
     * 自動トリミングの補助表示（スクリーン座標）。検出した対象の外接矩形を細い点線で、
     * クリックで指定した点をマーカーで出す（トリミング枠そのものは drawCropUI が描く）。
     */
    drawObjTrimUI(ctx: any): void;
    /**
     * 自動トリミングを確定する（トリミング枠で切り詰める。透過はしない）。
     * @returns {boolean} 適用したか
     */
    applyObjTrim(): boolean;
    /** 「選択して消す」の適用先。選択中の画像レイヤー、なければ null（=ベース画像） */
    cutTarget(): any;
    /**
     * 「選択して消す」のセッション開始。
     * 適用先の ImageData を1度だけ読んでおき、許容度スライダのライブプレビューで使い回す
     * （毎回 getImageData すると大きい画像でカクつくため）。座標はすべて適用先の画素座標。
     */
    startCut(): void;
    /** 選択中のレイヤーが変わっていたらセッションを作り直す（適用先を取り違えないように） */
    ensureCutSession(): {
        layerId: any;
        img: ImageData;
        w: any;
        h: any;
        seeds: never[];
        seedMark: null;
        paint: null;
        region: null;
        shade: null;
        outline: null;
    } | null;
    /** セッションの適用先レイヤー（ベース画像なら null） */
    cutLayer(sess?: {
        layerId: any;
        img: ImageData;
        w: any;
        h: any;
        seeds: never[];
        seedMark: null;
        paint: null;
        region: null;
        shade: null;
        outline: null;
    } | null): any;
    /** image座標 → 適用先の画素座標 */
    cutPoint(ip: any, sess?: {
        layerId: any;
        img: ImageData;
        w: any;
        h: any;
        seeds: never[];
        seedMark: null;
        paint: null;
        region: null;
        shade: null;
        outline: null;
    } | null): any;
    /** 適用先の画素座標 → image座標 */
    cutToImage(p: any, sess?: {
        layerId: any;
        img: ImageData;
        w: any;
        h: any;
        seeds: never[];
        seedMark: null;
        paint: null;
        region: null;
        shade: null;
        outline: null;
    } | null): any;
    /** レイヤー素材座標とレイヤーローカル座標（中心原点）のずれ */
    targetOffset(layer: any): {
        x: any;
        y: any;
    };
    /** 適用先の画素座標を image座標へ写す変換を ctx に掛ける（レイヤーは見えている範囲でクリップ） */
    applyCutTransform(ctx: any, f: any, sess?: {
        layerId: any;
        img: ImageData;
        w: any;
        h: any;
        seeds: never[];
        seedMark: null;
        paint: null;
        region: null;
        shade: null;
        outline: null;
    } | null): void;
    /**
     * クリックした場所の近似色で繋がった範囲を選ぶ（まだ消さない）。
     * @param {{x: number, y: number}} ip image座標
     * @param {'replace'|'add'|'sub'} [op] replace=選び直す / add=範囲に追加（Shift+クリック） / sub=範囲から除外（Alt+クリック）
     */
    pickCutRegion(ip: {
        x: number;
        y: number;
    }, op?: "replace" | "add" | "sub"): void;
    /**
     * クリック点1つ分の近似色の範囲を seedMark に重ねる（1=追加 / 2=除外。後のクリックほど優先）。
     * clearPaint=true なら、重なるブラシの塗りのうち逆向きのものを消す（後からした操作を優先するため）。
     * @returns {boolean} 範囲が取れたか（透明な画素をクリックしたときは false）
     */
    applyCutSeed(sess: any, seed: any, clearPaint: any): boolean;
    /**
     * 選択領域を計算し直してプレビューを更新する（許容度スライダから毎回呼ばれるのでデバウンス）。
     * クリックした点をすべて新しい許容度で選び直す。ブラシの塗りは別に持っているので消えない。
     * @param {boolean} [immediate] true なら待たずに計算する
     */
    updateCutRegion(immediate?: boolean): void;
    _cutTimer: number | undefined;
    /** 選択をすべて解除する（クリックした点もブラシの塗りも捨てる） */
    clearCutRegion(): void;
    /** クリックで選んだ範囲とブラシの塗りを合成して最終領域（mark・面積・外接矩形）を作り直す */
    rebuildCutRegion(): void;
    /**
     * ブラシで a→b の線分カプセル内を選択範囲に追加（value=1）／除外（value=-1）する。a, b は image座標。
     * なぞるたびに画像全体を作り直すと大きい画像でカクつくので、変わった矩形だけを更新する
     * （外接矩形は追加方向だけ差分で広げ、正確な値と輪郭の点線は pointerUp の rebuildCutRegion で出す）。
     */
    paintCutSegment(aImg: any, bImg: any, value: any): void;
    /**
     * 選択領域から暗転オーバーレイと輪郭（点線用の Path2D）を作る。プレビューで毎フレーム作ると
     * 大きい画像で作り直し続けることになるので、選択が変わったときだけ作る。
     */
    buildCutMask(): void;
    /**
     * 暗転オーバーレイのうち矩形 (x0,y0)-(x1,y1) の画素だけを描き直す。
     * ペン切り抜きと同じく、選択範囲の外側を暗くする（消すのが内側か外側かに関わらず同じ見え方）。
     */
    drawCutOverlay(x0: any, y0: any, x1: any, y1: any): void;
    /** 領域の塗りつぶしマスク（白＝選択範囲）。消す実行時にだけ作る */
    cutMaskCanvas(): HTMLCanvasElement | null;
    /**
     * 今クリック/ドラッグしたら何が起きるか（修飾キー込み）。
     * Shift=追加・Alt=除外（Photoshop と同じ）。修飾キーなしは「クリックで選択」なら選び直し、ブラシならその向き。
     * @param {{shiftKey?: boolean, altKey?: boolean}|null} [e]
     * @returns {'replace'|'add'|'sub'}
     */
    cutOp(e?: {
        shiftKey?: boolean;
        altKey?: boolean;
    } | null): "replace" | "add" | "sub";
    /** 「選択して消す」のカーソル。追加なら＋、除外なら−の付いた十字にする */
    updateCutCursor(): void;
    /**
     * 「選択して消す」のライブプレビュー（スクリーン座標）。
     * ペン切り抜きと同じ見え方: 選択範囲の外側を暗転し、境界を白の点線で囲む。クリック点・ブラシ円も出す。
     */
    drawCutUI(ctx: any, f: any): void;
    /**
     * 「選択して消す」を確定する（選択範囲を透明にする。invert なら選択範囲以外を透明にする）。
     * 確定後も道具は持ったままにして、続けて別の場所を選べるようにする。
     * @returns {boolean} 適用したか
     */
    applyCut(): boolean;
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
