export function createRSCoverflow(target: any, options?: {}): {
    root: Element;
    next: () => void;
    prev: () => void;
    goTo: (i: any) => void;
    getIndex: () => number;
    getCount: () => number;
    on: (t: any, fn: any) => () => void;
    off: (t: any, fn: any) => void;
    destroy: () => void;
};
