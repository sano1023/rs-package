/** Layout viewport coordinates shared by fixed overlays and VisualViewport. */
export function visibleViewport(win: any): {
    left: any;
    top: any;
    width: any;
    height: any;
    right: any;
    bottom: any;
};
export function watchViewport(win: any, update: any): () => void;
export function placePopup(el: any, rect: any, { above, center }?: {
    above?: boolean | undefined;
    center?: boolean | undefined;
}): void;
