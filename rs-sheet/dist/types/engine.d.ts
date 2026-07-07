export class Engine {
    /** toJSON スキーマから Engine を復元する（値は raw から再計算） */
    static fromJSON(json: any): Engine;
    /** @param {SheetModel} model */
    constructor(model?: SheetModel);
    model: SheetModel;
    graph: DependencyGraph;
    functions: Map<string, {
        fn: any;
        minArgs: any;
        maxArgs: any;
        lazy: any;
        acceptErrors: any;
        raw: any;
    }>;
    /** 数式セル用の評価コンテキストを作る（formulaSheet = 数式があるシート） */
    ctxFor(formulaSheet: any): {
        functions: Map<string, {
            fn: any;
            minArgs: any;
            maxArgs: any;
            lazy: any;
            acceptErrors: any;
            raw: any;
        }>;
        getCell: (sheetName: any, row: any, col: any) => any;
        dims: (sheetName: any) => {
            rows: any;
            cols: any;
        } | null;
    };
    /**
     * raw をパースしてセルへ反映する（再計算はしない）。
     * @returns {boolean} 数式かどうか
     */
    parseInto(sheetIdx: any, row: any, col: any, cell: any, raw: any): boolean;
    /** セルの AST から依存グラフを更新する */
    updateDeps(sheetIdx: any, row: any, col: any, cell: any): void;
    /**
     * 複数セルの変更を適用して差分再計算する。
     * @param {Array<{sheet?, row, col, raw?, format?, style?}>} entries
     *   raw: undefined なら値は変更しない（format/style のみ変更）
     * @returns {{changes: Array, recalced: Set<string>}} changes は履歴/イベント用
     */
    applyCellChanges(entries: Array<{
        sheet?: any;
        row: any;
        col: any;
        raw?: any;
        format?: any;
        style?: any;
    }>): {
        changes: any[];
        recalced: Set<string>;
    };
    /**
     * 変更セル集合から影響セルをトポロジカル順に再評価する。
     * 循環に関与するセルはすべて #CYCLE! にする。
     * @param {Set<string>} seeds 変更されたセル id の集合
     * @returns {Set<string>} 値が再計算されたセル id（seeds 含む）
     */
    recalc(seeds: Set<string>): Set<string>;
    /** 全セルの raw を再パースして全再計算する（fromJSON 復元用） */
    reparseAll(): void;
    /** モデルを JSON から入れ替える（undo/redo の構造スナップショット復元用） */
    restoreModel(json: any): void;
    /** 依存グラフをゼロから構築して全再計算する（初期ロード・構造変更後） */
    rebuildAll(): void;
    /**
     * 構造変更を適用し、全シートの数式 AST を参照シフトして raw を書き換える。
     * @param {'row'|'col'} axis
     * @param {'insert'|'delete'} op
     */
    structuralChange(sheetIdx: any, axis: "row" | "col", op: "insert" | "delete", index: any, count?: number): void;
    /**
     * 数式 raw を (dRow, dCol) だけ相対シフトした raw を返す（絶対参照は固定）。
     * 数式でない値はそのまま返す。
     */
    shiftFormula(raw: any, dRow: any, dCol: any): any;
}
import { SheetModel } from './model.js';
import { DependencyGraph } from './depgraph.js';
import { defineFunction } from './functions.js';
import { registry } from './functions.js';
import { isFormula } from './lexer.js';
import { isError } from './errors.js';
import { RSError } from './errors.js';
import { ERR } from './errors.js';
export { defineFunction, registry, isFormula, isError, RSError, ERR };
