import {
  EnrollmentService,
  init_enrollment_service
} from "./chunk-G7OLB6ZA.js";
import {
  BackgroundItem,
  init_background_item
} from "./chunk-5PCVAUYP.js";
import {
  AuthService,
  init_auth_service
} from "./chunk-VHMFWLLS.js";
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
  Injectable,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  forkJoin,
  init_common,
  init_core,
  init_esm,
  init_testing,
  init_tslib_es6,
  inject,
  of,
  signal
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\pages\profile\profile.html
var profile_default;
var init_profile = __esm({
  "angular:jit:template:src\\app\\pages\\profile\\profile.html"() {
    profile_default = `<app-background-item></app-background-item>\r
<div class="row mt-5 p-5">\r
  <div class="col-3"></div>\r
  <div class="col-6">\r
    <div class="card p-3">\r
      <div class="text-center">\r
        <img [src]="profilePhoto" width="120" height="120" alt="Profil Foto\u011Fraf\u0131" class="rounded-circle mx-auto d-block" />\r
        <h3 class="mt-2 mb-1">{{ user?.name }} {{ user?.surname }}</h3>\r
        <p class="mb-1">{{ user?.email }}</p>\r
        @if(user?.role){\r
          <span class="badge" [class.bg-primary]="user?.role==='student'" [class.bg-warning]="user?.role==='instructor'" [class.text-dark]="user?.role==='instructor'">\r
            {{ user?.role === 'student' ? '\xD6\u011Frenci' : 'E\u011Fitici' }}\r
          </span>\r
        }\r
      </div>\r
\r
      <hr />\r
\r
      @if(loading()){ \r
        <div class="d-flex flex-column align-items-center py-4 text-muted">\r
          <div class="spinner-border mb-3" role="status" style="width:2.5rem;height:2.5rem">\r
            <span class="visually-hidden">Y\xFCkleniyor...</span>\r
          </div>\r
          <div>Profil verileri y\xFCkleniyor...</div>\r
        </div>\r
      } @else if(empty()) {\r
        <div class="alert alert-info m-0">Hen\xFCz g\xF6r\xFCnt\xFClenecek kurs bulunmuyor.</div>\r
      } @else {\r
        @if(user?.role==='student'){\r
          <div class="d-flex gap-2 flex-wrap mb-3">\r
            <div class="badge bg-secondary">Kurs Say\u0131s\u0131: {{ studentMetrics().courseCount }}</div>\r
            <div class="badge bg-secondary">Toplam S\xFCre: {{ studentMetrics().totalHours }}s</div>\r
            <div class="badge bg-secondary">Toplam Tutar: {{ studentMetrics().totalPrice | currency:'TRY' }}</div>\r
          </div>\r
        }\r
        @if(user?.role==='instructor'){\r
          <div class="d-flex gap-2 flex-wrap mb-3">\r
            <div class="badge bg-secondary">E\u011Fitim Say\u0131s\u0131: {{ instructorMetrics().courseCount }}</div>\r
            <div class="badge bg-secondary">Toplam \xD6\u011Frenci: {{ instructorMetrics().totalStudents }}</div>\r
          </div>\r
        }\r
        @if(!user?.role || user?.role === 'student'){\r
          <h5>Al\u0131nan Kurslar</h5>\r
          <div class="row mt-3 g-3">\r
            @for(cat of categories(); track cat.id){\r
              @if(groupedCourses()[cat.id] && groupedCourses()[cat.id].length){\r
                <div class="col-12">\r
                  <h6>{{ cat.name }}</h6>\r
                </div>\r
                @for(c of groupedCourses()[cat.id]; track c.id){\r
                  <div class="col-md-4">\r
                    <div class="card h-100">\r
                      <img [src]="c.image || 'assets/logo.png'" width="160" height="160" class="card-img-top" alt="{{ c.title }}" style="object-fit: cover; height: auto" />\r
                      <div class="card-body d-flex flex-column">\r
                        <h5 class="card-title">{{ c.title }}</h5>\r
                        <p class="card-text text-muted">{{ c.instructorName }}</p>\r
                        <p class="card-text">{{ c.description }}</p>\r
                        <div class="mt-auto d-flex justify-content-between align-items-center">\r
                          <strong>{{ c.price | currency : 'TRY' }}</strong>\r
                        </div>\r
                      </div>\r
                    </div>\r
                  </div>\r
                }\r
              }\r
            }\r
          </div>\r
        }\r
\r
        @if(user?.role === 'instructor'){\r
          <h5>Verilen Kurslar</h5>\r
          @for(cat of categories(); track cat.id){\r
            @if(groupedCourses()[cat.id] && groupedCourses()[cat.id].length){\r
              <h6>{{ cat.name }}</h6>\r
              <ul class="mb-3">\r
                @for(c of groupedCourses()[cat.id]; track c.id){\r
                  <li>{{ c.title }}</li>\r
                }\r
              </ul>\r
            }\r
          }\r
        }\r
      }\r
    </div>\r
  </div>\r
  <div class="col-3"></div>\r
</div>\r
`;
  }
});

