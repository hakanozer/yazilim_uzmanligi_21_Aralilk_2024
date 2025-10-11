import {
  Router,
  globalTestConfig,
  init_router,
  init_test_setup
} from "./chunk-JRICTGO3.js";
import {
  TestBed,
  init_core,
  init_testing,
  inject
} from "./chunk-534ETNV2.js";

// src/app/guards/not-auth-guard.spec.ts
init_testing();

// src/app/guards/not-auth-guard.ts
init_router();
init_core();
var notAuthGuard = () => {
  const router = inject(Router);
  const raw = typeof window !== "undefined" ? localStorage.getItem("currentUser") : null;
  if (raw) {
    router.navigate(["/"]);
    return false;
  }
  return true;
};

// src/app/guards/not-auth-guard.spec.ts
init_test_setup();
describe("notAuthGuard", () => {
  const executeGuard = (...guardParameters) => TestBed.runInInjectionContext(() => notAuthGuard(...guardParameters));
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...globalTestConfig.providers]
    });
  });
  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });
});
//# sourceMappingURL=spec-not-auth-guard.spec.js.map
