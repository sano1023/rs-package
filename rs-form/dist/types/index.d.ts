/** レンダラを表示モードに登録する（conversational エントリ等が使う） */
export function registerRenderer(mode: any, RendererClass: any): any;
/**
 * 質問タイプ定義のヘルパー（組み込みタイプもすべてこのAPIで実装されている）。
 * @param {object} def { name, defaults?, group?, render(ctx) }
 */
export function defineQuestionType(def: object): object;
/**
 * フォームを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object|null} schema フォームスキーマ（素のJSON）
 * @param {object} options オプション
 * @returns {RSForm}
 */
export function createRSForm(target: string | HTMLElement, schema: object | null, options?: object): RSForm;
export class RSForm {
    /**
     * @param {string|HTMLElement} target セレクタ or 要素
     * @param {object|null} schema フォームスキーマ（素のJSON）
     * @param {object} options mode / autosave / storageKey / messages / questionTypes /
     *                         addressLookup / datepicker / submitText / progressBar など
     */
    constructor(target: string | HTMLElement, schema: object | null, options?: object);
    el: Element;
    options: {
        mode: string;
    };
    registry: Map<string, {
        name: string;
        defaults: {};
        render(ctx: any): any;
    }>;
    _RendererClass: typeof StandardRenderer;
    _rawSchema: object | null;
    _locale: any;
    _fallbackLocale: any;
    variant: any;
    _userListeners: any[];
    /** options.variant（明示） or options.variantSeed（決定的割当）からバリアントを決める */
    _resolveVariant(schema: any): any;
    /** バリアント適用 → ロケール畳み込み の順で実効スキーマを作り、モデルとレンダラを構築する */
    _buildCore(): void;
    model: FormModel | undefined;
    renderer: StandardRenderer | undefined;
    /** モデルとレンダラを作り直す（locale/variant 切替時）。回答・ページ位置・利用者リスナーを引き継ぐ */
    _rebuild(): void;
    /** 下書きが復元されて開始したか（autosave: true のとき） */
    get restored(): boolean;
    /** 回答JSON（非表示質問は含まない。number は数値・checkbox は配列） */
    getAnswers(): {};
    /** 回答JSONの流し込み（getAnswers とラウンドトリップ保証） */
    setAnswers(answers: any): this;
    /** スキーマJSONを返す（ラウンドトリップ保証） */
    getSchema(): any;
    /** 現在のロケール（未設定なら null） */
    getLocale(): any;
    /** 原本スキーマに含まれる多言語ロケールの一覧（言語切替UIの構築に使える） */
    availableLocales(): string[];
    /**
     * 表示言語を切り替える。回答・ページ位置・イベントリスナーは保持したまま再描画する。
     * @param {string} locale
     * @param {object} [opts] { fallbackLocale }
     */
    setLocale(locale: string, opts?: object): this;
    /** 割り当てられている A/Bバリアント名（未使用なら null） */
    getVariant(): any;
    getValue(name: any): any;
    setValue(name: any, value: any): this;
    isVisible(name: any): boolean;
    /** 手動検証。{ ok, errors: [{ name, pageIndex, messages }] } を返し、エラーをUIに表示する */
    validate(pageIndex?: null): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    /** プログラム submit（検証 → OKなら submit イベント発火・下書きクリア） */
    submit(): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    nextPage(): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    prevPage(): this;
    goToPage(index: any, opts: any): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    getProgress(): {
        pageIndex: number;
        pageCount: number;
        percent: number;
    };
    /**
     * クイズ採点結果を返す（schema.scoring / schema.quiz のとき。それ以外は null）。
     * @returns {null|{ score, maxScore, percent, correctCount, total, passed, details }}
     */
    getGrade(): null | {
        score: any;
        maxScore: any;
        percent: any;
        correctCount: any;
        total: any;
        passed: any;
        details: any;
    };
    /** 下書き（localStorage）を明示的に消す */
    clearDraft(): this;
    /** 'submit' | 'change' | 'pageChange' | 'visibilityChange' | 'validate' | 'answersChange' | 'localeChange' */
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    destroy(): void;
}
import { StandardRenderer } from './renderer-standard.js';
import { FormModel } from './model.js';
import { defineValidator } from './validators.js';
import { builtinTypes } from './types.js';
import { DEFAULT_MESSAGES } from './validators.js';
export { defineValidator, builtinTypes, FormModel, DEFAULT_MESSAGES };
export { normalizeValue, validateQuestion } from "./validators.js";
export { normalizePostal, normalizeTel, applyCharset, toWareki, toHankakuAlnum, toZenkakuAlnum, hankakuKanaToZenkaku, hiraganaToKatakana, katakanaToHiragana } from "./ja-text.js";
export { compileExpr, compileCalc, parseExpr } from "./expr.js";
export { KanaCollector, attachKanaSource, isKanaOnly } from "./kana-source.js";
export { isCorrect, gradeQuestion, gradeAnswers, scoringConfig, buildResultPanel } from "./scoring.js";
export { summarize, tallyChoices, tallyNPS, tallyRating, numericStats, collectText, createRSFormSummary, flattenQuestions } from "./summary.js";
export { createRSFormThemeEditor, applyTheme, themeToCSS, defaultTheme, THEME_FIELDS } from "./theme.js";
export { resolveSchemaLocale, resolveText, isLocalized, schemaLocales, mapTextFields } from "./i18n-schema.js";
export { applyVariant, assignVariant, pickVariantSchema, collectVariants, variantMatches, normalizeVariants, hashSeed } from "./variant.js";
export { generateEmbedSnippet, buildEmbedSnippet } from "./embed.js";
