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
    globalTestConfig = {
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withFetch())
      ]
    };
  }
});

export {
  globalTestConfig,
  init_test_setup
};
//# sourceMappingURL=chunk-7TW6I64K.js.map
