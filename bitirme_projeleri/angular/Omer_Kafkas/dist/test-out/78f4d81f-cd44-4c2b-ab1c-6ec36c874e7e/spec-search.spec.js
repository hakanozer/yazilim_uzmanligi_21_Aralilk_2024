import {
  SearchService,
  init_search_service
} from "./chunk-2N6RUHDQ.js";
import {
  Api,
  init_api
} from "./chunk-5RMG6BQX.js";
import "./chunk-4JIKCAJV.js";
import {
  ActivatedRoute,
  RouterModule,
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
  computed,
  effect,
  init_common,
  init_core,
  init_testing,
  init_tslib_es6,
  inject,
  signal
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\pages\search\search.html
var search_default;
var init_search = __esm({
  "angular:jit:template:src\\app\\pages\\search\\search.html"() {
    search_default = `<div class="container py-5 mt-5">\r
	<h3 class="mb-3">Arama: "{{ query() }}"</h3>\r
	@if(loading()){\r
		<div class="d-flex align-items-center gap-2 text-muted">\r
			<div class="spinner-border spinner-border-sm" role="status"></div>\r
			<span>Aran\u0131yor...</span>\r
		</div>\r
	} @else if(!results().length){\r
		<div class="alert alert-info">Sonu\xE7 bulunamad\u0131.</div>\r
	} @else {\r
		@for(kind of kinds(); track kind){\r
			<div class="mb-4">\r
				<h5 class="text-uppercase small fw-bold">{{ kind }}</h5>\r
				<div class="list-group">\r
					@for(r of grouped()[kind]; track r.id){\r
						<a *ngIf="r.relatedCourseId" [routerLink]="['/courses', r.relatedCourseId]" class="list-group-item list-group-item-action">\r
							<strong>{{ r.title }}</strong>\r
							@if(r.subtitle){<small class="text-muted ms-2">{{ r.subtitle }}</small>}\r
						</a>\r
						<div *ngIf="!r.relatedCourseId" class="list-group-item">\r
							<strong>{{ r.title }}</strong>\r
							@if(r.subtitle){<small class="text-muted ms-2">{{ r.subtitle }}</small>}\r
						</div>\r
					}\r
				</div>\r
			</div>\r
		}\r
	}\r
</div>\r
`;
  }
});

// angular:jit:style:src\app\pages\search\search.css
var search_default2;
var init_search2 = __esm({
  "angular:jit:style:src\\app\\pages\\search\\search.css"() {
    search_default2 = "/* src/app/pages/search/search.css */\n/*# sourceMappingURL=search.css.map */\n";
  }
});

// src/app/pages/search/search.ts
var Search;
var init_search3 = __esm({
  "src/app/pages/search/search.ts"() {
    "use strict";
    init_tslib_es6();
    init_search();
    init_search2();
    init_core();
    init_router();
    init_common();
    init_search_service();
    init_api();
    Search = class Search2 {
      route = inject(ActivatedRoute);
      searchService = inject(SearchService);
      api = inject(Api);
      query = signal("");
      results = signal([]);
      loading = signal(false);
      constructor() {
        effect(() => {
          const qp = this.route.snapshot.queryParamMap.get("q") || "";
          if (qp !== this.query()) {
            this.query.set(qp);
            this.run(qp);
          }
        });
      }
      run(q) {
        const val = q.trim();
        if (!val) {
          this.results.set([]);
          return;
        }
        this.loading.set(true);
        this.searchService.search(val).subscribe((r) => {
          this.results.set(r);
          this.loading.set(false);
        });
      }
      grouped = computed(() => {
        const groups = {};
        for (const r of this.results()) {
          groups[r.type] = groups[r.type] || [];
          groups[r.type].push(r);
        }
        return groups;
      });
      kinds = computed(() => Object.keys(this.grouped()));
      static ctorParameters = () => [];
    };
    Search = __decorate([
      Component({
        selector: "app-search",
        imports: [CommonModule, RouterModule],
        template: search_default,
        styles: [search_default2]
      })
    ], Search);
  }
});

// src/app/pages/search/search.spec.ts
var require_search_spec = __commonJS({
  "src/app/pages/search/search.spec.ts"(exports) {
    init_testing();
    init_search3();
    init_test_setup();
    describe("Search", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Search],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(Search);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_search_spec();
//# sourceMappingURL=spec-search.spec.js.map
