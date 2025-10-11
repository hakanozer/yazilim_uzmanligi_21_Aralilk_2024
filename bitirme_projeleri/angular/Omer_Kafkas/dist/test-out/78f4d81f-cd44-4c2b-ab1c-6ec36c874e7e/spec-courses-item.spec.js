import {
  CoursesItem,
  init_courses_item
} from "./chunk-ZWMET5ME.js";
import {
  globalTestConfig,
  init_test_setup
} from "./chunk-JRICTGO3.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-534ETNV2.js";

// src/app/components/courses-item/courses-item.spec.ts
var require_courses_item_spec = __commonJS({
  "src/app/components/courses-item/courses-item.spec.ts"(exports) {
    init_testing();
    init_courses_item();
    init_test_setup();
    describe("CoursesItem", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CoursesItem],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(CoursesItem);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_courses_item_spec();
//# sourceMappingURL=spec-courses-item.spec.js.map
