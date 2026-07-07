export function createRSMarquee(target: any, options?: {}): {
    root: Element;
    play: () => void;
    pause: () => void;
    isPlaying: () => boolean;
    setSpeed: (v: any, rowIndex: any) => void;
    setReverse: (flag: any, rowIndex: any) => void;
    getRowCount: () => number;
    on: (t: any, fn: any) => () => void;
    off: (t: any, fn: any) => void;
    destroy: () => void;
};
