import {
  ChangeDetectionStrategy,
  Component,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-FTL7MPRH.js";

// angular:jit:style:src\app\components\background-item\background-item.css
var background_item_default;
var init_background_item = __esm({
  "angular:jit:style:src\\app\\components\\background-item\\background-item.css"() {
    background_item_default = "/* src/app/components/background-item/background-item.css */\n.background-bg {\n  background-image: url(/assets/arkaplan.png);\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-attachment: fixed;\n  background-position: center center;\n  opacity: 0.4;\n  z-index: -1;\n  position: fixed;\n  inset: 0;\n  width: 100vw;\n  height: 100vh;\n}\n/*# sourceMappingURL=background-item.css.map */\n";
  }
});

// src/app/components/background-item/background-item.ts
var BackgroundItem;
var init_background_item2 = __esm({
  "src/app/components/background-item/background-item.ts"() {
    "use strict";
    init_tslib_es6();
    init_background_item();
    init_core();
    BackgroundItem = class BackgroundItem2 {
    };
    BackgroundItem = __decorate([
      Component({
        selector: "app-background-item",
        imports: [],
        template: `<div class="background-bg"></div>`,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [background_item_default]
      })
    ], BackgroundItem);
  }
});

export {
  BackgroundItem,
  init_background_item2 as init_background_item
};
//# sourceMappingURL=chunk-EMRTM5DC.js.map
