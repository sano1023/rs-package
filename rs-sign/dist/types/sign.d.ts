/**
 * 文書への配置・締結ワークフローを生成する。
 * @param {string|HTMLElement} target コンテナ
 * @param {{pages: Array}} doc ページ画像配列
 * @param {object} options { mode, signers, signer, zoom }
 */
export function createRSSign(target: string | HTMLElement, doc: {
    pages: any[];
}, options?: object): Sign;
export class Sign {
    /**
     * @param {string|HTMLElement} target コンテナ
     * @param {{pages: Array<string|HTMLImageElement|HTMLCanvasElement>}} doc
     * @param {object} options { mode='edit', signers=[], signer=null, zoom=1, actor='creator' }
     */
    constructor(target: string | HTMLElement, doc: {
        pages: Array<string | HTMLImageElement | HTMLCanvasElement>;
    }, options?: object);
    el: any;
    doc: {
        pages: Array<string | HTMLImageElement | HTMLCanvasElement>;
    };
    options: {
        mode: string;
        actor: string;
    };
    mode: string;
    state: string;
    zoom: number;
    fields: any[];
    signers: any;
    currentSigner: string | null;
    orderMode: string;
    order: string[];
    deadline: string | null;
    _declined: {
        who: string | null;
        reason: string;
        at: any;
    } | {
        who: string | null;
        reason: string;
        at: string;
    } | null;
    _returns: any[];
    chain: AuditChain;
    _pageSources: any[];
    _pageEls: any[];
    _fieldEls: Map<any, any>;
    _selectedId: any;
    _armedType: any;
    _drag: {
        kind: any;
        f: any;
        el: any;
        grabDX: number;
        grabDY: number;
        moved: boolean;
    } | null;
    _modal: {
        overlay: HTMLDivElement;
        cleanup: () => void;
        prevFocus: Element | null;
    } | null;
    _listeners: Map<any, any>;
    _hanko: import("./hanko.js").Hanko;
    _pageRefs: (string | HTMLCanvasElement | HTMLImageElement)[] | undefined;
    _onDragMove: (e: any) => void;
    _onDragUp: (e: any) => void;
    ready: Promise<this>;
    _ro: ResizeObserver | undefined;
    _build(): void;
    toolbarEl: HTMLDivElement | undefined;
    scrollEl: HTMLDivElement | undefined;
    pagesEl: HTMLDivElement | undefined;
    _loadPages(): Promise<{
        el: any;
        naturalW: any;
        naturalH: any;
        displaySrc: string;
    }[]>;
    _renderPages(): void;
    _baseWidth(): number;
    _applyZoom(): void;
    _renderFields(): void;
    _applyFieldStyle(el: any, f: any): void;
    _fieldEl(f: any): HTMLDivElement;
    _fieldContent(f: any): HTMLDivElement;
    _signerName(id: any): any;
    _actionable(f: any): boolean;
    /** 直列順で手番待ち（当人の担当だが前の署名者が未完了）か */
    _blockedByOrder(f: any): boolean;
    _pagePointerDown(e: any, pageIndex: any): void;
    _creating: {
        id: any;
        type: any;
        page: any;
        x: any;
        y: any;
        w: any;
        h: any;
        signer: any;
        required: any;
        label: any;
        value: any;
    } | null | undefined;
    _pointPct(e: any, pageIndex: any): {
        px: any;
        py: any;
    };
    _beginDrag(kind: any, f: any, e: any, el: any): void;
    _dragMove(e: any): void;
    _dragUp(): void;
    _activateField(f: any): void;
    _openFillModal(f: any): void;
    _labeledInput(parent: any, labelText: any, type: any, value: any): HTMLInputElement;
    _btn(text: any, onClick: any, variant: any): HTMLButtonElement;
    _shake(el: any): void;
    _trapFocus(dialog: any): void;
    _onModalKey: ((e: any) => void) | undefined;
    _closeModal(): void;
    _fillField(f: any, value: any): void;
    /** 現在署名者の未充足フィールドへスクロール誘導する */
    _scrollToNext(): void;
    /**
     * 全ページを canvas 合成し PNG 配列も返す。
     * @returns {Promise<{pages: HTMLCanvasElement[], pngs: string[]}>}
     */
    composite(): Promise<{
        pages: HTMLCanvasElement[];
        pngs: string[];
    }>;
    _drawFieldValue(c2d: any, f: any, W: any, H: any, img: any): void;
    _complete(): Promise<void>;
    /** 署名を辞退して declined へ遷移する（理由コメント付き） */
    decline(reason?: string): Promise<this>;
    /**
     * 差し戻し: declined の文書をコメント付きで signing に戻す（v0.3）。
     * opts.reset=true で対象署名者（既定=辞退した署名者）の充足値をクリアし再入力を促す。
     * @param {string} comment 差し戻しコメント（必須ではないが監査へ記録）
     * @param {{reset?:boolean, signer?:string}} opts
     */
    sendBack(comment?: string, opts?: {
        reset?: boolean;
        signer?: string;
    }): Promise<this>;
    _normDeadline(d: any): string | null;
    /** 有効期限切れか（deadline 未設定なら false）。now を渡すとテストで固定できる */
    isExpired(now?: number): boolean;
    /** 有効期限を設定/解除する（ISO文字列 / epoch ms / Date / null） */
    setDeadline(d: any): this;
    /** 署名者順序とモード（'serial'|'parallel'）を設定する */
    setOrder(order: any, mode: any): this;
    /** その署名者が今フィールドを充足できるか（順序・期限・辞退を加味） */
    canAct(signer?: string | null): boolean;
    /** ワークフローの集約ステータス（順序・手番・期限・差し戻し） */
    workflow(now?: number): {
        mode: any;
        order: any;
        expired: any;
        deadline: any;
        declined: any;
        state: any;
        active: any;
        signers: [{
            id: any;
            index: any;
            total: any;
            filled: any;
            remaining: any;
            done: any;
            active: any;
            blocked: any;
        }];
    };
    _renderToolbar(): void;
    /** ワークフロー状態バッジ（順序待ち・辞退中・期限切れ） */
    _wfStatusEl(): HTMLDivElement;
    _propsPanel(): HTMLDivElement;
    _arm(type: any): void;
    _select(id: any): void;
    /** フィールドを追加する（%座標）。@returns 追加されたフィールドのコピー */
    addField(def: any): {
        id: any;
        type: any;
        page: any;
        x: any;
        y: any;
        w: any;
        h: any;
        signer: any;
        required: any;
        label: any;
        value: any;
    };
    /** フィールドを削除する */
    removeField(id: any): this;
    /** フィールドの属性を更新する（部分更新・%座標） */
    updateField(id: any, patch: any): this;
    getFields(): any[];
    /** ズーム倍率を設定（0.4〜3.0） */
    setZoom(z: any): this;
    zoomBy(delta: any): this;
    /** モードを切り替える。'edit' | 'sign' | 'view' */
    setMode(mode: any, opts?: {}): this;
    /** 充足状況（現在署名者スコープ） */
    progress(signer: any): {
        total: any;
        filled: any;
        remaining: any;
        nextUnfilled: any;
    };
    /** 監査JSON（SHA-256チェーン） */
    getAudit(): {
        version: number;
        genesis: string;
        entries: any[];
    };
    /** 進行中の監査 append がすべて確定するまで待つ */
    flush(): Promise<void>;
    _audit(what: any, payload: any): Promise<object>;
    /** フィールド定義・充足状態・監査を文書JSONへ（version 付き） */
    toJSON(): {
        version: number;
        state: any;
        signers: any;
        currentSigner: string | null;
        orderMode: string;
        order: string[];
        deadline: string | null;
        declined: {
            who: string | null;
            reason: string;
            at: any;
        } | null;
        returns: {
            comment: string;
            at: any;
            by: string | null;
        }[];
        pageCount: number;
        pages: any[] | undefined;
        fields: any;
        audit: any;
    };
    /** 文書JSON（充足途中も可）から復元する。ページは構築時のものを使う */
    load(json: any): this;
    on(name: any, fn: any): this;
    off(name: any, fn: any): this;
    _emit(name: any, payload: any): void;
    destroy(): void;
}
import { AuditChain } from './audit.js';
