import {
  Api,
  init_api
} from "./chunk-3TNOYCZS.js";
import {
  Injectable,
  __decorate,
  __esm,
  computed,
  forkJoin,
  init_core,
  init_esm,
  init_operators,
  init_tslib_es6,
  inject,
  map,
  of,
  signal
} from "./chunk-Q7SCI6EH.js";

// src/app/services/search.service.ts
var SearchService;
var init_search_service = __esm({
  "src/app/services/search.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_api();
    init_esm();
    init_operators();
    SearchService = class SearchService2 {
      api = inject(Api);
      cache = /* @__PURE__ */ new Map();
      loading = signal(false);
      loadingState = computed(() => this.loading());
      search(query) {
        const q = query.trim().toLowerCase();
        if (!q)
          return of([]);
        if (this.cache.has(q)) {
          return of(this.cache.get(q));
        }
        this.loading.set(true);
        return forkJoin({
          courses: this.api.list("courses"),
          users: this.api.list("users"),
          lessons: this.api.list("lessons"),
          comments: this.api.list("comments")
        }).pipe(map(({ courses, users, lessons, comments }) => {
          const results = [];
          for (const c of courses) {
            if ([c.title, c.description, c.instructorName].some((f) => typeof f === "string" && f.toLowerCase().includes(q))) {
              results.push({ type: "course", id: c.id, title: c.title, subtitle: c.instructorName, relatedCourseId: c.id });
            }
          }
          for (const u of users) {
            const full = [u.name, u.surname, u.email].filter(Boolean).join(" ");
            if (full.toLowerCase().includes(q)) {
              results.push({ type: "user", id: u.id, title: full, subtitle: u.role || "kullan\u0131c\u0131" });
            }
          }
          for (const l of lessons) {
            if (l.title?.toLowerCase().includes(q)) {
              results.push({ type: "lesson", id: l.id, title: l.title, relatedCourseId: l.courseId });
            }
          }
          for (const cm of comments) {
            if (cm.text?.toLowerCase().includes(q)) {
              results.push({ type: "comment", id: cm.id, title: cm.text.slice(0, 60) + (cm.text.length > 60 ? "\u2026" : ""), relatedCourseId: cm.courseId });
            }
          }
          results.sort((a, b) => {
            const weight = { course: 0, lesson: 1, comment: 2, user: 3 };
            const oa = weight[a.type];
            const ob = weight[b.type];
            if (oa !== ob)
              return oa - ob;
            return a.title.localeCompare(b.title);
          });
          this.cache.set(q, results);
          this.loading.set(false);
          return results;
        }));
      }
    };
    SearchService = __decorate([
      Injectable({ providedIn: "root" })
    ], SearchService);
  }
});

export {
  SearchService,
  init_search_service
};
//# sourceMappingURL=chunk-Q7UHU2WF.js.map
