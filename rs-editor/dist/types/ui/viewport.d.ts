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
/** `offset` は基準矩形との間隔（既定は画面端の余白と同じ 8px）。 */
export function placePopup(el: any, rect: any, { above, center, offset }?: {
    above?: boolean | undefined;
    center?: boolean | undefined;
    offset?: number | undefined;
}): void;
/** Keep DOM ownership/theming while escaping transformed/clipped ancestors. */
export function prepareViewportLayer(el: any): boolean;
/** Convert viewport positions on browsers without the top-layer API too. */
export function setViewportPosition(el: any, left: any, top: any, size?: {}): void;
/** キーボード表示中の見えている範囲（VisualViewport）へ要素をスクロールする。 */
export function revealInViewport(el: any, margin?: number): void;
export function hideViewportLayer(el: any): void;
/** A top-layer popup must stop participating when its editor loses ownership of focus. */
export function watchPopupFocus(wrapper: any, leave: any, anchors?: any[]): {
    readonly active: any;
    destroy(): void;
};
