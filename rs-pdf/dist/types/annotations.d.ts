export class AnnotationManager {
    /**
     * @param {import('./viewer.js').Viewer} viewer
     * @param {object} options { author, tools, annotationTypes, annotationStyle }
     */
    constructor(viewer: import("./viewer.js").Viewer, options?: object);
    viewer: import("./viewer.js").Viewer;
    options: object;
    author: any;
    types: Map<any, any>;
    list: any[];
    selectedId: any;
    tool: string;
    style: any;
    undoStack: any[];
    redoStack: any[];
    _draft: {
        type: string;
        page: number;
        style: {
            color: any;
            width: any;
            opacity: any;
        };
    } | null;
    _drag: {
        kind: string;
        endpoint: number;
        dir: any;
        svg: any;
        before: any;
        work: any;
        start: {
            page: number;
            x: number;
            y: number;
        };
        moved?: undefined;
    } | {
        kind: string;
        svg: any;
        before: any;
        work: any;
        start: {
            page: number;
            x: number;
            y: number;
        };
        moved: boolean;
        endpoint?: undefined;
        dir?: undefined;
    } | {
        kind: string;
        svg: any;
        start: {
            page: number;
            x: number;
            y: number;
        };
        endpoint?: undefined;
        dir?: undefined;
        before?: undefined;
        work?: undefined;
        moved?: undefined;
    } | null;
    _layers: Map<any, any>;
    _emit(event: any, payload: any): void;
    _apply(cmd: any): void;
    undo(): boolean;
    redo(): boolean;
    /** 注釈を追加する（正規化座標のモデルを渡す） */
    add(annot: any): any;
    get(id: any): any;
    update(id: any, patch: any): any;
    remove(id: any): boolean;
    select(id: any): void;
    toJSON(): {
        version: number;
        annotations: any;
    };
    fromJSON(json: any): this;
    _attachAll(): void;
    _attachPage(i: any): void;
    redrawAll(): void;
    /** 指定ページ（0始まり）のSVGをモデルから描き直す */
    redrawPage(i: any): void;
    _bbox(a: any): any;
    _drawSelectionUI(svg: any, i: any, w: any, h: any): void;
    /** 付箋の本文を吹き出しで描く（本文が空なら「（ダブルクリックで入力）」を薄く表示） */
    _drawNoteBubble(ui: any, b: any, w: any, h: any, contents: any): void;
    _svgFromEvent(e: any): any;
    /** クライアント座標 → 正規化ページ座標（0〜1） */
    _toNorm(svg: any, e: any): {
        page: number;
        x: number;
        y: number;
    };
    _buildBar(tools: any): void;
    bar: HTMLDivElement | undefined;
    _toolBtns: Map<any, any> | undefined;
    colorInput: HTMLInputElement | undefined;
    widthInput: HTMLInputElement | undefined;
    setTool(name: any): void;
    _updateBar(): void;
    _bind(): void;
    _onDown: ((e: any) => void) | undefined;
    _onMove: ((e: any) => void) | undefined;
    _onUp: ((e: any) => void) | undefined;
    _onKey: ((e: any) => void) | undefined;
    _onDbl: ((e: any) => void) | undefined;
    destroy(): void;
    _keydown(e: any): void;
    _pointerDown(e: any): void;
    _pointerMove(e: any): void;
    _pointerUp(e: any): void;
    _dblclick(e: any): void;
    _placeClickTool(def: any, svg: any, p: any, e: any): void;
    /**
     * スタンプツールのプリセット画像を設定する（rs-sign の電子印鑑PNG等）。
     * 設定中はスタンプツールのクリックでファイル選択を開かず、この画像を押す。null で解除。
     */
    setStampImage(dataURL: any, { widthPt }?: {
        widthPt?: number | undefined;
    }): void;
    _stampImage: any;
    _stampWidthPt: number | undefined;
    _placePresetStamp(p: any): void;
    /** フリーテキストの編集（新規/既存共通・浮動textarea） */
    _editText(a: any, evt: any): void;
    _editNote(a: any): void;
    _pickStampImage(p: any): void;
    /** 現在のテキスト選択からマークアップ注釈を作る（highlight/underline/strikeout ツール中の pointerup で呼ぶ） */
    applyMarkupFromSelection(type?: string): any[] | null;
    /**
     * 注釈を焼き込んだ画像PDFを生成する。
     * @param {object} opts { pages?: number[](1始まり), scale?: number, quality?: number, download?: boolean, filename?: string }
     * @returns {Promise<Blob>}
     */
    flatten(opts?: object): Promise<Blob>;
    /** 元PDFのバイト列を取得する（saveAnnotated用） */
    _sourceBytes(): Promise<Uint8Array<any>>;
    /** 見た目を画像APで与えるタイプ（freetext/stamp/datestamp）のAP用canvasを作る */
    _apCanvasFor(a: any): Promise<HTMLCanvasElement | null>;
    /**
     * 元PDFへ注釈を「本物のPDF注釈」として増分更新で追記して保存する。
     * 元のバイト列は一切変更されない（末尾追記のみ）。Acrobat等で開ける。
     * @param {object} opts { download?, filename? }
     * @returns {Promise<Blob>}
     */
    saveAnnotated(opts?: object): Promise<Blob>;
    /** ページの注釈だけを含むスタンドアロンSVG文字列（flatten用・選択UIなし） */
    _standaloneSVG(i: any, pxW: any, pxH: any): string | null;
}
