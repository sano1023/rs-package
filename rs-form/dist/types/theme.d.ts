/** 既定テーマ（フィールド定義から生成） */
export function defaultTheme(): {};
/**
 * テーマを要素（1つ or 複数）へ適用する。--rsf-focus はプライマリから自動導出する。
 * rs-form のスコープ（.rsf / .rsfb）は自前で --rsf-* を宣言するため、指定要素の内側にある
 * それらのルート要素にも同時に適用する（インラインstyleは既定宣言に勝つ）。
 * @param {HTMLElement|HTMLElement[]} targets 適用先（フォームを含むラッパでもよい）
 * @param {object} theme { '--rsf-*': 値 }
 */
export function applyTheme(targets: HTMLElement | HTMLElement[], theme: object): void;
/** テーマを CSS テキストとして書き出す（.rsf / :root へ貼り付けられる形） */
export function themeToCSS(theme: any, selector?: string): string;
/**
 * テーマエディタ GUI を生成する。
 * @param {string|HTMLElement} target エディタUIの描画先
 * @param {object} options { apply?(適用先要素/セレクタ/配列), theme?, onChange? }
 * @returns {{ el, getTheme, setTheme, applyTo, exportCSS, reset, on, off, destroy }}
 */
export function createRSFormThemeEditor(target: string | HTMLElement, options?: object): {
    el: any;
    getTheme: any;
    setTheme: any;
    applyTo: any;
    exportCSS: any;
    reset: any;
    on: any;
    off: any;
    destroy: any;
};
/**
 * rs-form テーマエディタ（v0.4）
 *
 * CSS カスタムプロパティ（--rsf-*）を GUI で編集し、プレビューに即時反映する。
 * テーマは素のオブジェクト（{ '--rsf-primary': '#2563eb', ... }）。CSSとして書き出せる（exportCSS）。
 *
 *   import { createRSFormThemeEditor } from 'rs-form/theme';
 *   const ed = createRSFormThemeEditor('#editor', { apply: '#preview' });
 *   ed.on('change', (theme) => save(theme));
 *
 * applyTheme() は DOM 非依存の純粋ロジックに近い（要素の style へ set するだけ）。
 */
/** 編集対象のフィールド定義（既定値は rs-form.css の :root と一致させる） */
export const THEME_FIELDS: ({
    name: string;
    label: string;
    type: string;
    default: string;
    min?: undefined;
    max?: undefined;
    step?: undefined;
    unit?: undefined;
} | {
    name: string;
    label: string;
    type: string;
    min: number;
    max: number;
    step: number;
    unit: string;
    default: string;
})[];
