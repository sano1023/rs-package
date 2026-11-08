/**
 * Keep completed uploads until they are inserted or explicitly discarded.
 * @param {import('../editor.js').Editor} ed
 * @param {Iterable<File>} files
 * @param {{bookmark?: object|null, alt?: string}} options
 */
export function uploadImages(ed: import("../editor.js").Editor, files: Iterable<File>, { bookmark, alt }?: {
    bookmark?: object | null;
    alt?: string;
}): Promise<boolean>;
