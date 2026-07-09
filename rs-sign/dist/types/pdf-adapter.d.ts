/**
 * 署名/印影の「画像＋%座標＋ページ」→ rs-pdf スタンプ注釈データ（純粋）。
 *
 * @param {object} input
 *   - image: PNG dataURL 文字列（必須。SignPad.toPNG() / Hanko.toPNG() の出力）
 *   - page:  ページ番号（既定は rs-sign 準拠の 0 始まり。opts.pageBase で切替）
 *   - x,y,w,h: %座標（0..100・ページ寸法比）
 *   - opacity?: 0..1（既定 1）
 *   - id?: 指定すると注釈IDとして引き継ぐ
 *   - name?: 追跡用ラベル（rs-pdf は保持のみ・描画に影響しない）
 * @param {object} opts { pageBase=0（入力ページの基点）, type='stamp' }
 * @returns {{type,page,rect:{x,y,w,h},image,style:{opacity}}}
 */
export function signatureAnnotation(input?: object, opts?: object): {
    type: any;
    page: any;
    rect: {
        x: any;
        y: any;
        w: any;
        h: any;
    };
    image: any;
    style: {
        opacity: any;
    };
};
/**
 * rs-sign フィールド（signature / seal で充足済みのもの）→ スタンプ注釈データ。
 * 画像フィールドでない・未充足のフィールドは null を返す（呼び出し側でフィルタ）。
 *
 * @param {object} field rs-sign の正規化フィールド（{type,page,x,y,w,h,value,signer,...}）
 * @param {object} opts { pageBase, opacity, keepId }
 * @returns {object|null}
 */
export function fieldToAnnotation(field: object, opts?: object): object | null;
/**
 * フィールド配列（または Sign インスタンス）→ 充足済み画像フィールドのスタンプ注釈配列。
 * @param {Array|{getFields:Function}} fields フィールド配列 or createRSSign の戻り値
 * @param {object} opts fieldToAnnotation と同じ
 * @returns {Array<object>}
 */
export function fieldsToAnnotations(fields: any[] | {
    getFields: Function;
}, opts?: object): Array<object>;
/**
 * Sign インスタンス（createRSSign の戻り値）→ スタンプ注釈配列（fieldsToAnnotations のエイリアス）。
 */
export function signToAnnotations(sign: any, opts?: {}): object[];
/**
 * 生成済みスタンプ注釈データを rs-pdf のページ上へ実配置する。
 * @param {object} pdfViewer createRSPDF の戻り値
 * @param {Array<object>} annotations signatureAnnotation / fieldsToAnnotations の出力
 * @returns {Array<object>} 追加された注釈（rs-pdf が採番したIDつき）
 */
export function placeAnnotations(pdfViewer: object, annotations: Array<object>): Array<object>;
/**
 * rs-pdf 連携アダプタを作る。rs-pdf viewer を1つ束ね、署名/印影の配置に必要な操作を提供する。
 * @param {object} pdfViewer createRSPDF の戻り値
 * @param {object} defaults すべての生成に効く既定 opts（pageBase / opacity / keepId）
 */
export function createPdfSignAdapter(pdfViewer: object, defaults?: object): {
    viewer: object;
    /** 純粋: 画像＋%座標＋ページ → 注釈データ（実配置はしない） */
    toAnnotation(input: any, o: any): {
        type: any;
        page: any;
        rect: {
            x: any;
            y: any;
            w: any;
            h: any;
        };
        image: any;
        style: {
            opacity: any;
        };
    };
    /** 画像＋%座標＋ページを実配置し、追加された注釈を返す */
    placeSignature(input: any, o: any): object;
    /** rs-sign フィールド1件を実配置（画像・充足済みのみ。対象外は null） */
    placeField(field: any, o: any): object | null;
    /** フィールド配列 or Sign を一括実配置（締結済み文書の署名/印影を PDF へ焼き写す） */
    place(fields: any, o: any): object[];
    /** 生成済み注釈データ配列をそのまま実配置 */
    placeAnnotations(annotations: any): object[];
    /**
     * インタラクティブ配置: rs-pdf のスタンプツールに rs-sign の印影PNGをセットし、
     * ユーザーがページをクリックした位置へ押せるようにする（rs-pdf v0.3+ の契約）。
     */
    setStampImage(dataURL: any, o?: {}): boolean;
};
/** rs-pdf 画像スタンプ注釈のタイプ名（rs-pdf 組み込みタイプと一致） */
export const PDF_STAMP_TYPE: "stamp";
