export function setupPalette(diagram: any, target: any, items: any): {
    destroy(): void;
} | null;
export const DEFAULT_PALETTE_ITEMS: ({
    type: string;
    label: string;
    draw?: undefined;
    defaults?: undefined;
} | {
    draw: {
        arrow: string;
        arrowStart?: undefined;
    };
    label: string;
    type?: undefined;
    defaults?: undefined;
} | {
    draw: {
        arrow: string;
        arrowStart: string;
    };
    label: string;
    type?: undefined;
    defaults?: undefined;
} | {
    type: string;
    label: string;
    defaults: {
        emoji: string;
    };
    draw?: undefined;
})[];
