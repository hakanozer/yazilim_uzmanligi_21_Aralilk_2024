import {
  AuthService,
  init_auth_service
} from "./chunk-VHMFWLLS.js";
import "./chunk-4JIKCAJV.js";
import {
  RouterLink,
  globalTestConfig,
  init_router,
  init_test_setup
} from "./chunk-JRICTGO3.js";
import {
  CommonModule,
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_common,
  init_core,
  init_testing,
  init_tslib_es6,
  inject
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\pages\home\home.html
var home_default;
var init_home = __esm({
  "angular:jit:template:src\\app\\pages\\home\\home.html"() {
    home_default = '<div class="home-bg">\r\n  <div class="d-flex justify-content-center align-items-center">\r\n    <img style="margin: 70px" src="/assets/logo.png" width="300" height="300" alt="Logo" />\r\n  </div>\r\n  <div class="d-flex justify-content-center gap-5">\r\n    <div class="card" style="width: 18rem">\r\n      <img src="assets/backend_egitimi.png" class="card-img-top" alt="..." />\r\n      <div class="card-body">\r\n        <h5 class="card-title">Backend E\u011Fitimleri</h5>\r\n\r\n      </div>\r\n    </div>\r\n    <div class="card" style="width: 18rem">\r\n      <img src="assets/veritaban\u0131_egitimi.png" class="card-img-top" alt="..." />\r\n      <div class="card-body">\r\n        <h5 class="card-title">Veri Taban\u0131 E\u011Fitimleri</h5>\r\n      </div>\r\n    </div>\r\n    <div class="card" style="width: 18rem">\r\n      <img src="assets/frontend_egitimi.png" class="card-img-top" alt="..." />\r\n      <div class="card-body">\r\n        <h5 class="card-title">Frontend E\u011Fitimleri</h5>\r\n      </div>\r\n    </div>\r\n    <div class="card" style="width: 18rem">\r\n      <img src="assets/sistem_egitimi.png" class="card-img-top" alt="..." />\r\n      <div class="card-body">\r\n        <h5 class="card-title">Sistem E\u011Fitimleri</h5>\r\n      </div>\r\n    </div>\r\n    <div class="card" style="width: 18rem">\r\n      <img src="assets/siber_guvenlik_egitimi.png" class="card-img-top" alt="..." />\r\n      <div class="card-body">\r\n        <h5 class="card-title">Siber G\xFCvenlik E\u011Fitimleri</h5>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class="row mt-3">\r\n    <div class="col-sm-4"></div>\r\n    <div class="col-sm-4 d-flex justify-content-center">\r\n      <a class="btn btn-primary" routerLink="/courses">E\u011Fitimleri \u0130ncele</a>\r\n    </div>\r\n    <div class="col-sm-4"></div>\r\n  </div>\r\n\r\n  <div class="d-flex justify-content-center mt-2 gap-5">\r\n    <ng-container *ngIf="!auth.currentUser()">\r\n      <a class="btn btn-primary" routerLink="/login">Giri\u015F Yap</a>\r\n      <a class="btn btn-primary" routerLink="/register">Kay\u0131t Ol</a>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n';
  }
});

// angular:jit:style:src\app\pages\home\home.css
var home_default2;
var init_home2 = __esm({
  "angular:jit:style:src\\app\\pages\\home\\home.css"() {
    home_default2 = "/* src/app/pages/home/home.css */\n.home-bg {\n  min-height: 100vh;\n  background-image: url(/assets/arkaplan.png);\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n/*# sourceMappingURL=home.css.map */\n";
  }
});

// src/app/pages/home/home.ts
var Home;
var init_home3 = __esm({
  "src/app/pages/home/home.ts"() {
    "use strict";
    init_tslib_es6();
    init_home();
    init_home2();
    init_core();
    init_router();
    init_common();
    init_auth_service();
    Home = class Home2 {
      auth = inject(AuthService);
    };
    Home = __decorate([
      Component({
        selector: "app-home",
        imports: [CommonModule, RouterLink],
        template: home_default,
        styles: [home_default2]
      })
    ], Home);
  }
});

// src/app/pages/home/home.spec.ts
var require_home_spec = __commonJS({
  "src/app/pages/home/home.spec.ts"(exports) {
    init_testing();
    init_home3();
    init_test_setup();
    describe("Home", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Home],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_home_spec();
//# sourceMappingURL=spec-home.spec.js.map
