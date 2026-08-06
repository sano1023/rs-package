/*! rs-report v0.5.0 | (c) ryusuke.sano | 利用無償・改変/再配布禁止 (Free to use, no modification/redistribution) — see LICENSE.txt */
import{c as b}from"./chunk-DZJWSNA4.js";import{d as u}from"./chunk-HAJCDB3L.js";var D=new TextEncoder,C=new Uint8Array([37,226,227,207,211,10]),j=e=>Math.round(e*100)/100;function E(e){let s=String(e).split(",")[1]||"",r=atob(s),o=new Uint8Array(r.length);for(let n=0;n<r.length;n+=1)o[n]=r.charCodeAt(n);return o}function U(e,s={}){if(!e||!e.length)throw new RangeError("rs-report: PDF \u306B\u3059\u308B\u30DA\u30FC\u30B8\u304C\u3042\u308A\u307E\u305B\u3093");let r=[],o=0,n=t=>{let c=typeof t=="string"?D.encode(t):t;r.push(c),o+=c.length},a=!!s.title,i=2+e.length*3+(a?1:0),l=new Array(i+1).fill(0),h=(t,c)=>{l[t]=o,n(`${t} 0 obj
${c}
endobj
`)};n(`%PDF-1.4
`),n(C);let y=e.map((t,c)=>3+c*3);h(1,"<< /Type /Catalog /Pages 2 0 R >>"),h(2,`<< /Type /Pages /Count ${e.length} /Kids [${y.map(t=>`${t} 0 R`).join(" ")}] >>`),e.forEach((t,c)=>{let d=3+c*3,f=d+1,p=d+2,x=j(t.width),w=j(t.height);h(d,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${x} ${w}] /Resources << /XObject << /Im${c} ${f} 0 R >> >> /Contents ${p} 0 R >>`),l[f]=o,n(`${f} 0 obj
<< /Type /XObject /Subtype /Image /Width ${t.pxW} /Height ${t.pxH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${t.jpeg.length} >>
stream
`),n(t.jpeg),n(`
endstream
endobj
`);let R=`q ${x} 0 0 ${w} 0 0 cm /Im${c} Do Q`;h(p,`<< /Length ${R.length} >>
stream
${R}
endstream`)});let g=0;if(a){g=i;let t=String(s.title).replace(/[^\x20-\x7e]/g,"").replace(/[()\\]/g,"\\$&");h(g,`<< /Title (${t}) /Producer (rs-report) >>`)}let P=o;n(`xref
0 ${i+1}
`),n(`0000000000 65535 f 
`);for(let t=1;t<=i;t+=1)n(`${String(l[t]).padStart(10,"0")} 00000 n 
`);n(`trailer
<< /Size ${i+1} /Root 1 0 R${a?` /Info ${g} 0 R`:""} >>
startxref
${P}
%%EOF
`);let T=r.reduce((t,c)=>t+c.length,0),m=new Uint8Array(T),$=0;for(let t of r)m.set(t,$),$+=t.length;return m}async function L(e,s={}){if(!e||!e.length)throw new RangeError("rs-report: PDF \u306B\u3059\u308B\u30DA\u30FC\u30B8\u304C\u3042\u308A\u307E\u305B\u3093");let r=s.dpi||200,o=s.quality??.92,n=[];for(let a=0;a<e.length;a+=1){let i=e[a],l=await b(i,{dpi:r});n.push({jpeg:E(l.toDataURL("image/jpeg",o)),width:u(i.width),height:u(i.height),pxW:l.width,pxH:l.height}),l.width=0,s.onProgress?.(a+1,e.length)}return U(n,{title:s.title})}function S(e,s){let r=globalThis.document;if(!r)throw new Error("rs-report: downloadBlob \u306F\u30D6\u30E9\u30A6\u30B6\u74B0\u5883\u3067\u306E\u307F\u4F7F\u3048\u307E\u3059");let o=r.createElement("a");o.href=URL.createObjectURL(e),o.download=s,o.click(),setTimeout(()=>URL.revokeObjectURL(o.href),1e3)}export{E as a,U as b,L as c,S as d};
