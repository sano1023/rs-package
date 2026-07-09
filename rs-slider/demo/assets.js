// デモ用アセット生成（外部リソース不要）
// photo(seed, {w,h,label}) — SVGベースの風景風プレースホルダ画像 (data URI)
// makeVideo({seconds,seed,label,w,h}) — canvas + MediaRecorder でデモ動画(WebM)を生成

function rng(seed) {
    let t = (seed * 1000003) >>> 0;
    return function () {
        t += 0x6D2B79F5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

function escapeXml(s) {
    return String(s).replace(/[<>&'"]/g, (c) => ({
        '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
    }[c]));
}

function svgScene(seed, w, h, label) {
    const rnd = rng(seed);
    const hue = Math.floor(rnd() * 360);
    const hue2 = (hue + 35 + Math.floor(rnd() * 50)) % 360;
    const sunX = Math.round((0.15 + rnd() * 0.7) * w);
    const sunY = Math.round((0.14 + rnd() * 0.25) * h);
    const sunR = Math.round(h * (0.06 + rnd() * 0.07));

    const layers = [];
    for (let l = 0; l < 3; l++) {
        const yBase = h * (0.52 + l * 0.15);
        const amp = h * (0.18 - l * 0.035);
        const steps = 6 + Math.floor(rnd() * 4);
        let pts = `0,${h} `;
        for (let i = 0; i <= steps; i++) {
            pts += `${Math.round((w / steps) * i)},${Math.round(yBase - rnd() * amp)} `;
        }
        pts += `${w},${h}`;
        const light = 34 - l * 8;
        layers.push(`<polygon points='${pts}' fill='hsl(${(hue + 150 + l * 14) % 360} 34% ${light}%)' opacity='${(0.72 + l * 0.14).toFixed(2)}'/>`);
    }

    let bokeh = '';
    for (let i = 0; i < 6; i++) {
        bokeh += `<circle cx='${Math.round(rnd() * w)}' cy='${Math.round(rnd() * h * 0.45)}' r='${Math.round(h * (0.012 + rnd() * 0.03))}' fill='rgba(255,255,255,${(0.12 + rnd() * 0.22).toFixed(2)})'/>`;
    }

    const fs = Math.max(20, Math.round(h * 0.055));
    const text = label
        ? `<text x='${Math.round(w * 0.045)}' y='${Math.round(h * 0.93)}' font-family='system-ui,sans-serif' font-size='${fs}' font-weight='700' fill='rgba(255,255,255,.92)'>${escapeXml(label)}</text>`
        : '';

    return `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>`
        + `<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>`
        + `<stop offset='0' stop-color='hsl(${hue} 60% 46%)'/>`
        + `<stop offset='1' stop-color='hsl(${hue2} 68% 72%)'/>`
        + `</linearGradient></defs>`
        + `<rect width='${w}' height='${h}' fill='url(#g)'/>`
        + `<circle cx='${sunX}' cy='${sunY}' r='${sunR}' fill='hsl(${(hue2 + 20) % 360} 92% 84%)'/>`
        + bokeh + layers.join('') + text
        + `</svg>`;
}

export function photo(seed = 1, { w = 1200, h = 800, label = '' } = {}) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgScene(seed, w, h, label));
}

// makeVideo の結果を sessionStorage にキャッシュする（録画は実時間かかるため再訪問を高速化）。
export async function makeVideoCached(key, opts) {
    const storageKey = `rs-slider-demo-video:${key}`;
    try {
        const hit = sessionStorage.getItem(storageKey);
        if (hit) return hit;
    } catch { /* ストレージ不可なら毎回生成 */ }
    const url = await makeVideo(opts);
    if (!url) return null;
    try {
        const blob = await (await fetch(url)).blob();
        const dataURI = await new Promise((res, rej) => {
            const fr = new FileReader();
            fr.onload = () => res(fr.result);
            fr.onerror = rej;
            fr.readAsDataURL(blob);
        });
        sessionStorage.setItem(storageKey, dataURI);
        return dataURI;
    } catch {
        return url; // 容量超過等はキャッシュせずそのまま使う
    }
}

// デモ動画を実行時に生成する。MediaRecorder非対応環境では null を返す。
export async function makeVideo({ seconds = 4, seed = 1, label = 'DEMO MOVIE', w = 640, h = 360 } = {}) {
    try {
        if (typeof MediaRecorder === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        const stream = canvas.captureStream(30);
        const mime = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4']
            .find((m) => MediaRecorder.isTypeSupported(m));
        if (!mime) return null;

        const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 1200000 });
        const chunks = [];
        rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
        const stopped = new Promise((res) => { rec.onstop = res; });
        rec.start(200);

        const hue = (seed * 47) % 360;
        const t0 = performance.now();
        await new Promise((res) => {
            (function draw() {
                const t = (performance.now() - t0) / 1000;
                const g = ctx.createLinearGradient(0, 0, w, h);
                g.addColorStop(0, `hsl(${(hue + t * 24) % 360} 62% 40%)`);
                g.addColorStop(1, `hsl(${(hue + 90 + t * 24) % 360} 62% 58%)`);
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
                // 周回する円
                for (let i = 0; i < 3; i++) {
                    const a = t * (0.9 + i * 0.35) + i * 2.1;
                    ctx.beginPath();
                    ctx.arc(w / 2 + Math.cos(a) * w * 0.3, h / 2 + Math.sin(a) * h * 0.28,
                        h * (0.06 + i * 0.03), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255,255,255,${0.32 - i * 0.08})`;
                    ctx.fill();
                }
                ctx.fillStyle = 'rgba(255,255,255,.95)';
                ctx.font = `700 ${Math.round(h * 0.09)}px system-ui, sans-serif`;
                ctx.textAlign = 'center';
                ctx.fillText(label, w / 2, h / 2);
                ctx.font = `600 ${Math.round(h * 0.055)}px system-ui, sans-serif`;
                ctx.fillText(`${Math.min(seconds, t).toFixed(1)} / ${seconds.toFixed(1)} 秒`, w / 2, h * 0.62);
                if (t < seconds) requestAnimationFrame(draw);
                else res();
            })();
        });
        rec.stop();
        await stopped;
        return URL.createObjectURL(new Blob(chunks, { type: mime.split(';')[0] }));
    } catch (e) {
        console.warn('デモ動画の生成に失敗しました:', e);
        return null;
    }
}
