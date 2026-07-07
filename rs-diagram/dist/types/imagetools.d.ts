/** File → dataURL（大きい画像は縮小してJSONの肥大化を防ぐ） */
export function fileToDataURL(file: any, maxDim?: number): Promise<any>;
/**
 * ファイル選択を開き、選ばれた画像を指定ノードへ設定する（undo可）。
 * ノードサイズは画像の縦横比に合わせて調整する（幅は現在値を維持）。
 */
export function pickImageForNode(diagram: any, nodeId: any): Promise<any>;
