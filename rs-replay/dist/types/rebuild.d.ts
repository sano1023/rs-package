/**
 * シリアライズ済みノード1件からDOMノードを組み立てる（idMapへ登録する）。
 * @param {object} sn シリアライズ済みノード
 * @param {Document} doc 組み立て先ドキュメント（iframe.contentDocument）
 * @param {Map<number, Node>} map rsid → 実ノード
 */
export function buildNode(sn: object, doc: Document, map: Map<number, Node>): any;
/**
 * 同一オリジン iframe の中身（sn.doc）を、接続後の contentDocument に書き込む（v0.2）。
 * iframe は DOM へ接続されて初めて contentDocument を持つため、ツリー組み立て後に呼ぶ。
 * 内部ノードも同じ map（rsid → 実ノード）へ登録し、差分適用が届くようにする。
 */
export function fillFrames(sn: any, map: any): void;
/**
 * スナップショットから iframe 内へ document 全体を復元する。
 * @returns {Map<number, Node>} rsid → 実ノード
 */
export function buildDocument(iframe: any, session: any): Map<number, Node>;
/**
 * mutationイベントのオペレーション列を適用する。
 * 対象が見つからないopは黙ってスキップ（順序ずれで再生全体を壊さない）。
 */
export function applyOps(ops: any, idoc: any, map: any): void;
