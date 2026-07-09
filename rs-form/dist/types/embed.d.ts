/**
 * 埋め込みスニペットの構成要素を返す（テスト・カスタム組み立て用）。
 * @param {object} schema フォームスキーマ（多言語 `{ja,en}` 可）
 * @param {object} [options] { baseUrl, mountId, mode, locale, fallbackLocale, variant, variantSeed,
 *                             cssHref, autosave, storageKey, pretty, formOptions }
 * @returns {{ mountId, baseUrl, importUrl, cssHref, schemaJson, optionsJson, css, js, html }}
 */
export function buildEmbedSnippet(schema: object, options?: object): {
    mountId: any;
    baseUrl: any;
    importUrl: any;
    cssHref: any;
    schemaJson: any;
    optionsJson: any;
    css: any;
    js: any;
    html: any;
};
/**
 * 貼り付け用の埋め込みHTML（CSS link + マウント div + module script）を文字列で返す。
 * @param {object} schema
 * @param {object} [options] buildEmbedSnippet と同じ
 * @returns {string}
 */
export function generateEmbedSnippet(schema: object, options?: object): string;
