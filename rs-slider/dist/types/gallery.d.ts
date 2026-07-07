export function createRSGallery(target: any, options?: {}): {
    root: Element;
    next: () => void;
    prev: () => void;
    goTo: (i: any) => void;
    setItems: (items: any, { startIndex, instant }?: {
        startIndex?: number | undefined;
        instant?: boolean | undefined;
    }) => void;
    getIndex: () => number;
    getCount: () => number;
    on: (t: any, fn: any) => () => void;
    off: (t: any, fn: any) => void;
    destroy: () => void;
};
