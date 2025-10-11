import {
  __esm
} from "./chunk-FTL7MPRH.js";

// node_modules/@angular/common/fesm2022/xhr.mjs
function parseCookieValue(cookieStr, name) {
  name = encodeURIComponent(name);
  for (const cookie of cookieStr.split(";")) {
    const eqIndex = cookie.indexOf("=");
    const [cookieName, cookieValue] = eqIndex == -1 ? [cookie, ""] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
var XhrFactory;
var init_xhr = __esm({
  "node_modules/@angular/common/fesm2022/xhr.mjs"() {
    "use strict";
    XhrFactory = class {
    };
  }
});

export {
  parseCookieValue,
  XhrFactory,
  init_xhr
};
/*! Bundled license information:

@angular/common/fesm2022/xhr.mjs:
  (**
   * @license Angular v20.2.1
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-2AU2PRRG.js.map
