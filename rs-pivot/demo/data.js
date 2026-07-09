/**
 * rs-pivot デモ用サンプル売上データ生成器（固定シード・node/ブラウザ両用）
 *
 * 地域/店舗/区分/カテゴリ/商品/日付/売上/数量/原価 の日本語業務データを
 * 決定的に生成する（同じシード・件数なら常に同じデータ）。
 */

/** mulberry32 疑似乱数（固定シードで再現可能） */
export function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0;
        a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const REGIONS = [
    { name: '北海道', weight: 1, stores: ['札幌店', '函館店'] },
    { name: '東北', weight: 1, stores: ['仙台店', '盛岡店'] },
    { name: '関東', weight: 4, stores: ['東京本店', '横浜店', '大宮店', '千葉店'] },
    { name: '中部', weight: 2, stores: ['名古屋店', '静岡店', '金沢店'] },
    { name: '近畿', weight: 3, stores: ['大阪店', '京都店', '神戸店'] },
    { name: '中国四国', weight: 1, stores: ['広島店', '高松店'] },
    { name: '九州', weight: 2, stores: ['福岡店', '熊本店', '鹿児島店'] },
];

const CATEGORIES = [
    { name: '食品', products: [['特選米 5kg', 2400], ['食パン', 320], ['冷凍餃子', 480], ['チョコレート菓子', 260]] },
    { name: '飲料', products: [['緑茶 500ml', 140], ['ドリップコーヒー', 980], ['オレンジジュース', 220]] },
    { name: '日用品', products: [['液体洗剤', 380], ['ボックスティッシュ', 450], ['シャンプー', 720]] },
    { name: '家電', products: [['炊飯器 5.5合', 32000], ['コードレス掃除機', 45000], ['ヘアドライヤー', 12800]] },
    { name: '衣料', products: [['オックスフォードシャツ', 4900], ['ライトジャケット', 12000], ['スニーカー', 8900]] },
];

const CHANNELS = ['店頭', 'EC', '法人'];

/** 重み付き選択 */
function pick(rand, items, weightOf) {
    const total = items.reduce((s, it) => s + weightOf(it), 0);
    let r = rand() * total;
    for (const it of items) {
        r -= weightOf(it);
        if (r <= 0) return it;
    }
    return items[items.length - 1];
}

const pad2 = (n) => String(n).padStart(2, '0');

/**
 * サンプル売上データを生成する。
 * @param {number} count 件数（既定 10000）
 * @param {number} seed シード（既定 20260401）
 * @returns {object[]} { 地域, 店舗, 区分, カテゴリ, 商品, 日付, 数量, 売上, 原価 }
 */
export function generateData(count = 10000, seed = 20260401) {
    const rand = mulberry32(seed);
    // 期間: 2024-04-01 〜 2026-06-30（会計年度 2024/2025/2026Q1）
    const start = Date.UTC(2024, 3, 1);
    const end = Date.UTC(2026, 5, 30);
    const dayMs = 86400000;
    const days = Math.floor((end - start) / dayMs);
    const records = [];
    for (let i = 0; i < count; i++) {
        const region = pick(rand, REGIONS, (r) => r.weight);
        const store = region.stores[Math.floor(rand() * region.stores.length)];
        const channel = CHANNELS[Math.floor(rand() * CHANNELS.length)];
        const category = CATEGORIES[Math.floor(rand() * CATEGORIES.length)];
        const [product, basePrice] = category.products[Math.floor(rand() * category.products.length)];
        const t = new Date(start + Math.floor(rand() * (days + 1)) * dayMs);
        const date = `${t.getUTCFullYear()}-${pad2(t.getUTCMonth() + 1)}-${pad2(t.getUTCDate())}`;
        const qty = 1 + Math.floor(rand() * 50);
        const unit = Math.round(basePrice * (0.8 + rand() * 0.4));
        const sales = unit * qty;
        const cost = Math.round(sales * (0.55 + rand() * 0.2));
        records.push({
            地域: region.name,
            店舗: store,
            区分: channel,
            カテゴリ: category.name,
            商品: product,
            日付: date,
            数量: qty,
            売上: sales,
            原価: cost,
        });
    }
    return records;
}
