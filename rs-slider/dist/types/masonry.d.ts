export function createRSMasonry(target: any, options?: {}): {
    root: Element;
    filter: (category: any) => void;
    getFilter: () => null;
    getCategories: () => any[];
    openLightbox: (i: any) => void;
    relayout: () => void;
    on: (t: any, fn: any) => () => void;
    off: (t: any, fn: any) => void;
    destroy: () => void;
};
