/**
 * rs-upload フォルダ取り込み — DataTransferItemList.webkitGetAsEntry() を再帰走査して
 * ドロップされたフォルダ内の全 File を「相対パス付き」で集める。
 *
 * 各 File には .relativePath（'photos/2024/a.jpg' 形式・ドロップ起点からの相対）を付与する。
 * webkitGetAsEntry 非対応・エントリが取れない（合成 DataTransfer 等）場合は dataTransfer.files に素直にフォールバックする。
 *
 * DOM 非依存の純ロジック（FileSystemEntry のコールバック API だけ使う）。Node からもモックで単体テストできる。
 */
/** dataTransfer がフォルダ走査 API（webkitGetAsEntry）を持つか */
export function supportsFolderDrop(dataTransfer: any): boolean;
/**
 * DataTransfer から（フォルダ含む）全ファイルを相対パス付きで抽出する。
 * ※ FileSystemEntry の取得はドロップイベント中に同期的に行う必要があるため、
 *   この関数は最初の await より前に entry を全て取得する（呼び出しは drop ハンドラから同期的に）。
 * @param {DataTransfer} dataTransfer
 * @returns {Promise<File[]>} relativePath 付きのファイル配列（フォルダなし・非対応時は files そのまま）
 */
export function filesFromDataTransfer(dataTransfer: DataTransfer): Promise<File[]>;
