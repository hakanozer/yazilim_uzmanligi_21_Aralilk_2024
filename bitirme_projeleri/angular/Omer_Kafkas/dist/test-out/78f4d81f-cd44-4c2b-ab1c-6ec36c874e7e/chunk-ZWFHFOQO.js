import {
  FormsModule,
  init_forms
} from "./chunk-7AYAR7C2.js";
import {
  AuthService,
  init_auth_service
} from "./chunk-34OZRGJF.js";
import {
  SearchService,
  init_search_service
} from "./chunk-Q7UHU2WF.js";
import {
  Router,
  RouterModule,
  init_router
} from "./chunk-M4PFLADM.js";
import {
  CommonModule,
  init_common
} from "./chunk-KPU4P7VX.js";
import {
  Component,
  Subject,
  __decorate,
  __esm,
  debounceTime,
  distinctUntilChanged,
  init_core,
  init_esm,
  init_operators,
  init_tslib_es6,
  inject,
  of,
  signal,
  switchMap
} from "./chunk-Q7SCI6EH.js";

// angular:jit:template:src\app\components\navbar\navbar.html
var navbar_default;
var init_navbar = __esm({
  "angular:jit:template:src\\app\\components\\navbar\\navbar.html"() {
    navbar_default = `<nav class="navbar navbar-dark bg-dark fixed-top">\r
  <div class="container-fluid">\r
    <img\r
      src="assets/logo.png"\r
      alt="logo"\r
      width="50"\r
      height="50"\r
      class="d-inline-block align-text-top"\r
    />\r
\r
    <div class="d-flex align-items-center gap-3">\r
      <div class="position-relative" style="min-width:280px">\r
        <input\r
          class="form-control"\r
          type="search"\r
          placeholder="Genel arama..."\r
          aria-label="Arama"\r
          [ngModel]="query()"\r
          (ngModelChange)="onInput($event)"\r
          (keydown.enter)="goToFull()"\r
          (focus)="open.set(results().length>0)"\r
        />\r
        @if(searching()){\r
          <span class="position-absolute top-50 end-0 translate-middle-y me-3 spinner-border spinner-border-sm" aria-hidden="true"></span>\r
        }\r
        @if(open()){\r
          <div class="list-group position-absolute w-100 mt-1 shadow" style="z-index:1050; max-height:340px; overflow:auto">\r
            @for(r of results(); track r.id){\r
              <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" (click)="navigate(r)">\r
                <span class="text-start">\r
                  <strong>{{ r.title }}</strong>\r
                  @if(r.subtitle){<small class="d-block text-muted">{{ r.subtitle }}</small>}\r
                </span>\r
                <span class="badge bg-secondary text-uppercase">{{ labelOf(r.type) }}</span>\r
              </button>\r
            }\r
            @if(!results().length && !searching()){\r
              <div class="list-group-item text-muted">Sonu\xE7 yok</div>\r
            }\r
            <button type="button" class="list-group-item list-group-item-action text-center fw-semibold" (click)="goToFull()">T\xFCm sonu\xE7lar\u0131 g\xF6ster \xBB</button>\r
          </div>\r
        }\r
      </div>\r
      <button\r
        class="navbar-toggler"\r
        type="button"\r
        data-bs-toggle="offcanvas"\r
        data-bs-target="#offcanvasDarkNavbar"\r
        aria-controls="offcanvasDarkNavbar"\r
        aria-label="Men\xFCy\xFC A\xE7/Kapat"\r
      >\r
        <span class="navbar-toggler-icon"></span>\r
      </button>\r
    </div>\r
\r
    <div\r
      class="offcanvas offcanvas-end text-bg-dark"\r
      tabindex="-1"\r
      id="offcanvasDarkNavbar"\r
      aria-labelledby="offcanvasDarkNavbarLabel"\r
    >\r
      <div class="offcanvas-header d-flex align-items-center gap-3">\r
        <ng-container *ngIf="auth.currentUser() as user">\r
          <img\r
            [src]="user.profilePhoto || 'assets/logo.png'"\r
            alt="avatar"\r
            width="48"\r
            height="48"\r
            style="border-radius: 50%; object-fit: cover"\r
            class="me-2"\r
          />\r
          <div class="d-flex flex-column">\r
            <div class="text-white fw-bold">{{ user.name }} {{ user.surname }}</div>\r
            <button class="btn btn-sm btn-outline-light mt-1" (click)="logout()">\xC7\u0131k\u0131\u015F Yap</button>\r
          </div>\r
        </ng-container>\r
        <button\r
          type="button"\r
          class="btn-close btn-close-white"\r
          data-bs-dismiss="offcanvas"\r
          aria-label="Close"\r
        ></button>\r
      </div>\r
      <div class="offcanvas-body">\r
        <div class="d-flex flex-column h-100">\r
          <ul class="navbar-nav justify-content-end pe-3">\r
            <li class="nav-item"></li>\r
            <li class="nav-item">\r
              <a\r
                class="nav-link active"\r
                aria-current="page"\r
                routerLink="/"\r
                routerLinkActive="active"\r
                >Ana Sayfa</a\r
              >\r
            </li>\r
            @if (auth.currentUser()) {\r
              <li class="nav-item">\r
                <a class="nav-link" routerLink="/profile" routerLinkActive="active">Profil</a>\r
              </li>\r
            }\r
            <li class="nav-item dropdown">\r
              <a class="nav-link" routerLink="/courses" routerLinkActive="active">Kurslar</a>\r
            </li>\r
            @if (auth.currentUser()?.role === 'instructor') {\r
              <li class="nav-item">\r
                <a class="nav-link" routerLink="/edit-courses" routerLinkActive="active">Kurslar\u0131 Y\xF6net</a>\r
              </li>\r
            }\r
            <li class="nav-item dropdown">\r
              <a class="nav-link" routerLink="/about-us" routerLinkActive="active">Hakk\u0131m\u0131zda</a>\r
            </li>\r
          </ul>\r
          <div class="mt-auto w-100">\r
            <div class="accordion bg-dark text-white border-0" id="accordionExample">\r
              <div class="accordion-item bg-dark text-white border-0">\r
                <h2 class="accordion-header bg-dark text-white border-0" id="headingOne">\r
                  <button\r
                    class="accordion-button bg-dark text-white border-0"\r
                    type="button"\r
                    data-bs-toggle="collapse"\r
                    data-bs-target="#collapseOne"\r
                    aria-expanded="false"\r
                    aria-controls="collapseOne"\r
                  >\r
                    Ki\u015Fisel Verileri Koruma Kanunu\r
                  </button>\r
                </h2>\r
                <div\r
                  id="collapseOne"\r
                  class="accordion-collapse collapse bg-dark text-white border-0"\r
                  aria-labelledby="headingOne"\r
                  data-bs-parent="#accordionExample"\r
                >\r
                  <div class="accordion-body bg-dark text-white border-0">\r
                    6698 say\u0131l\u0131 Ki\u015Fisel Verilerin Korunmas\u0131 Kanunu (KVKK), bireylerin ki\u015Fisel\r
                    verilerinin hukuka uygun \u015Fekilde i\u015Flenmesini, saklanmas\u0131n\u0131 ve korunmas\u0131n\u0131\r
                    ama\xE7layan temel d\xFCzenlemedir. Bu kanun, ki\u015Fisel verilerin ancak a\xE7\u0131k r\u0131za veya\r
                    kanunda belirtilen istisnai hallerde i\u015Flenebilece\u011Fini, verilerin belirli ve\r
                    me\u015Fru ama\xE7larla toplanmas\u0131 gerekti\u011Fini ve gerekti\u011Finde silinmesi, yok edilmesi\r
                    ya da anonimle\u015Ftirilmesi gerekti\u011Fini h\xFCkme ba\u011Flar. \u0130lgili ki\u015Filer, verilerinin\r
                    i\u015Flenip i\u015Flenmedi\u011Fini \xF6\u011Frenme, d\xFCzeltilmesini veya silinmesini talep etme gibi\r
                    haklara sahiptir; veri sorumlular\u0131 ise ayd\u0131nlatma y\xFCk\xFCml\xFCl\xFC\u011F\xFC, g\xFCvenlik\r
                    tedbirleri alma ve VERB\u0130S\u2019e kay\u0131t gibi sorumluluklar ta\u015F\u0131r. KVKK, dijital \xE7a\u011Fda\r
                    birey mahremiyetini korumak i\xE7in kritik bir yasal \xE7er\xE7eve sunar.\r
                  </div>\r
                </div>\r
              </div>\r
              <div class="accordion-item bg-dark text-white border-0">\r
                <h2 class="accordion-header bg-dark text-white border-0" id="headingTwo">\r
                  <button\r
                    class="accordion-button bg-dark text-white border-0 collapsed"\r
                    type="button"\r
                    data-bs-toggle="collapse"\r
                    data-bs-target="#collapseTwo"\r
                    aria-expanded="false"\r
                    aria-controls="collapseTwo"\r
                  >\r
                    \u015Eartlar ve Ko\u015Fullar\r
                  </button>\r
                </h2>\r
                <div\r
                  id="collapseTwo"\r
                  class="accordion-collapse collapse bg-dark text-white border-0"\r
                  aria-labelledby="headingTwo"\r
                  data-bs-parent="#accordionExample"\r
                >\r
                  <div class="accordion-body bg-dark text-white border-0">\r
                    Bu web sitesini kullanarak, kullan\u0131c\u0131lar sunulan i\xE7erik ve hizmetleri yaln\u0131zca\r
                    yasal ama\xE7larla ve ilgili kullan\u0131m ko\u015Fullar\u0131na uygun \u015Fekilde kullanmay\u0131 kabul\r
                    eder. Web sitesi sahibi, i\xE7eriklerin do\u011Frulu\u011Fu, kesintisiz eri\u015Fim veya \xFC\xE7\xFCnc\xFC\r
                    taraf ba\u011Flant\u0131larla ilgili herhangi bir garanti vermez ve do\u011Fabilecek teknik\r
                    sorunlar, veri kay\u0131plar\u0131 veya hizmet kesintilerinden sorumlu tutulamaz.\r
                    Kullan\u0131c\u0131lar, telif hakk\u0131 i\xE7eren materyalleri izinsiz payla\u015Fmamay\u0131 ve di\u011Fer\r
                    kullan\u0131c\u0131lar\u0131n haklar\u0131na sayg\u0131 g\xF6stermeyi taahh\xFCt eder. Web sitesinin t\xFCm\r
                    i\xE7eri\u011Fi, aksi belirtilmedik\xE7e sahibine aittir ve izinsiz \xE7o\u011Falt\u0131lamaz veya\r
                    da\u011F\u0131t\u0131lamaz. Bu \u015Fartlar, yerel yasal d\xFCzenlemelere g\xF6re yorumlan\u0131r ve\r
                    gerekti\u011Finde g\xFCncellenebilir.\r
                  </div>\r
                </div>\r
              </div>\r
              <div class="accordion-item bg-dark text-white border-0">\r
                <h2 class="accordion-header bg-dark text-white border-0" id="headingThree">\r
                  <button\r
                    class="accordion-button bg-dark text-white border-0 collapsed"\r
                    type="button"\r
                    data-bs-toggle="collapse"\r
                    data-bs-target="#collapseThree"\r
                    aria-expanded="false"\r
                    aria-controls="collapseThree"\r
                  >\r
                    \xC7erez Politikalar\u0131\r
                  </button>\r
                </h2>\r
                <div\r
                  id="collapseThree"\r
                  class="accordion-collapse collapse bg-dark text-white border-0"\r
                  aria-labelledby="headingThree"\r
                  data-bs-parent="#accordionExample"\r
                >\r
                  <div class="accordion-body bg-dark text-white border-0">\r
                    Bu web sitesi, kullan\u0131c\u0131 deneyimini geli\u015Ftirmek ve hizmetlerin daha verimli\r
                    sunulmas\u0131n\u0131 sa\u011Flamak amac\u0131yla \xE7erezler kullanmaktad\u0131r. Ziyaretiniz s\u0131ras\u0131nda\r
                    cihaz\u0131n\u0131za yerle\u015Ftirilen \xE7erezler; oturum y\xF6netimi, tercihlerin hat\u0131rlanmas\u0131,\r
                    analiz ve reklam hizmetlerinin ki\u015Fiselle\u015Ftirilmesi gibi i\u015Flevleri yerine\r
                    getirir. Kullan\u0131c\u0131lar, taray\u0131c\u0131 ayarlar\u0131 \xFCzerinden \xE7erezleri y\xF6netebilir veya\r
                    engelleyebilir; ancak baz\u0131 \xE7erezlerin devre d\u0131\u015F\u0131 b\u0131rak\u0131lmas\u0131, site\r
                    i\u015Flevselli\u011Fini olumsuz etkileyebilir. \xC7erez kullan\u0131m\u0131, y\xFCr\xFCrl\xFCkteki veri koruma\r
                    mevzuat\u0131na uygun \u015Fekilde ger\xE7ekle\u015Ftirilmekte olup, ki\u015Fisel verilerin gizlili\u011Fi\r
                    ve g\xFCvenli\u011Fi \xF6ncelikli olarak g\xF6zetilmektedir.\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
            <p class="text-center small fst-italic">Copyright \xA9 2025 T\xFCm Haklar\u0131 Sakl\u0131d\u0131r.</p>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</nav>\r
`;
  }
});

