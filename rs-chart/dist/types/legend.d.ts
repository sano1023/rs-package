/** 凡例レイアウトを計算して高さを返す（描画はしない） */
export function measureLegend(renderer: any, items: any, width: any, theme: any): {
    height: number;
    rows: any[][];
};
/** 凡例を描画する。onToggle(index) クリックコールバック */
export function drawLegend(renderer: any, parent: any, layout: any, top: any, width: any, theme: any, onToggle: any): any;
