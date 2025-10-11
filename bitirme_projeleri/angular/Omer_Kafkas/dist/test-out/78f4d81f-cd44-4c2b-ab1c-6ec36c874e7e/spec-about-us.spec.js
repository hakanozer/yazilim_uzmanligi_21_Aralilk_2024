import {
  BackgroundItem,
  init_background_item
} from "./chunk-5PCVAUYP.js";
import {
  Api,
  init_api
} from "./chunk-5RMG6BQX.js";
import "./chunk-4JIKCAJV.js";
import {
  globalTestConfig,
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
  inject,
  signal
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\pages\about-us\about-us.html
var about_us_default;
var init_about_us = __esm({
  "angular:jit:template:src\\app\\pages\\about-us\\about-us.html"() {
    about_us_default = `<app-background-item></app-background-item>\r
\r
<div class="row">\r
  <div class="col-sm-3"></div>\r
  <div class="col-sm-6 d-flex justify-content-center mt-5 p-5">\r
    <div class="card p-3">\r
      <h3>Hakk\u0131m\u0131zda</h3>\r
      <p>\r
        E\u011Fitim Y\xF6netim Sistemi, modern ve eri\u015Filebili bir \xF6\u011Frenme platformudur. Amac\u0131m\u0131z, yaz\u0131l\u0131m ve\r
        teknoloji alan\u0131nda g\xFCncel, kaliteli ve ula\u015F\u0131labilir e\u011Fitimler sunmakt\u0131r.\r
      </p>\r
      <div class="d-flex justify-content-between mt-4">\r
        <div>\r
          <h5>Vizyonumuz</h5>\r
          <p>\r
            Her seviyeden kullan\u0131c\u0131ya, en g\xFCncel yaz\u0131l\u0131m ve bili\u015Fim e\u011Fitimlerini sunarak dijital\r
            d\xFCnyada g\xFC\xE7l\xFC bireyler yeti\u015Ftirmek.\r
          </p>\r
        </div>\r
        <div>\r
          <h5>Misyonumuz</h5>\r
          <p>\r
            Kat\u0131l\u0131mc\u0131lar\u0131n hem teknik hem de ki\u015Fisel geli\u015Fimini destekleyen, yenilik\xE7i ve\r
            etkile\u015Fimli bir e\u011Fitim ortam\u0131 sa\u011Flamak.\r
          </p>\r
        </div>\r
      </div>\r
      <div class="mt-4">\r
        <h3>Ekibimiz</h3>\r
        @if(loading()){ \r
          <div class="text-muted small">E\u011Fitmenler y\xFCkleniyor...</div>\r
        } @else if(!instructors().length) {\r
          <div class="text-muted small">Hen\xFCz kay\u0131tl\u0131 e\u011Fitmen yok.</div>\r
        } @else {\r
          <div class="row g-3 mt-2">\r
            @for(ins of instructors(); track ins.id){\r
              <div class="col-md-4">\r
                <div class="card h-100 p-2 d-flex flex-column">\r
                  <img [src]="ins.profilePhoto || 'assets/logo.png'" alt="{{ins.name}} {{ins.surname}}" class="rounded mb-2" style="width:100%;height:160px;object-fit:cover;" />\r
                  <strong>{{ ins.name }} {{ ins.surname }}</strong>\r
                  <span class="badge mt-1" [class.bg-warning]="true" [class.text-dark]="true">E\u011Fitici</span>\r
                  <p class="mt-2 mb-0 small text-muted" style="min-height:42px;">E\u011Fitmen profili g\xFCncelleniyor.</p>\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
  <div class="col-sm-3"></div>\r
</div>\r
`;
  }
});

// angular:jit:style:src\app\pages\about-us\about-us.css
var about_us_default2;
var init_about_us2 = __esm({
  "angular:jit:style:src\\app\\pages\\about-us\\about-us.css"() {
    about_us_default2 = "/* src/app/pages/about-us/about-us.css */\n/*# sourceMappingURL=about-us.css.map */\n";
  }
});

// src/app/pages/about-us/about-us.ts
var AboutUs;
var init_about_us3 = __esm({
  "src/app/pages/about-us/about-us.ts"() {
    "use strict";
    init_tslib_es6();
    init_about_us();
    init_about_us2();
    init_core();
    init_background_item();
    init_common();
    init_api();
    AboutUs = class AboutUs2 {
      api = inject(Api);
      instructors = signal([]);
      loading = signal(true);
      ngOnInit() {
        this.api.list("users", { role: "instructor" }).subscribe((list) => {
          this.instructors.set(list);
          this.loading.set(false);
        }, (_) => this.loading.set(false));
      }
    };
    AboutUs = __decorate([
      Component({
        selector: "app-about-us",
        imports: [BackgroundItem, CommonModule],
        template: about_us_default,
        styles: [about_us_default2]
      })
    ], AboutUs);
  }
});

// src/app/pages/about-us/about-us.spec.ts
var require_about_us_spec = __commonJS({
  "src/app/pages/about-us/about-us.spec.ts"(exports) {
    init_testing();
    init_about_us3();
    init_test_setup();
    describe("AboutUs", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [AboutUs],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(AboutUs);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_about_us_spec();
//# sourceMappingURL=spec-about-us.spec.js.map
