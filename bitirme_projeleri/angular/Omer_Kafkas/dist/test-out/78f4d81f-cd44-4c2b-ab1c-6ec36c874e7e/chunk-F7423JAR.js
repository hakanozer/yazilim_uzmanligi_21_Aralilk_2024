import {
  Injectable,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6,
  signal
} from "./chunk-Q7SCI6EH.js";

// src/app/services/enrollment.service.ts
var EnrollmentService;
var init_enrollment_service = __esm({
  "src/app/services/enrollment.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    EnrollmentService = class EnrollmentService2 {
      // Her başarılı enroll işleminde artan versiyon
      version = signal(0);
      notifyEnrollment() {
        this.version.update((v) => v + 1);
      }
    };
    EnrollmentService = __decorate([
      Injectable({ providedIn: "root" })
    ], EnrollmentService);
  }
});

export {
  EnrollmentService,
  init_enrollment_service
};
//# sourceMappingURL=chunk-F7423JAR.js.map
