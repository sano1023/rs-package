/**
 * 編集フローの判定（純粋関数・DOM非依存 = node 単体テスト可能）。
 * createRSImageEditor が関数なら rs-image エディタ、無ければファイル選択にフォールバック。
 * @returns {'rs-image'|'file'}
 */
export function resolveImageEditFlow(createRSImageEditor: any): "rs-image" | "file";
/**
 * options.imagePicker 用の関数を作る（opt-in・注入）。
 * createRSImageEditor があれば rs-image エディタ、無ければファイル選択にフォールバックする。
 * @param {object} config
 *   - createRSImageEditor: rs-image の生成関数（省略/未ロード時はファイル選択）
 *   - editorOptions: エディタへ渡す追加オプション（stamps/fonts/height 等）
 *   - title: モーダル見出し
 * @returns {(diagram, node) => Promise}
 */
export function makeRSImagePicker(config?: object): (diagram: any, node: any) => Promise<any>;
