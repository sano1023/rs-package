export function normalizeLinkCardAttrs(raw?: {}): {
    url: string;
    title: string;
    description: string;
    image: string;
    label: string;
    newTab: boolean;
};
export function serializeLinkCard(node: any): string;
export function insertLinkCard(doc: any, pos: any, attrs: any): false | {
    selection: {
        anchor: any;
        head: any;
    };
};
export function editLinkCard(doc: any, pos: any, action: any, attrs: any): boolean | {
    selection: {
        anchor: any;
        head: any;
    };
};
export const linkcard: any;