// angular:jit:style:src\app\components\navbar\navbar.css
var navbar_default2;
var init_navbar2 = __esm({
  "angular:jit:style:src\\app\\components\\navbar\\navbar.css"() {
    navbar_default2 = "/* src/app/components/navbar/navbar.css */\n/*# sourceMappingURL=navbar.css.map */\n";
  }
});

// src/app/components/navbar/navbar.ts
var Navbar;
var init_navbar3 = __esm({
  "src/app/components/navbar/navbar.ts"() {
    "use strict";
    init_tslib_es6();
    init_navbar();
    init_navbar2();
    init_core();
    init_forms();
    init_router();
    init_common();
    init_auth_service();
    init_search_service();
    init_operators();
    init_esm();
    init_router();
    Navbar = class Navbar2 {
      auth = inject(AuthService);
      router = inject(Router);
      searchService = inject(SearchService);
      query = signal("");
      input$ = new Subject();
      results = signal([]);
      open = signal(false);
      searching = signal(false);
      constructor() {
        this.input$.pipe(debounceTime(250), distinctUntilChanged(), switchMap((q) => {
          const val = q.trim();
          if (!val) {
            this.searching.set(false);
            return of([]);
          }
          this.searching.set(true);
          return this.searchService.search(val);
        })).subscribe((res) => {
          this.results.set(res.slice(0, 8));
          this.open.set(res.length > 0);
          this.searching.set(false);
        });
      }
      onInput(v) {
        this.query.set(v);
        this.input$.next(v);
      }
      goToFull() {
        const q = this.query().trim();
        if (!q)
          return;
        this.open.set(false);
        this.router.navigate(["/search"], { queryParams: { q } });
      }
      navigate(r) {
        this.open.set(false);
        if (r.type === "course" || r.relatedCourseId) {
          this.router.navigate(["/courses", r.relatedCourseId || r.id]);
        } else if (r.type === "user") {
        }
      }
      // template can call auth.currentUser() to get the current user signal value
      logout() {
        this.auth.logout();
        this.router.navigate(["/"]);
      }
      labelOf(type) {
        switch (type) {
          case "course":
            return "Kurs";
          case "lesson":
            return "Ders";
          case "comment":
            return "Yorum";
          case "user":
            return "Kullan\u0131c\u0131";
          default:
            return type;
        }
      }
      static ctorParameters = () => [];
    };
    Navbar = __decorate([
      Component({
        selector: "app-navbar",
        imports: [CommonModule, RouterModule, FormsModule],
        template: navbar_default,
        styles: [navbar_default2]
      })
    ], Navbar);
  }
});

export {
  Navbar,
  init_navbar3 as init_navbar
};
//# sourceMappingURL=chunk-ZWFHFOQO.js.map
