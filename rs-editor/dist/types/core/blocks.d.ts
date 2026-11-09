/** Locate the containing box/quote and its direct child without crossing its boundary. */
export function blockContext(doc: any, pos: any, start?: number): {
    parent: any;
    node: any;
    index: number;
    start: number;
    end: number;
} | {
    parent: any;
    node: null;
    index: any;
    start: number;
    end: number;
};
export function ensureInputChild(parent: any): void;
export function insertBlock(doc: any, pos: any, node: any, { replaceEmpty, trailing, beforeEmpty }?: {
    replaceEmpty?: boolean | undefined;
    trailing?: boolean | undefined;
    beforeEmpty?: boolean | undefined;
}): {
    parent: any;
    index: any;
    start: number;
    replaced: boolean;
};
/** Selected sibling runs. Box and quote boundaries remain intact even for cross-container ranges. */
export function blockGroups(doc: any, from: any, to: any, { accept, descend }?: {
    accept?: (() => boolean) | undefined;
    descend?: ((node: any) => boolean) | undefined;
}): any[];
export function isBlockContainer(node: any): boolean;
