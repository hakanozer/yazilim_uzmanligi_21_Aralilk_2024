import {
  RouterModule,
  init_router
} from "./chunk-JRICTGO3.js";
import {
  CommonModule,
  Component,
  Input,
  NgOptimizedImage,
  __decorate,
  __esm,
  init_common,
  init_core,
  init_tslib_es6
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\components\courses-item\courses-item.html
var courses_item_default;
var init_courses_item = __esm({
  "angular:jit:template:src\\app\\components\\courses-item\\courses-item.html"() {
    courses_item_default = `<div class="container mt-5">\r
  <div class="row">\r
    <div class="col-12 mt-5">\r
      <h2>Kurslar</h2>\r
    </div>\r
\r
    <div class="row mt-3 g-3">\r
      @for (c of courses; track c.id) {\r
      <div class="col-md-4">\r
        <div class="card h-100">\r
          <img\r
            [ngSrc]="c.image || 'assets/logo.png'"\r
            width="160"\r
            height="160"\r
            class="card-img-top"\r
            alt="{{ c.title }}"\r
            priority\r
            style="object-fit: cover; height: auto"\r
          />\r
          <div class="card-body d-flex flex-column">\r
            <h5 class="card-title">{{ c.title }}</h5>\r
            <p class="card-text text-muted">{{ c.instructorName }}</p>\r
            <p class="card-text">{{ c.description }}</p>\r
            <div class="mt-auto d-flex justify-content-between align-items-center">\r
              <strong>{{ c.price | currency : 'TRY' }}</strong>\r
              <div class="btn-group">\r
                <button\r
                  class="btn btn-primary btn-sm"\r
                  (click)="enroll(c.id)"\r
                  [disabled]="enrolling.has(c.id) || enrolled.has(c.id)"\r
                >\r
                  {{ enrolled.has(c.id) ? 'Kay\u0131t Olundu' : 'Kay\u0131t Ol' }}\r
                </button>\r
                <a class="btn btn-outline-secondary btn-sm" [routerLink]="['/courses', c.id]">Detay</a>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
      }\r
    </div>\r
  </div>\r
</div>\r
`;
  }
});

// angular:jit:style:src\app\components\courses-item\courses-item.css
var courses_item_default2;
var init_courses_item2 = __esm({
  "angular:jit:style:src\\app\\components\\courses-item\\courses-item.css"() {
    courses_item_default2 = "/* src/app/components/courses-item/courses-item.css */\n/*# sourceMappingURL=courses-item.css.map */\n";
  }
});

// src/app/components/courses-item/courses-item.ts
var CoursesItem;
var init_courses_item3 = __esm({
  "src/app/components/courses-item/courses-item.ts"() {
    "use strict";
    init_tslib_es6();
    init_courses_item();
    init_courses_item2();
    init_core();
    init_common();
    init_common();
    init_router();
    CoursesItem = class CoursesItem2 {
      courses = [];
      enrolling = /* @__PURE__ */ new Set();
      enrolled = /* @__PURE__ */ new Set();
      enroll;
      static propDecorators = {
        courses: [{ type: Input }],
        enrolling: [{ type: Input }],
        enrolled: [{ type: Input }],
        enroll: [{ type: Input }]
      };
    };
    CoursesItem = __decorate([
      Component({
        selector: "app-courses-item",
        standalone: true,
        imports: [CommonModule, NgOptimizedImage, RouterModule],
        template: courses_item_default,
        styles: [courses_item_default2]
      })
    ], CoursesItem);
  }
});

export {
  CoursesItem,
  init_courses_item3 as init_courses_item
};
//# sourceMappingURL=chunk-ZWMET5ME.js.map
