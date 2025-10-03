import {
  EnrollmentService,
  init_enrollment_service
} from "./chunk-G7OLB6ZA.js";
import {
  BackgroundItem,
  init_background_item
} from "./chunk-5PCVAUYP.js";
import {
  CoursesItem,
  init_courses_item
} from "./chunk-ZWMET5ME.js";
import {
  Api,
  init_api
} from "./chunk-5RMG6BQX.js";
import "./chunk-4JIKCAJV.js";
import {
  ActivatedRoute,
  globalTestConfig,
  init_router,
  init_test_setup
} from "./chunk-JRICTGO3.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  computed,
  init_common,
  init_core,
  init_testing,
  init_tslib_es6,
  inject,
  signal
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\pages\courses\courses.html
var courses_default;
var init_courses = __esm({
  "angular:jit:template:src\\app\\pages\\courses\\courses.html"() {
    courses_default = '<app-background-item></app-background-item>\r\n<div class="container mt-5 pt-4">\r\n  <div class="row mb-3">\r\n    <div class="col-md-4">\r\n  <select class="form-select" (change)="selectedCategory.set($any($event.target).value)">\r\n        <option value="">T\xFCm Kategoriler</option>\r\n        @for(cat of categories; track cat.id){\r\n          <option [value]="cat.id">{{ cat.name }}</option>\r\n        }\r\n      </select>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-courses-item\r\n  [courses]="filtered()"\r\n  [enrolling]="enrolling"\r\n  [enrolled]="enrolled"\r\n  [enroll]="enroll"\r\n></app-courses-item>\r\n';
  }
});

// angular:jit:style:src\app\pages\courses\courses.css
var courses_default2;
var init_courses2 = __esm({
  "angular:jit:style:src\\app\\pages\\courses\\courses.css"() {
    courses_default2 = "/* src/app/pages/courses/courses.css */\n/*# sourceMappingURL=courses.css.map */\n";
  }
});

// src/app/pages/courses/courses.ts
var Courses;
var init_courses3 = __esm({
  "src/app/pages/courses/courses.ts"() {
    "use strict";
    init_tslib_es6();
    init_courses();
    init_courses2();
    init_core();
    init_router();
    init_api();
    init_enrollment_service();
    init_courses_item();
    init_background_item();
    init_common();
    Courses = class Courses2 {
      api = inject(Api);
      route = inject(ActivatedRoute);
      enrollmentEvents = inject(EnrollmentService);
      courses = [];
      categories = [];
      selectedCategory = signal("");
      filtered = computed(() => {
        const cat = this.selectedCategory();
        if (!cat)
          return this.courses;
        return this.courses.filter((c) => c && c.categoryId === cat);
      });
      enrolling = /* @__PURE__ */ new Set();
      enrolled = /* @__PURE__ */ new Set();
      loading = true;
      error = false;
      http;
      ngOnInit() {
        const resolved = this.route.snapshot.data["courses"];
        try {
          if (resolved) {
            this.courses = [...resolved];
          }
          this.loading = false;
        } catch {
          this.loading = false;
          this.error = true;
        }
        const userRaw = typeof window !== "undefined" ? localStorage.getItem("currentUser") : null;
        const user = userRaw ? JSON.parse(userRaw) : null;
        if (user) {
          this.api.list("enrollments?userId=" + user.id).subscribe((enrolls) => {
            for (const e of enrolls)
              this.enrolled.add(e.courseId);
          });
        }
        this.api.list("categories").subscribe((cats) => this.categories = cats);
      }
      enroll = (courseId) => {
        if (this.enrolled.has(courseId)) {
          alert("Bu kursa zaten kay\u0131tl\u0131s\u0131n\u0131z");
          return;
        }
        this.enrolling = /* @__PURE__ */ new Set([...this.enrolling, courseId]);
        const userRaw = typeof window !== "undefined" ? localStorage.getItem("currentUser") : null;
        const user = userRaw ? JSON.parse(userRaw) : null;
        if (!user)
          return;
        this.api.list("enrollments", { userId: user.id, courseId }).subscribe((existing) => {
          if (existing.length) {
            const newEnrolling = new Set(this.enrolling);
            newEnrolling.delete(courseId);
            this.enrolling = newEnrolling;
            this.enrolled = /* @__PURE__ */ new Set([...this.enrolled, courseId]);
            alert("Bu kursa zaten kay\u0131tl\u0131s\u0131n\u0131z");
            return;
          }
          const payload = { userId: user.id, courseId };
          this.api.post("enrollments", payload).subscribe({
            next: () => {
              const newEnrolling2 = new Set(this.enrolling);
              newEnrolling2.delete(courseId);
              this.enrolling = newEnrolling2;
              this.enrolled = /* @__PURE__ */ new Set([...this.enrolled, courseId]);
              this.enrollmentEvents.notifyEnrollment();
              alert("Kursa kay\u0131t yap\u0131ld\u0131");
            },
            error: () => {
              const newEnrolling3 = new Set(this.enrolling);
              newEnrolling3.delete(courseId);
              this.enrolling = newEnrolling3;
              alert("Kay\u0131t s\u0131ras\u0131nda hata olu\u015Ftu");
            }
          });
        });
      };
      // Manuel yenileme (gerekirse template'e buton eklenebilir)
      refreshCourses() {
        this.loading = true;
        this.error = false;
        this.api.list("courses").subscribe({
          next: (list) => {
            this.courses = [...list];
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.error = true;
          }
        });
      }
    };
    Courses = __decorate([
      Component({
        selector: "app-courses",
        standalone: true,
        imports: [CommonModule, BackgroundItem, CoursesItem],
        template: courses_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [courses_default2]
      })
    ], Courses);
  }
});

// src/app/pages/courses/courses.spec.ts
var require_courses_spec = __commonJS({
  "src/app/pages/courses/courses.spec.ts"(exports) {
    init_testing();
    init_courses3();
    init_test_setup();
    describe("Courses", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Courses],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(Courses);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_courses_spec();
//# sourceMappingURL=spec-courses.spec.js.map
