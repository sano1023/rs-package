export class FormModel {
    /**
     * @param {object} schema { title, description, pages: [{ title, questions: [...] }] } または { questions: [...] }
     * @param {object} options { autosave, storageKey, storage, messages, types(Map name→typeDef) }
     */
    constructor(schema: object, options?: object);
    options: object;
    messages: any;
    types: any;
    _originalSchema: any;
    schema: object;
    pages: {
        title: any;
        description: any;
        questions: never[];
    }[];
    questions: any[];
    questionByName: Map<any, any>;
    values: {};
    comments: {};
    visibility: {};
    pageIndex: number;
    completed: boolean;
    _listeners: Map<any, any>;
    _storage: any;
    _storageKey: string;
    /** 質問定義にタイプ既定値を合成した作業用オブジェクトを作る（原本は変更しない） */
    _prepareQuestion(rawQ: any): any;
    _buildVisibleIf(): void;
    _depIndex: Map<any, any> | undefined;
    /** 式評価用の値解決。非表示質問の値は undefined として扱う */
    _effectiveValue(name: any): any;
    _computeVisibility(q: any): any;
    _evaluateAllVisibility(): void;
    /** name の値変更に依存する質問だけ再評価（カスケードあり） */
    _reevaluateDependents(startName: any): {
        name: any;
        visible: any;
    }[];
    isVisible(name: any): boolean;
    /** 計算フィールド（q.expression / q.calc）をコンパイルし、依存インデックスを作る */
    _buildCalc(): void;
    _calcIndex: Map<any, any> | undefined;
    _calcQuestions: any[] | undefined;
    _evalCalc(q: any): any;
    /** 全計算フィールドを収束するまで再計算（初期化・復元・setAnswers 用） */
    _recomputeAllCalcs(): void;
    /** name の変更に依存する計算フィールドだけ再計算（change 発火・カスケードあり） */
    _recomputeCalcs(startName: any): void;
    getValue(name: any): any;
    /** 値を設定し、依存する visibleIf を再評価。イベント発火と自動保存も行う */
    setValue(name: any, value: any, opts?: {}): void;
    /** blur 時の確定処理: 正規化してから保存する。正規化後の値を返す */
    commitValue(name: any): any;
    /** 「その他」自由記述の設定 */
    setComment(name: any, text: any): void;
    getComment(name: any): any;
    /** その質問で「その他」が選択されているか */
    _isOtherSelected(q: any): boolean;
    /**
     * 回答JSONを返す。非表示質問・空値は含めない。number は数値型・checkbox は配列。
     * 「その他」自由記述は `${name}_other` キーで併記する。
     */
    getAnswers(): {};
    /** 回答JSONの流し込み（getAnswers とラウンドトリップ保証） */
    setAnswers(answers: any): void;
    /** スキーマJSONを返す（ラウンドトリップ保証: 渡されたスキーマの deep clone） */
    getSchema(): any;
    /**
     * 1質問だけ検証する（blur 時のインライン検証用）。正規化も行う。
     * @returns {string[]} エラーメッセージ配列（非表示・未知タイプは常に空）
     */
    validateOne(name: any): string[];
    /**
     * 検証する。
     * @param {number|null} pageIndex 対象ページ（null で全ページ）。非表示質問は検証対象外
     * @returns {{ ok: boolean, errors: Array<{name, pageIndex, messages}> }}
     */
    validate(pageIndex?: number | null): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    get pageCount(): number;
    getProgress(): {
        pageIndex: number;
        pageCount: number;
        percent: number;
    };
    /** 現在ページを検証し、OKなら次ページへ。戻り値は validate の結果 */
    nextPage(): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    /** 前ページへ（検証なし・入力値は保持される） */
    prevPage(): void;
    goToPage(index: any, opts?: {}): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    _go(index: any): void;
    /** 全体を検証し、OKなら submit イベントを発火して下書きをクリアする */
    submit(): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    _saveDraft(): void;
    _restoreDraft(): void;
    _restored: boolean | undefined;
    clearDraft(): void;
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    _emit(event: any, payload: any): void;
    destroy(): void;
}
