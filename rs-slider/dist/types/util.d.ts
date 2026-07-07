export function resolveTarget(target: any): Element;
export function el(tag: any, className: any, attrs: any): any;
export function clamp(value: any, min: any, max: any): number;
export function wrapIndex(i: any, count: any): number;
export function createEmitter(): {
    on(type: any, fn: any): () => void;
    off(type: any, fn: any): void;
    emit(type: any, ...args: any[]): void;
    clear(): void;
};
export function normalizeAutoplay(option: any, defaultInterval?: number): any;
export function prefersReducedMotion(): boolean;
export function onMobileChange(breakpoint: any, cb: any): () => void;
export function pickSrc(item: any, isMobile: any): any;
export function pointerDrag(target: any, handlers?: {}): () => void;
export function buildContent(item: any, count: any): any;
