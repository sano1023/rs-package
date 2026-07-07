export class Timeline {
    constructor(gantt: any);
    gantt: any;
    _uid: number;
    headerEl: HTMLDivElement;
    h1El: HTMLDivElement;
    h2El: HTMLDivElement;
    bodyEl: HTMLDivElement;
    underEl: HTMLDivElement;
    barsEl: HTMLDivElement;
    svg: SVGSVGElement;
    overEl: HTMLDivElement;
    _rects: Map<any, any>;
    _linkEls: Map<any, any>;
    _barId(el: any): any;
    _makeArrowDefs(): void;
    arrowId: string | undefined;
    render(): void;
    renderHeader(): void;
    /** 下段ヘッダーのセル境界に合わせた縦罫線 */
    _renderGridLines(height: any): void;
    renderBars(): void;
    _makeConn(side: any): HTMLDivElement;
    renderLinks(): void;
    /** FS リンクの直角折れ線パス（rects の上書きを渡せる: ドラッグ中のプレビュー用） */
    _linkPath(link: any, overrides?: null): string | null;
    /** ドラッグ中: 指定タスクに接続する依存線だけプレビュー矩形で引き直す */
    updateTaskLinks(taskId: any, previewRect: any): void;
    /** バー矩形（ドラッグ計算用） */
    barRect(taskId: any): any;
    /** 選択状態だけ更新（再描画なし） */
    updateSelection(): void;
}
