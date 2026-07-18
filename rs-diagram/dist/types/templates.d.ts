export function getTemplate(name: any): any;
/**
 * テンプレを展開する。
 * @returns {{ nodes, links, lanes, nodeTypes, layout, layoutOptions }}
 */
export function expandTemplate(name: any, data: any): {
    nodes: any;
    links: any;
    lanes: any;
    nodeTypes: any;
    layout: any;
    layoutOptions: any;
};
/** 組織図の人物カード（氏名＋役職） */
export const orgPerson: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** ER図のテーブル（見出し＋カラム行） */
export const erTable: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** ネットワーク機器（種別アイコン＋ラベル） */
export const netDevice: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
/** 座席（机＋氏名） */
export const seat: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
export const templateNodeTypes: {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
}[];
export namespace templates {
    namespace orgchart {
        export let label: string;
        export { orgchartBuild as build };
        export let nodeTypes: {
            defaults: any;
            anchors: string[];
            shape: string;
            labelPosition: string;
        }[];
        export let layout: string;
        export namespace layoutOptions {
            let direction: string;
            let gapX: number;
            let gapY: number;
        }
    }
    namespace approval {
        let label_1: string;
        export { label_1 as label };
        export { approvalBuild as build };
        let layout_1: string;
        export { layout_1 as layout };
        export namespace layoutOptions_1 {
            let direction_1: string;
            export { direction_1 as direction };
            let gapX_1: number;
            export { gapX_1 as gapX };
            let gapY_1: number;
            export { gapY_1 as gapY };
        }
        export { layoutOptions_1 as layoutOptions };
    }
    namespace er {
        let label_2: string;
        export { label_2 as label };
        export { erBuild as build };
        let nodeTypes_1: {
            defaults: any;
            anchors: string[];
            shape: string;
            labelPosition: string;
        }[];
        export { nodeTypes_1 as nodeTypes };
        let layout_2: string;
        export { layout_2 as layout };
        export namespace layoutOptions_2 {
            export let cols: number;
            let gapX_2: number;
            export { gapX_2 as gapX };
            let gapY_2: number;
            export { gapY_2 as gapY };
        }
        export { layoutOptions_2 as layoutOptions };
    }
    namespace network {
        let label_3: string;
        export { label_3 as label };
        export { networkBuild as build };
        let nodeTypes_2: {
            defaults: any;
            anchors: string[];
            shape: string;
            labelPosition: string;
        }[];
        export { nodeTypes_2 as nodeTypes };
        let layout_3: string;
        export { layout_3 as layout };
        export namespace layoutOptions_3 {
            let direction_2: string;
            export { direction_2 as direction };
            let gapX_3: number;
            export { gapX_3 as gapX };
            let gapY_3: number;
            export { gapY_3 as gapY };
        }
        export { layoutOptions_3 as layoutOptions };
    }
    namespace seating {
        let label_4: string;
        export { label_4 as label };
        export { seatingBuild as build };
        let nodeTypes_3: {
            defaults: any;
            anchors: string[];
            shape: string;
            labelPosition: string;
        }[];
        export { nodeTypes_3 as nodeTypes };
        let layout_4: null;
        export { layout_4 as layout };
    }
    namespace familytree {
        let label_5: string;
        export { label_5 as label };
        export { buildFamilyTree as build };
        let nodeTypes_4: {
            defaults: any;
            anchors: string[];
            shape: string;
            labelPosition: string;
        }[];
        export { nodeTypes_4 as nodeTypes };
        let layout_5: null;
        export { layout_5 as layout };
    }
}
export const TEMPLATE_NAMES: string[];
declare function orgchartBuild(data: any): {
    nodes: any;
    links: any;
};
declare function approvalBuild(data: any): {
    nodes: any;
    links: any;
};
declare function erBuild(data: any): {
    nodes: any;
    links: any;
};
declare function networkBuild(data: any): {
    nodes: any;
    links: any;
};
declare function seatingBuild(data: any): {
    nodes: any;
    links: never[];
};
import { buildFamilyTree } from './familytree.js';
export {};
