/**
 * rs-pdf 注釈タイプ（プラグイン）
 *
 * すべて defineAnnotationType() で実装（組み込みも利用者定義も同格）。
 * draw(ctx) は SVG（viewBox=PDFポイント・非回転ページ座標）に描く純粋関数:
 *   ctx = { g: 親<g>, a: 注釈, w/h: ページ寸法(pt), el(tag, attrs): SVG要素生成 }
 * 座標はモデルでは 0〜1 正規化、draw 時に pt へ展開済みのヘルパを使う。
 */
/** 注釈タイプ定義（name / draw / mode / defaults / resizable） */
export function defineAnnotationType(def: any): any;
export const highlight: any;
export const underline: any;
export const strikeout: any;
export const ink: any;
export const rectAnnot: any;
export const ellipseAnnot: any;
export const lineAnnot: any;
export const arrowAnnot: any;
export const freetext: any;
export const note: any;
export const stamp: any;
/** 日付印（承認/日付/氏名の3段・依存ゼロ描画。rs-sign連携なしでも押せる円形印） */
export const datestamp: any;
/**
 * リダクション（黒塗り）。編集中は「これから消える範囲」が分かるよう半透明の黒＋赤破線枠で表示する。
 * 実際の消去は flatten / applyRedactions 時に canvas へ不透明で塗りつぶして行う
 * （ページを画像化するため、下地のテキストごと復元不能に消える）。
 */
export const redact: any;
/** 組み込み注釈タイプ一式 */
export const builtinAnnotationTypes: any[];
