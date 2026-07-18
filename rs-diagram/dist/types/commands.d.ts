/**
 * rs-diagram コマンドスタック（undo/redo 基盤）
 *
 * すべての編集操作は「modelへのコマンド適用」で表現する。
 * コマンドは apply(model) / revert(model) を持つ純粋なオブジェクトで、
 * DOMには一切触れない（viewはmodelから再描画される）。
 */
/**
 * 深いコピー（model はプレーンなJSONデータのみを想定）。
 * structuredClone は1呼び出しのオーバーヘッドが大きく、数万ノードの一括ロードで
 * 秒単位になるため、手書きの再帰クローンにしている（小さなオブジェクト多数に強い）。
 */
export function deepClone(v: any): any;
export class CommandStack {
    constructor(limit?: number);
    limit: number;
    undoStack: any[];
    redoStack: any[];
    /** 適用済みコマンドを積む（redo履歴はクリア） */
    push(cmd: any): void;
    undo(model: any): any;
    redo(model: any): any;
    get canUndo(): boolean;
    get canRedo(): boolean;
    clear(): void;
}
export namespace commands {
    /** ノード追加 */
    function addNode(node: any): {
        type: string;
        node: any;
        apply(m: any): void;
        revert(m: any): void;
    };
    /** リンク追加 */
    function addLink(link: any): {
        type: string;
        link: any;
        apply(m: any): void;
        revert(m: any): void;
    };
    /**
     * ノード/リンクの一括削除。
     * entries: [{ item, index }]。undo時は元のz順（index）へ復元する。
     */
    function remove(nodeEntries: any, linkEntries: any): {
        type: string;
        nodes: any;
        links: any;
        apply(m: any): void;
        revert(m: any): void;
    };
    /**
     * プロパティ更新（移動・リサイズ・ラベル変更等すべて）。
     * entries: [{ list: 'nodes'|'links', id, before, after }]
     */
    function update(entries: any, type?: string): {
        type: string;
        entries: any;
        apply(m: any): void;
        revert(m: any): void;
    };
    /** z順の並べ替え（最前面へ/最背面へ） */
    function reorder(list: any, beforeIds: any, afterIds: any): {
        type: string;
        list: any;
        beforeIds: any;
        afterIds: any;
        apply(m: any): void;
        revert(m: any): void;
    };
    /** 任意リスト（lanes 等）への1件追加 */
    function addItem(list: any, item: any, type?: string): {
        type: string;
        list: any;
        item: any;
        apply(m: any): void;
        revert(m: any): void;
    };
    /** 任意リストからの1件削除（{item,index}） */
    function removeItem(list: any, entry: any, type?: string): {
        type: string;
        list: any;
        entry: any;
        apply(m: any): void;
        revert(m: any): void;
    };
    /** 複合コマンド（複製など） */
    function batch(cmds: any, type?: string): {
        type: string;
        commands: any;
        apply(m: any): void;
        revert(m: any): void;
    };
}
