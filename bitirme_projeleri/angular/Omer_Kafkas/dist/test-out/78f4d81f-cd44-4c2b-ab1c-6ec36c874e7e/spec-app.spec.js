import {
  Navbar,
  init_navbar
} from "./chunk-NQJYBHDO.js";
import "./chunk-XDF3BTPI.js";
import "./chunk-VHMFWLLS.js";
import "./chunk-2N6RUHDQ.js";
import "./chunk-5RMG6BQX.js";
import "./chunk-4JIKCAJV.js";
import {
  RouterOutlet,
  globalTestConfig,
  init_router,
  init_test_setup
} from "./chunk-JRICTGO3.js";
import {
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6,
  provideZonelessChangeDetection,
  signal
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\app.html
var app_default;
var init_app = __esm({
  "angular:jit:template:src\\app\\app.html"() {
    app_default = '<app-navbar></app-navbar>\r\n<h1 class="visually-hidden">E\u011Fitim Y\xF6netim Sistemi</h1>\r\n<router-outlet></router-outlet>\r\n';
  }
});

// angular:jit:style:src\app\app.css
var app_default2;
var init_app2 = __esm({
  "angular:jit:style:src\\app\\app.css"() {
    app_default2 = "/* src/app/app.css */\n/*# sourceMappingURL=app.css.map */\n";
  }
});

// src/app/app.ts
var App;
var init_app3 = __esm({
  "src/app/app.ts"() {
    "use strict";
    init_tslib_es6();
    init_app();
    init_app2();
    init_core();
    init_router();
    init_navbar();
    App = class App2 {
      title = signal("Egitim_Yonetim_Sistemi");
    };
    App = __decorate([
      Component({
        selector: "app-root",
        imports: [RouterOutlet, Navbar],
        template: app_default,
        styles: [app_default2]
      })
    ], App);
  }
});

// src/app/app.spec.ts
var require_app_spec = __commonJS({
  "src/app/app.spec.ts"(exports) {
    init_core();
    init_testing();
    init_app3();
    init_test_setup();
    describe("App", () => {
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [App],
          providers: [provideZonelessChangeDetection(), ...globalTestConfig.providers]
        }).compileComponents();
      }));
      it("should create the app", () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
      it("ba\u015Fl\u0131k h1 i\xE7inde bulunmal\u0131", () => {
        const fixture = TestBed.createComponent(App);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector("h1")?.textContent).toContain("E\u011Fitim Y\xF6netim Sistemi");
      });
    });
  }
});
export default require_app_spec();
//# sourceMappingURL=spec-app.spec.js.map
