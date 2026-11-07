export function normalizeTocAttrs(attrs?: {}): {
    title: string;
    subheadings: boolean;
    numbered: boolean;
    items: any;
};
export function tocInnerHTML(raw: any): string;
export function insertToc(doc: any, pos: any, mode?: string, attrs?: {}): false | {
    selection: {
        anchor: number;
        head: number;
    };
};
export const toc: any;