// angular:jit:style:src\app\pages\profile\profile.css
var profile_default2;
var init_profile2 = __esm({
  "angular:jit:style:src\\app\\pages\\profile\\profile.css"() {
    profile_default2 = "/* src/app/pages/profile/profile.css */\n/*# sourceMappingURL=profile.css.map */\n";
  }
});

// src/app/services/cache.service.ts
var CacheService;
var init_cache_service = __esm({
  "src/app/services/cache.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    CacheService = class CacheService2 {
      store = /* @__PURE__ */ new Map();
      defaultTtlMs = 6e4;
      // 60s
      get(key) {
        const entry = this.store.get(key);
        if (!entry)
          return null;
        if (Date.now() - entry.ts > entry.ttl) {
          this.store.delete(key);
          return null;
        }
        return entry.data;
      }
      set(key, data, ttlMs) {
        this.store.set(key, { data, ts: Date.now(), ttl: ttlMs ?? this.defaultTtlMs });
      }
      has(key) {
        return !!this.get(key);
      }
      clear(key) {
        if (key)
          this.store.delete(key);
        else
          this.store.clear();
      }
    };
    CacheService = __decorate([
      Injectable({ providedIn: "root" })
    ], CacheService);
  }
});

// src/app/pages/profile/profile.ts
var Profile;
var init_profile3 = __esm({
  "src/app/pages/profile/profile.ts"() {
    "use strict";
    init_tslib_es6();
    init_profile();
    init_profile2();
    init_core();
    init_router();
    init_cache_service();
    init_background_item();
    init_auth_service();
    init_common();
    init_api();
    init_enrollment_service();
    init_esm();
    Profile = class Profile2 {
      auth = inject(AuthService);
      api = inject(Api);
      enrollmentEvents = inject(EnrollmentService);
      route = inject(ActivatedRoute);
      cache = inject(CacheService);
      user = null;
      profilePhoto = "assets/logo.png";
      // reactive state (signals)
      categories = signal([]);
      groupedCourses = signal({});
      allCourses = signal([]);
      loading = signal(true);
      empty = computed(() => !this.loading() && Object.keys(this.groupedCourses()).length === 0);
      // Öğrenci metrikleri: alınan kurs listesini group map'inden düzleştirip hesapla
      studentCourseList = computed(() => {
        if (!this.user || this.user.role !== "student")
          return [];
        const groups = this.groupedCourses();
        const all = [];
        for (const k of Object.keys(groups)) {
          all.push(...groups[k]);
        }
        return all;
      });
      studentMetrics = computed(() => {
        if (!this.user || this.user.role !== "student")
          return { courseCount: 0, totalPrice: 0, totalHours: 0 };
        const list = this.studentCourseList();
        let totalPrice = 0;
        let totalHours = 0;
        for (const c of list) {
          if (typeof c.price === "number")
            totalPrice += c.price;
          if (typeof c.durationHours === "number")
            totalHours += c.durationHours;
        }
        return {
          courseCount: list.length,
          totalPrice: Number(totalPrice.toFixed(2)),
          totalHours
        };
      });
      instructorMetrics = computed(() => {
        if (this.user?.role !== "instructor")
          return { courseCount: 0, totalStudents: 0 };
        const all = this.allCourses();
        const mine = all.filter((c) => c.instructorId === this.user?.id);
        const courseCount = mine.length;
        const totalStudents = mine.reduce((sum, c) => sum + (Array.isArray(c.students) ? c.students.length : 0), 0);
        return { courseCount, totalStudents };
      });
      // Eski manuel effect referansları kaldırıldı; Angular runtime cleanup'a bırakıyoruz.
      // Effects injection context: tanımlar property initializer olarak yapılır
      _enrollmentEffect = effect(() => {
        this.enrollmentEvents.version();
        if (!this.user)
          return;
        if (this.user.role && this.user.role !== "student")
          return;
        if (this.allCourses().length) {
          this.cache.clear(`profile:${this.user.id}`);
          this.recomputeStudentGrouping();
        }
      });
      _userSyncEffect = effect(() => {
        const u = this.auth.currentUser();
        if (!u)
          return;
        if (this.user && this.user.id === u.id)
          return;
        const firstTime = !this.user;
        this.applyUser(u, true);
        if (firstTime && !this.allCourses().length) {
          this.loading.set(true);
          const isStudent = (u.role || "student") === "student";
          const categories$ = this.api.list("categories");
          const courses$ = this.api.list("courses");
          const enrollments$ = isStudent ? this.api.list("enrollments", { userId: u.id }) : of([]);
          forkJoin({ categories: categories$, courses: courses$, enrollments: enrollments$ }).subscribe(({ categories, courses, enrollments }) => {
            this.categories.set(categories);
            this.allCourses.set(courses);
            if (isStudent) {
              const ids = new Set(enrollments.map((e) => e.courseId));
              const my = courses.filter((c) => ids.has(c.id));
              this.groupedCourses.set(this.groupByCategory(my));
            } else {
              const mine = courses.filter((c) => c.instructorId === u.id);
              this.groupedCourses.set(this.groupByCategory(mine));
            }
            this.loading.set(false);
          });
        }
      });
      ngOnInit() {
        const initial = this.auth.currentUser();
        if (initial) {
          this.applyUser(initial, false);
        }
        const data = this.route.snapshot.data["profileData"];
        if (data) {
          this.categories.set(data.categories || []);
          const all = data.courses || [];
          this.allCourses.set(all);
          if (this.user?.role === "instructor") {
            const my = all.filter((c) => c.instructorId === this.user.id);
            this.groupedCourses.set(this.groupByCategory(my));
            this.loading.set(false);
          } else {
            const enrollments = data.enrollments || [];
            const enrolledIds = new Set(enrollments.map((e) => e.courseId));
            const my = all.filter((c) => enrolledIds.has(c.id));
            this.groupedCourses.set(this.groupByCategory(my));
            this.loading.set(false);
          }
        } else {
          this.loading.set(false);
        }
      }
      // Enrollment değişince sadece enrollments'ı yeniden al (öğrenci ise)
      refetchEnrollments() {
        if (!this.user || this.user.role !== "student")
          return;
        this.api.list("enrollments", { userId: this.user.id }).subscribe((enrolls) => {
          const enrolledCourseIds = new Set(enrolls.map((e) => e.courseId));
          const my = this.allCourses().filter((c) => enrolledCourseIds.has(c.id));
          this.groupedCourses.set(this.groupByCategory(my));
        });
      }
      recomputeStudentGrouping() {
        this.refetchEnrollments();
      }
      ngOnDestroy() {
      }
      groupByCategory(list) {
        const map = {};
        for (const c of list) {
          map[c.categoryId] = map[c.categoryId] || [];
          map[c.categoryId].push(c);
        }
        return map;
      }
      applyUser(u, late) {
        let updated = u;
        if (!u.role) {
          updated = __spreadProps(__spreadValues({}, u), { role: "student" });
          localStorage.setItem("currentUser", JSON.stringify(updated));
          this.auth.currentUser.set(updated);
        }
        this.user = updated;
        this.profilePhoto = updated.profilePhoto || this.profilePhoto;
        if (this.allCourses().length) {
          if (updated.role === "instructor") {
            const my = this.allCourses().filter((c) => c.instructorId === updated.id);
            this.groupedCourses.set(this.groupByCategory(my));
          } else {
            this.refetchEnrollments();
          }
          this.loading.set(false);
        }
      }
    };
    Profile = __decorate([
      Component({
        selector: "app-profile",
        imports: [BackgroundItem, CommonModule, RouterModule],
        template: profile_default,
        styles: [profile_default2]
      })
    ], Profile);
  }
});

// src/app/pages/profile/profile.spec.ts
var require_profile_spec = __commonJS({
  "src/app/pages/profile/profile.spec.ts"(exports) {
    init_testing();
    init_profile3();
    init_test_setup();
    describe("Profile", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Profile],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(Profile);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_profile_spec();
//# sourceMappingURL=spec-profile.spec.js.map
