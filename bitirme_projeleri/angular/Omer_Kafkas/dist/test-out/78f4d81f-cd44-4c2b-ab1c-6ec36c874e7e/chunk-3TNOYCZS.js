import {
  environment,
  init_environment
} from "./chunk-QJ3D6P2L.js";
import {
  HttpClient,
  HttpParams,
  init_http
} from "./chunk-WQZ4RALM.js";
import {
  Injectable,
  __decorate,
  __esm,
  catchError,
  init_core,
  init_esm,
  init_tslib_es6,
  inject,
  throwError
} from "./chunk-Q7SCI6EH.js";

// src/app/api.ts
var Api;
var init_api = __esm({
  "src/app/api.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_environment();
    init_http();
    init_esm();
    Api = class Api2 {
      http = inject(HttpClient);
      // Merkezî base URL (gerekirse environment'a taşınabilir)
      baseUrl = environment.apiBaseUrl;
      // Yardımcı: path'i tam URL'ye çevir
      url(path) {
        if (!path)
          return this.baseUrl;
        return path.startsWith("http") ? path : `${this.baseUrl}/${path.replace(/^\//, "")}`;
      }
      // Yardımcı: object -> HttpParams
      toParams(params) {
        if (!params)
          return void 0;
        let hp = new HttpParams();
        Object.entries(params).forEach(([k, v]) => {
          if (v === null || v === void 0 || v === "")
            return;
          hp = hp.set(k, String(v));
        });
        return hp;
      }
      get(path, params) {
        return this.http.get(this.url(path), { params: this.toParams(params) }).pipe(catchError(this.handle));
      }
      list(resource, params) {
        return this.get(resource, params);
      }
      post(path, body) {
        return this.http.post(this.url(path), body).pipe(catchError(this.handle));
      }
      put(path, body) {
        return this.http.put(this.url(path), body).pipe(catchError(this.handle));
      }
      patch(path, body) {
        return this.http.patch(this.url(path), body).pipe(catchError(this.handle));
      }
      delete(path) {
        return this.http.delete(this.url(path)).pipe(catchError(this.handle));
      }
      // Kaynak (collection) builder: api.collection('users').create({...}) gibi kullanım sağlar
      collection(resource) {
        const base = resource.replace(/\/$/, "");
        return {
          all: (params) => this.list(base, params),
          get: (id) => this.get(`${base}/${id}`),
          create: (body) => this.post(base, body),
          update: (id, body) => this.put(`${base}/${id}`, body),
          patch: (id, body) => this.patch(`${base}/${id}`, body),
          remove: (id) => this.delete(`${base}/${id}`)
        };
      }
      handle = (err) => {
        return throwError(() => err);
      };
    };
    Api = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], Api);
  }
});

export {
  Api,
  init_api
};
//# sourceMappingURL=chunk-3TNOYCZS.js.map
