export function createRSTour(options?: {}): {
    start: (index?: number) => void;
    stop: (reason?: string) => void;
    next: () => void;
    previous: () => void;
    readonly active: boolean;
    readonly currentIndex: number;
};
export default createRSTour;
