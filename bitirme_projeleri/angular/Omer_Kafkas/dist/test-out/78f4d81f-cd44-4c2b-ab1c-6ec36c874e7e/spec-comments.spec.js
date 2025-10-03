import {
  globalTestConfig,
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
  init_tslib_es6
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\components\comments\comments.html
var comments_default;
var init_comments = __esm({
  "angular:jit:template:src\\app\\components\\comments\\comments.html"() {
    comments_default = "<p>comments works!</p>\r\n";
  }
});

// angular:jit:style:src\app\components\comments\comments.css
var comments_default2;
var init_comments2 = __esm({
  "angular:jit:style:src\\app\\components\\comments\\comments.css"() {
    comments_default2 = "/* src/app/components/comments/comments.css */\n/*# sourceMappingURL=comments.css.map */\n";
  }
});

// src/app/components/comments/comments.ts
var Comments;
var init_comments3 = __esm({
  "src/app/components/comments/comments.ts"() {
    "use strict";
    init_tslib_es6();
    init_comments();
    init_comments2();
    init_core();
    Comments = class Comments2 {
    };
    Comments = __decorate([
      Component({
        selector: "app-comments",
        imports: [],
        template: comments_default,
        styles: [comments_default2]
      })
    ], Comments);
  }
});

// src/app/components/comments/comments.spec.ts
var require_comments_spec = __commonJS({
  "src/app/components/comments/comments.spec.ts"(exports) {
    init_testing();
    init_comments3();
    init_test_setup();
    describe("Comments", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Comments],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(Comments);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_comments_spec();
//# sourceMappingURL=spec-comments.spec.js.map
