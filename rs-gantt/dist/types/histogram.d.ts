export class ResourceHistogram {
    constructor(gantt: any);
    gantt: any;
    titleEl: HTMLDivElement;
    titleTextEl: HTMLSpanElement;
    overEl: HTMLSpanElement;
    modeBtn: HTMLButtonElement;
    bodyEl: HTMLDivElement;
    labelsEl: HTMLDivElement;
    chartWrap: HTMLDivElement;
    chartEl: HTMLDivElement;
    /** タイムラインの横スクロールに追従（日の x をバーと揃える） */
    syncScroll(): void;
    render(): void;
}
