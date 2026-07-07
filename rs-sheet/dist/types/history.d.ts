/**
 * rs-sheet undo/redo 履歴（純粋モジュール）
 *
 * - セル変更: エンジンの変更リスト（old/next）をそのままコマンドログとして積む
 * - 構造変更（行列の挿入・削除）: モデル全体の JSON スナップショットで積む
 */
export class History {
    constructor(limit?: number);
    limit: number;
    stack: any[];
    index: number;
    push(entry: any): void;
    canUndo(): boolean;
    canRedo(): boolean;
    undo(): any;
    redo(): any;
    clear(): void;
}
