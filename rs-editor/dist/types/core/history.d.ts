/**
 * rs-editor 独自履歴（undo / redo）
 *
 * ブラウザ標準の undo は contenteditable の自前操作と混ざると壊れるため、
 * DOMスナップショット（innerHTML + 選択パス）による独自スタックで管理する。
 *
 * グルーピングはコア側（core.js）が制御する:
 *   - コマンド実行前 / IME変換開始時（compositionstart）/ 入力種別の切り替わり時に push
 *   - 「1変換 = 1履歴」を満たすため、composition 中の入力では push しない
 */
export class History {
    constructor(limit?: number);
    limit: number;
    undoStack: any[];
    redoStack: any[];
    /** 変更前スナップショットを積む。直前と同一内容ならスキップ */
    push(snapshot: any): void;
    undo(current: any): any;
    redo(current: any): any;
    canUndo(): boolean;
    canRedo(): boolean;
    clear(): void;
}
