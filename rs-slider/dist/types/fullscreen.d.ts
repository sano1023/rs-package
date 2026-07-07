export function createRSFullscreen(target: any, options?: {}): {
    root: Element;
    next: () => void;
    prev: () => void;
    goTo: (i: any) => void;
    getIndex: () => number;
    getCount: () => number;
    enterFullscreen: () => Promise<void>;
    on: (t: any, fn: any) => () => void;
    off: (t: any, fn: any) => void;
    destroy: () => void;
};
