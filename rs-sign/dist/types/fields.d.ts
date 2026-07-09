/** 一意なフィールドID */
export function nextFieldId(): string;
/** 値の種類（image / text / bool） */
export function fieldKind(type: any): any;
/**
 * フィールドを正規化する（%座標を 0..100 にクランプ・既定値補完・ID採番）。
 * @returns {{id,type,page,x,y,w,h,signer,required,label,value}}
 */
export function normalizeField(f?: {}): {
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
/** フィールドが充足済みか（image/text は値あり・checkbox は true） */
export function isFilled(f: any): boolean;
/** フィールドが署名者に属するか（signer=null は誰でも可） */
export function matchesSigner(f: any, signer: any): boolean;
/**
 * 充足状況を集計する。signer 指定時はその署名者に属する必須フィールドのみ。
 * @returns {{total, filled, remaining, nextUnfilled}} nextUnfilled=未充足の先頭フィールド or null
 */
export function fieldProgress(fields: any, signer: any): {
    total: any;
    filled: any;
    remaining: any;
    nextUnfilled: any;
};
/** 全必須フィールドが充足したか（署名者を問わない＝完成判定） */
export function isComplete(fields: any): any;
/**
 * 内部モデル → 文書JSON（version 付き・%座標・充足状態・監査を含む）。
 * @param {{state,signers,currentSigner,pageCount,pages,fields,audit}} model
 */
export function serializeDoc(model?: {
    state: any;
    signers: any;
    currentSigner: any;
    pageCount: any;
    pages: any;
    fields: any;
    audit: any;
}): {
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
/** 文書JSON（文字列 or オブジェクト）→ 内部モデル */
export function deserializeDoc(json: any): {
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
    pages: any;
    fields: any;
    audit: any;
};
/**
 * rs-sign フィールド／文書モデル（純粋関数・DOM非依存）
 *
 * ページ上のフィールドは %座標（x, y, w, h すべてページ寸法比 0..100）で保持する。
 * ズーム・リサイズに不変で、canvas 合成時にピクセルへ写像する。
 * 文書JSON（フィールド定義＋充足状態＋署名者＋監査）を version 付きで
 * toJSON/fromJSON ラウンドトリップできる（充足途中の状態も含む）。
 */
export const FIELD_JSON_VERSION: 1;
export namespace FIELD_TYPES {
    namespace signature {
        let label: string;
        let kind: string;
        let defaultW: number;
        let defaultH: number;
    }
    namespace seal {
        let label_1: string;
        export { label_1 as label };
        let kind_1: string;
        export { kind_1 as kind };
        let defaultW_1: number;
        export { defaultW_1 as defaultW };
        let defaultH_1: number;
        export { defaultH_1 as defaultH };
    }
    namespace date {
        let label_2: string;
        export { label_2 as label };
        let kind_2: string;
        export { kind_2 as kind };
        let defaultW_2: number;
        export { defaultW_2 as defaultW };
        let defaultH_2: number;
        export { defaultH_2 as defaultH };
    }
    namespace text {
        let label_3: string;
        export { label_3 as label };
        let kind_3: string;
        export { kind_3 as kind };
        let defaultW_3: number;
        export { defaultW_3 as defaultW };
        let defaultH_3: number;
        export { defaultH_3 as defaultH };
    }
    namespace checkbox {
        let label_4: string;
        export { label_4 as label };
        let kind_4: string;
        export { kind_4 as kind };
        let defaultW_4: number;
        export { defaultW_4 as defaultW };
        let defaultH_4: number;
        export { defaultH_4 as defaultH };
    }
}
