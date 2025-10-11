
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-AOBEO7BM.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YVSYDC7T.js",
      "chunk-XJATNCQ6.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JPNFHDVY.js",
      "chunk-FBVJWOBZ.js",
      "chunk-XJATNCQ6.js"
    ],
    "route": "/profile"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-YLEVJOS5.js",
      "chunk-XJATNCQ6.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PMO2PPJA.js",
      "chunk-XJATNCQ6.js"
    ],
    "route": "/about-us"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-EJIPKZ2P.js",
      "chunk-FBVJWOBZ.js",
      "chunk-XJATNCQ6.js"
    ],
    "route": "/courses"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BNHRMDD6.js"
    ],
    "route": "/courses/1"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BNHRMDD6.js"
    ],
    "route": "/courses/2"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BNHRMDD6.js"
    ],
    "route": "/courses/3"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BNHRMDD6.js"
    ],
    "route": "/courses/4"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BNHRMDD6.js"
    ],
    "route": "/courses/5"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BNHRMDD6.js"
    ],
    "route": "/courses/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-T7X6MHZA.js"
    ],
    "route": "/edit-courses"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-MXPBUUCY.js"
    ],
    "route": "/search"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6013, hash: '0259f391f28a9fe7edf92f11502aa48224db9a96b4ff36636c82476d7563a893', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1931, hash: '4de27cdba4111ffac38dd69975a83eddbc2537fc4853d3180e990d4bb78f0f69', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 32910, hash: '30f2ed1d855cf7f54eb27072126c551f23cd51c36b739663b08855a2f3017b41', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'search/index.html': {size: 30352, hash: 'f3e1bd4af0aacf893fd3db698f8d35be8bb83aafc1c874014cc5c677189d5b59', text: () => import('./assets-chunks/search_index_html.mjs').then(m => m.default)},
    'index.html': {size: 36120, hash: '325f01c6be075dc47205f1f748ce3d477b31ee18f59290b0c758c541dea43910', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 37536, hash: '992bcc9a50f95bd67a15370aa4440d5952b64a421a53b56145e9e33fd7bae72d', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 32962, hash: '5772cbb69ddb09a6dbf77be31c937065873e64a014a1644625ac10273be29ace', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'edit-courses/index.html': {size: 32858, hash: '0e0d6f015048ad8a48cd042b58a5ad0d36da64d1254794ab0e1970189af15d07', text: () => import('./assets-chunks/edit-courses_index_html.mjs').then(m => m.default)},
    'about-us/index.html': {size: 32186, hash: 'f870ba399b5ae66bb36887137962ff054bffd52f715290d644913ab21911b29e', text: () => import('./assets-chunks/about-us_index_html.mjs').then(m => m.default)},
    'styles-A2BG7GOI.css': {size: 231058, hash: 'ob/f01HsJnQ', text: () => import('./assets-chunks/styles-A2BG7GOI_css.mjs').then(m => m.default)}
  },
};
