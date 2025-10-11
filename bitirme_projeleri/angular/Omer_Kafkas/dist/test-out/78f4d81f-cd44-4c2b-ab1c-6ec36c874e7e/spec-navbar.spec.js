import {
  Navbar,
  init_navbar
} from "./chunk-NQJYBHDO.js";
import "./chunk-XDF3BTPI.js";
import "./chunk-VHMFWLLS.js";
import "./chunk-2N6RUHDQ.js";
import "./chunk-5RMG6BQX.js";
import "./chunk-4JIKCAJV.js";
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

// src/app/components/navbar/navbar.spec.ts
var require_navbar_spec = __commonJS({
  "src/app/components/navbar/navbar.spec.ts"(exports) {
    init_testing();
    init_navbar();
    init_test_setup();
    describe("Navbar", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Navbar],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(Navbar);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_navbar_spec();
//# sourceMappingURL=spec-navbar.spec.js.map
