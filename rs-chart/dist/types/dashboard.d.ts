/**
 * rs-chart ダッシュボード
 *
 * グリッドレイアウトに複数チャート/KPIカードを並べ、チャート間のズーム・ホバーを連動させる。
 *
 * createRSDashboard('#el', {
 *     columns: 12, gap: 12,
 *     sync: { zoom: true, hover: true },
 *     items: [
 *         { w: 12, h: 90, kpi: [{ label: '売上', value: '1.2億円', delta: '+8.2%' }, ...] },
 *         { w: 6, h: 260, options: { type: 'line', series: [...] } },
 *         { w: 6, h: 260, options: { ... } },
 *     ],
 * });
 */
export class Dashboard {
    constructor(target: any, options: any, chartFactory: any);
    target: any;
    charts: any[];
    _cells: any[];
    root: any;
    /** KPIカード列: [{ label, value, delta?, color? }] */
    renderKPI(cell: any, kpis: any): void;
    destroy(): void;
}
