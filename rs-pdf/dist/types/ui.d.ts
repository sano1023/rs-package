/**
 * ビューアのDOM一式を構築して参照を返す。
 * @param {HTMLElement} root .rsp-root
 * @param {import('./viewer.js').Viewer} viewer
 */
export function buildUI(root: HTMLElement, viewer: import("./viewer.js").Viewer): {
    toolbar: HTMLDivElement;
    searchbar: HTMLDivElement;
    body: HTMLDivElement;
    sidebar: HTMLDivElement;
    scroller: HTMLDivElement;
    area: HTMLDivElement;
    loading: HTMLDivElement;
    error: HTMLDivElement;
    btnSidebar: HTMLButtonElement;
    btnPrev: HTMLButtonElement;
    btnNext: HTMLButtonElement;
    pageInput: HTMLInputElement;
    pageCount: HTMLSpanElement;
    btnZoomOut: HTMLButtonElement;
    btnZoomIn: HTMLButtonElement;
    zoomSelect: HTMLSelectElement;
    customOpt: HTMLOptionElement;
    btnRotate: HTMLButtonElement;
    btnSearch: HTMLButtonElement;
    btnPrint: HTMLButtonElement;
    searchInput: HTMLInputElement;
    searchCount: HTMLSpanElement;
    btnSearchPrev: HTMLButtonElement;
    btnSearchNext: HTMLButtonElement;
};
