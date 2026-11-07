export function normalizeBoxAttrs(a?: {}): {
    style: any;
    title: string;
    color: any;
    icon: any;
};
export function findBox(doc: any, pos: any): null;
export function wrapBox(doc: any, selection: any, attrs: any): boolean | {
    selection: {
        anchor: number;
        head: number;
    };
};
export function editBox(doc: any, pos: any, action: any, attrs: any): boolean | {
    selection: {
        anchor: any;
        head: any;
    };
};
export const box: any;
