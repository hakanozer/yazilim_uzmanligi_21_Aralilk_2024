import {
  BackgroundItem,
  init_background_item
} from "./chunk-5PCVAUYP.js";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  init_forms
} from "./chunk-XDF3BTPI.js";
import {
  AuthService,
  init_auth_service
} from "./chunk-VHMFWLLS.js";
import "./chunk-4JIKCAJV.js";
import {
  Router,
  globalTestConfig,
  init_router,
  init_test_setup
} from "./chunk-JRICTGO3.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_common,
  init_core,
  init_testing,
  init_tslib_es6,
  inject
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\pages\login\login.html
var login_default;
var init_login = __esm({
  "angular:jit:template:src\\app\\pages\\login\\login.html"() {
    login_default = `<app-background-item></app-background-item>\r
<div class="login-wrapper">\r
    <form [formGroup]="form" (ngSubmit)="submit()" class="login-card">\r
        <h2 class="title">Giri\u015F Yap</h2>\r
\r
        <div class="field">\r
            <label for="email">E-Posta</label>\r
            <input id="email" type="email" formControlName="email" [class.invalid]="form.controls.email.touched && form.controls.email.invalid">\r
            @if(form.controls.email.touched && form.controls.email.errors){\r
                <div class="error">\r
                    @if(form.controls.email.errors['required']) { Email zorunlu }\r
                    @else if(form.controls.email.errors['email']) { Ge\xE7erli bir email girin }\r
                </div>\r
            }\r
        </div>\r
\r
        <div class="field">\r
            <label for="password">\u015Eifre</label>\r
            <input id="password" type="password" formControlName="password" [class.invalid]="form.controls.password.touched && form.controls.password.invalid">\r
            @if(form.controls.password.touched && form.controls.password.errors){\r
                <div class="error">\r
                    @if(form.controls.password.errors['required']) { \u015Eifre zorunlu }\r
                    @else if(form.controls.password.errors['minlength']) { Minimum 6 karakter }\r
                </div>\r
            }\r
        </div>\r
\r
        <button class="submit" type="submit" [disabled]="submitting || form.invalid">@if(submitting){ Giri\u015F yap\u0131l\u0131yor... } @else { Giri\u015F Yap }</button>\r
        <p class="text-center mt-3">Hen\xFCz kay\u0131t olmad\u0131n\u0131z m\u0131?</p>\r
        <a class="login-btn text-center" (click)="navigateToLogin()">Kay\u0131t ol</a>\r
    </form>\r
</div>\r
\r
\r
`;
  }
});

// angular:jit:style:src\app\pages\login\login.css
var login_default2;
var init_login2 = __esm({
  "angular:jit:style:src\\app\\pages\\login\\login.css"() {
    login_default2 = "/* src/app/pages/login/login.css */\n.login-wrapper {\n  position: relative;\n  min-height: calc(100vh - 56px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n  z-index: 0;\n}\n.login-card {\n  width: 100%;\n  max-width: 340px;\n  background: rgba(255, 255, 255, 0.85);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  padding: 1.75rem 1.5rem 1.5rem;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, .25);\n  display: flex;\n  flex-direction: column;\n  gap: 1.1rem;\n}\n.login-card .title {\n  margin: 0 0 .5rem;\n  font-size: 1.35rem;\n  font-weight: 600;\n  text-align: center;\n  color: #1b1f29;\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: .4rem;\n}\n.field label {\n  font-size: .75rem;\n  font-weight: 600;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n  color: #374151;\n}\n.field input {\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  padding: .55rem .75rem;\n  font-size: .85rem;\n  background: #fff;\n  outline: none;\n  transition: border-color .15s, box-shadow .15s;\n}\n.field input:focus {\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, .15);\n}\n.field input.invalid {\n  border-color: #dc2626;\n}\n.error {\n  font-size: .65rem;\n  color: #b91c1c;\n  line-height: 1.1;\n}\n.submit {\n  appearance: none;\n  border: none;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #1d4ed8);\n  color: #fff;\n  font-size: .8rem;\n  font-weight: 600;\n  padding: .65rem .75rem;\n  cursor: pointer;\n  transition: background .2s, transform .15s;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n}\n.submit:disabled {\n  opacity: .6;\n  cursor: not-allowed;\n}\n.submit:not(:disabled):hover {\n  background:\n    linear-gradient(\n      135deg,\n      #1d4ed8,\n      #1e40af);\n}\n.submit:not(:disabled):active {\n  transform: translateY(1px);\n}\n@media (max-width: 420px) {\n  .login-card {\n    max-width: 100%;\n    padding: 1.25rem 1rem 1rem;\n  }\n  .login-card .title {\n    font-size: 1.2rem;\n  }\n}\n/*# sourceMappingURL=login.css.map */\n";
  }
});

// src/app/pages/login/login.ts
var Login;
var init_login3 = __esm({
  "src/app/pages/login/login.ts"() {
    "use strict";
    init_tslib_es6();
    init_login();
    init_login2();
    init_core();
    init_background_item();
    init_forms();
    init_common();
    init_auth_service();
    init_router();
    Login = class Login2 {
      navigateToLogin() {
        throw new Error("Method not implemented.");
      }
      fb = inject(FormBuilder);
      auth = inject(AuthService);
      // service injection context içinde
      router = inject(Router);
      form = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]]
      });
      submitting = false;
      submit() {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
        }
        this.submitting = true;
        const { email, password } = this.form.value;
        this.auth.login(email, password).subscribe((user) => {
          this.submitting = false;
          if (!user) {
            alert("Kullan\u0131c\u0131 bulunamad\u0131 veya \u015Fifre hatal\u0131");
            return;
          }
          this.router.navigate(["/"]);
        });
      }
    };
    Login = __decorate([
      Component({
        selector: "app-login",
        template: login_default,
        imports: [CommonModule, ReactiveFormsModule, BackgroundItem],
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [login_default2]
      })
    ], Login);
  }
});

// src/app/pages/login/login.spec.ts
var require_login_spec = __commonJS({
  "src/app/pages/login/login.spec.ts"(exports) {
    init_testing();
    init_login3();
    init_test_setup();
    describe("Login", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Login],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(Login);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_login_spec();
//# sourceMappingURL=spec-login.spec.js.map
