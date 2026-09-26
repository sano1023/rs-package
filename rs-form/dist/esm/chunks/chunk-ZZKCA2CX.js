/*! rs-form v0.5.0 | (c) ryusuke.sano | 利用無償・改変/再配布禁止 (Free to use, no modification/redistribution) — see LICENSE.txt */
function u(e,r){return`${String(e).replace(/\/+$/,"")}/${String(r).replace(/^\/+/,"")}`}function i(e,r){return JSON.stringify(e,null,r?2:0).replace(/</g,"\\u003c")}function v(e){let r={};return e.mode&&e.mode!=="standard"&&(r.mode=e.mode),e.locale!=null&&(r.locale=e.locale),e.fallbackLocale!=null&&(r.fallbackLocale=e.fallbackLocale),e.variant!=null&&(r.variant=e.variant),e.variantSeed!=null&&(r.variantSeed=e.variantSeed),e.autosave&&(r.autosave=!0),e.storageKey!=null&&(r.storageKey=e.storageKey),e.formOptions&&typeof e.formOptions=="object"&&Object.assign(r,e.formOptions),r}function S(e,r={}){let n=r.mountId||"rs-form",a=r.baseUrl||"https://cdn.example.com/rs-form/src",o=r.mode==="conversational"?"conversational.js":"index.js",l=u(a,o),t=r.cssHref!==void 0?r.cssHref:u(a,"rs-form.css"),s=i(e||{},r.pretty!==!1),f=i(v(r),!1),m=`import { createRSForm } from '${l}';
const schema = ${s};
createRSForm('#${n}', schema, ${f});
`,c=t?`<link rel="stylesheet" href="${t}">`:"",d=`${c?c+`
`:""}<div id="${n}"></div>
<script type="module">
${m}<\/script>
`;return{mountId:n,baseUrl:a,importUrl:l,cssHref:t,schemaJson:s,optionsJson:f,css:c,js:m,html:d}}function $(e,r={}){return S(e,r).html}export{S as a,$ as b};
