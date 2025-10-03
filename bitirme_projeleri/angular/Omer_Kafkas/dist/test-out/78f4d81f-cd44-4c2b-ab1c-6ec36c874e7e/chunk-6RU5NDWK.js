import {
  init_router,
  provideRouter
} from "./chunk-T7BXRBBD.js";
import {
  init_http,
  provideHttpClient,
  withFetch
} from "./chunk-WQZ4RALM.js";
import {
  __esm,
  init_core,
  provideZonelessChangeDetection
} from "./chunk-Q7SCI6EH.js";

// src/test-setup.ts
var globalTestConfig;
var init_test_setup = __esm({
  "src/test-setup.ts"() {
    "use strict";
    init_http();
    init_core();
    init_router();
    globalTestConfig = {
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withFetch()),
        provideRouter([])
      ]
    };
  }
});

export {
  globalTestConfig,
  init_test_setup
};
//# sourceMappingURL=chunk-6RU5NDWK.js.map
