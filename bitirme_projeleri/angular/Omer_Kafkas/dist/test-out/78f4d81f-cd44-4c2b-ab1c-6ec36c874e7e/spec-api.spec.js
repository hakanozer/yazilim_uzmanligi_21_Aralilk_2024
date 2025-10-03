import {
  Api,
  init_api
} from "./chunk-5RMG6BQX.js";
import "./chunk-4JIKCAJV.js";
import {
  globalTestConfig,
  init_test_setup
} from "./chunk-JRICTGO3.js";
import {
  TestBed,
  init_testing
} from "./chunk-534ETNV2.js";

// src/app/api.spec.ts
init_testing();
init_api();
init_test_setup();
describe("Api", () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...globalTestConfig.providers]
    });
    service = TestBed.inject(Api);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//# sourceMappingURL=spec-api.spec.js.map
