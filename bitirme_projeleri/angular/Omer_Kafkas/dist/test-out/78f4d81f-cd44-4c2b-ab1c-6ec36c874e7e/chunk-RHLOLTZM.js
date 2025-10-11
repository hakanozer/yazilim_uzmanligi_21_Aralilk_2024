import {
  environment,
  init_environment
} from "./chunk-LP4XPUXF.js";
import {
  HttpClient,
  init_http
} from "./chunk-IUNMEWOP.js";
import {
  Injectable,
  __decorate,
  __esm,
  __objRest,
  init_core,
  init_esm,
  init_tslib_es6,
  inject,
  map,
  signal
} from "./chunk-FTL7MPRH.js";

// src/app/services/auth.service.ts
var AuthService;
var init_auth_service = __esm({
  "src/app/services/auth.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_environment();
    init_http();
    init_esm();
    AuthService = class AuthService2 {
      http = inject(HttpClient);
      api = environment.apiBaseUrl;
      // localStorage destekli auth state
      currentUser = signal(this.loadUserFromStorage());
      loadUserFromStorage() {
        if (typeof window === "undefined")
          return null;
        const raw = localStorage.getItem("currentUser");
        if (!raw)
          return null;
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      }
      register(user) {
        return this.http.post(`${this.api}/users`, user);
      }
      login(email, password) {
        return this.http.get(`${this.api}/users`, { params: { email } }).pipe(map((list) => {
          const found = list.find((u) => u.password === password);
          if (found) {
            const _a = found, { password: password2 } = _a, safeUser = __objRest(_a, ["password"]);
            this.currentUser.set(safeUser);
            localStorage.setItem("currentUser", JSON.stringify(safeUser));
          } else {
            this.currentUser.set(null);
            localStorage.removeItem("currentUser");
          }
          return found ?? null;
        }));
      }
      logout() {
        this.currentUser.set(null);
        localStorage.removeItem("currentUser");
      }
    };
    AuthService = __decorate([
      Injectable({ providedIn: "root" })
    ], AuthService);
  }
});

export {
  AuthService,
  init_auth_service
};
//# sourceMappingURL=chunk-RHLOLTZM.js.map
