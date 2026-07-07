export class DragController {
    constructor(gantt: any);
    g: any;
    state: {
        mode: string;
        id: any;
        task: any;
        barEl: any;
        side: any;
        startX: any;
        startY: any;
        orig: {
            start: any;
            end: any;
            duration: any;
            progress: any;
        };
        rect: any;
        preview: null;
        targetId: null;
        moved: boolean;
        raf: number;
        lastEvent: null;
    } | null;
    suppressClick: boolean;
    _onDown: (e: any) => void;
    _onMove: (e: any) => void;
    _onUp: (e: any) => void;
    _onKey: (e: any) => void;
    onDown(e: any): void;
    onMove(e: any): void;
    _beginVisuals(): void;
    tooltip: HTMLDivElement | null | undefined;
    ghost: HTMLDivElement | null | undefined;
    tempPath: SVGPathElement | null | undefined;
    _update(e: any): void;
    _updateGhost(startSerial: any, endSerial: any): void;
    _updateLinkDrag(e: any): void;
    _targetEl: any;
    _tip(e: any, text: any): void;
    onUp(): void;
    cancel(): void;
    _teardown(): void;
    destroy(): void;
}
