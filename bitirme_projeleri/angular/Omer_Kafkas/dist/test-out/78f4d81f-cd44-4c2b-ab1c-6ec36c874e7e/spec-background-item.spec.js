import {
  BackgroundItem,
  init_background_item
} from "./chunk-5PCVAUYP.js";
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

// src/app/components/background-item/background-item.spec.ts
var require_background_item_spec = __commonJS({
  "src/app/components/background-item/background-item.spec.ts"(exports) {
    init_testing();
    init_background_item();
    init_test_setup();
    describe("BackgroundItem", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [BackgroundItem],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(BackgroundItem);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_background_item_spec();
//# sourceMappingURL=spec-background-item.spec.js.map
