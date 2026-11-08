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
/** Keep DOM ownership/theming while escaping transformed/clipped ancestors. */
export function prepareViewportLayer(el: any): boolean;
/** Convert viewport positions on browsers without the top-layer API too. */
export function setViewportPosition(el: any, left: any, top: any, size?: {}): void;
export function hideViewportLayer(el: any): void;
/** A top-layer popup must stop participating when its editor loses ownership of focus. */
export function watchPopupFocus(wrapper: any, leave: any, anchors?: any[]): {
    readonly active: boolean;
    destroy(): void;
};
