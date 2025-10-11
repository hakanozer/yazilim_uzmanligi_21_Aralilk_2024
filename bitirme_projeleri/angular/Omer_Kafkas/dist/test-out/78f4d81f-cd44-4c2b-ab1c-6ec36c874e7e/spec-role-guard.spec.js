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

// src/app/auth/role-guard.spec.ts
init_testing();

// src/app/auth/role-guard.ts
init_router();
init_core();
var roleGuard = (route) => {
  const router = inject(Router);
  const raw = typeof window !== "undefined" ? localStorage.getItem("currentUser") : null;
  const user = raw ? JSON.parse(raw) : null;
  if (!user) {
    router.navigate(["/login"]);
    return false;
  }
  const expected = route.data?.["roles"] || [];
  if (expected.length && !expected.includes(user.role)) {
    router.navigate(["/"]);
    return false;
  }
  return true;
};

// src/app/auth/role-guard.spec.ts
init_test_setup();
describe("roleGuard", () => {
  const executeGuard = (...guardParameters) => TestBed.runInInjectionContext(() => roleGuard(...guardParameters));
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...globalTestConfig.providers]
    });
  });
  it("should be created", () => {
    expect(executeGuard).toBeTruthy();
  });
});
//# sourceMappingURL=spec-role-guard.spec.js.map
