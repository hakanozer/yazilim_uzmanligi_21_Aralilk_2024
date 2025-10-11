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
  __objRest,
  init_common,
  init_core,
  init_testing,
  init_tslib_es6,
  inject,
  signal
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\pages\register\register.html
var register_default;
var init_register = __esm({
  "angular:jit:template:src\\app\\pages\\register\\register.html"() {
    register_default = `<app-background-item></app-background-item>\r
\r
<div class="register-wrapper">\r
  <form class="register-card" [formGroup]="form" (ngSubmit)="onSubmit()">\r
    <h2>Kay\u0131t Ol</h2>\r
\r
    <div class="field">\r
      <label for="name">Ad</label>\r
      <input id="name" type="text" formControlName="name" />\r
    </div>\r
    <div class="field">\r
      <label for="surname">Soyad</label>\r
      <input id="surname" type="text" formControlName="surname" />\r
    </div>\r
    <div class="field">\r
      <label for="email">E-Posta</label>\r
      <input id="email" type="email" formControlName="email" />\r
    </div>\r
    <div class="field">\r
      <label for="password">Parola</label>\r
      <input id="password" type="password" formControlName="password" />\r
    </div>\r
    <div class="field">\r
      <label for="passwordAgain">Tekrar Parola</label>\r
      <input id="passwordAgain" type="password" formControlName="passwordAgain" />\r
    </div>\r
\r
    <div>\r
      <div class="profile-photo-list" style="display: flex; gap: 12px">\r
          <ng-container *ngFor="let photo of photoList">\r
          <img\r
            [src]="photo"\r
            (click)="selectPhoto(photo)"\r
            [class.selected]="photo === selectedPhoto"\r
            style="\r
              width: 40px;\r
              height: 40px;\r
              border-radius: 50%;\r
              object-fit: cover;\r
              cursor: pointer;\r
              border: 2px solid transparent;\r
            "\r
            [style.border-color]="photo === selectedPhoto ? '#007bff' : 'transparent'"\r
            alt="Profil Foto\u011Fraf\u0131"\r
          />\r
        </ng-container>\r
      </div>\r
    </div>\r
\r
    <div class="field">\r
      <label>Kullan\u0131c\u0131 Rol\xFC</label>\r
      <div class="role-cards">\r
        <label class="role-card" [class.active]="form.get('role')?.value==='student'">\r
          <input type="radio" formControlName="role" value="student" />\r
          <span class="role-title">\xD6\u011Frenci</span>\r
          <span class="role-desc">Kurs sat\u0131n al ve \xF6\u011Frenmeye ba\u015Fla</span>\r
        </label>\r
        <label class="role-card" [class.active]="form.get('role')?.value==='instructor'">\r
          <input type="radio" formControlName="role" value="instructor" />\r
          <span class="role-title">E\u011Fitici</span>\r
          <span class="role-desc">Kendi kurslar\u0131n\u0131 olu\u015Ftur ve y\xF6net</span>\r
        </label>\r
      </div>\r
      <div class="text-danger small mt-1" *ngIf="form.get('role')?.invalid && form.get('role')?.touched">Rol se\xE7imi zorunludur.</div>\r
    </div>\r
\r
    <button class="submit" type="submit" [disabled]="submitting || form.invalid">\r
        {{ submitting ? 'Kay\u0131t Olunuyor...' : 'Kay\u0131t Ol' }}\r
    </button>\r
    <p class="text-center mt-2">Daha \xF6nce kay\u0131t olmu\u015Fmuydunuz?</p>\r
    <a class="login-btn text-center" (click)="navigateToLogin()">Giri\u015F Yap</a>\r
  </form>\r
</div>\r
`;
  }
});

// angular:jit:style:src\app\pages\register\register.css
var register_default2;
var init_register2 = __esm({
  "angular:jit:style:src\\app\\pages\\register\\register.css"() {
    register_default2 = "/* src/app/pages/register/register.css */\n.register-wrapper {\n  position: relative;\n  min-height: calc(100vh - 56px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n  z-index: 0;\n}\n.register-card {\n  width: 100%;\n  max-width: 340px;\n  background: rgba(255, 255, 255, 0.85);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  padding: 1.75rem 1.5rem 1.5rem;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, .25);\n  display: flex;\n  flex-direction: column;\n  gap: 1.1rem;\n}\n.register-card.title {\n  margin: 0 0 .5rem;\n  font-size: 1.35rem;\n  font-weight: 600;\n  text-align: center;\n  color: #1b1f29;\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: .4rem;\n}\n.field label {\n  font-size: .75rem;\n  font-weight: 600;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n  color: #374151;\n}\n.field input {\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  padding: .55rem .75rem;\n  font-size: .85rem;\n  background: #fff;\n  outline: none;\n  transition: border-color .15s, box-shadow .15s;\n}\n.field input:focus {\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, .15);\n}\n.field input.invalid {\n  border-color: #dc2626;\n}\n.error {\n  font-size: .65rem;\n  color: #b91c1c;\n  line-height: 1.1;\n}\n.submit {\n  appearance: none;\n  border: none;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb,\n      #1d4ed8);\n  color: #fff;\n  font-size: .8rem;\n  font-weight: 600;\n  padding: .65rem .75rem;\n  cursor: pointer;\n  transition: background .2s, transform .15s;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n}\n.submit:disabled {\n  opacity: .6;\n  cursor: not-allowed;\n}\n.submit:not(:disabled):hover {\n  background:\n    linear-gradient(\n      135deg,\n      #1d4ed8,\n      #1e40af);\n}\n.submit:not(:disabled):active {\n  transform: translateY(1px);\n}\n.role-cards {\n  display: flex;\n  gap: .75rem;\n}\n.role-card {\n  position: relative;\n  flex: 1;\n  border: 1px solid #cbd5e1;\n  border-radius: 12px;\n  padding: .75rem .65rem .6rem;\n  background: #fff;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  gap: .3rem;\n  transition:\n    border-color .15s,\n    box-shadow .15s,\n    background .2s;\n  font-size: .7rem;\n}\n.role-card:hover {\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, .12);\n}\n.role-card.active {\n  border-color: #1d4ed8;\n  background:\n    linear-gradient(\n      135deg,\n      #eff6ff,\n      #dbeafe);\n  box-shadow: 0 0 0 3px rgba(37, 99, 235, .25);\n}\n.role-card input {\n  position: absolute;\n  opacity: 0;\n  inset: 0;\n  cursor: pointer;\n}\n.role-card .role-title {\n  font-size: .8rem;\n  font-weight: 600;\n  letter-spacing: .5px;\n}\n.role-card .role-desc {\n  font-size: .6rem;\n  line-height: 1.1;\n  color: #475569;\n}\n@media (max-width: 420px) {\n  .login-card {\n    max-width: 100%;\n    padding: 1.25rem 1rem 1rem;\n  }\n  .login-card .title {\n    font-size: 1.2rem;\n  }\n}\n/*# sourceMappingURL=register.css.map */\n";
  }
});

// src/app/pages/register/register.ts
var Register;
var init_register3 = __esm({
  "src/app/pages/register/register.ts"() {
    "use strict";
    init_tslib_es6();
    init_register();
    init_register2();
    init_core();
    init_router();
    init_background_item();
    init_forms();
    init_common();
    init_auth_service();
    Register = class Register2 {
      photo;
      navigateToLogin() {
        this.router.navigateByUrl("/login");
      }
      submitting = false;
      auth = inject(AuthService);
      router = inject(Router);
      onSubmit() {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
          return;
        }
        this.submitting = true;
        const { name, surname, email, password, role } = this.form.value;
        const profilePhoto = this.selectedPhoto || this.photoList[0] || "";
        this.auth.register({ name, surname, email, password, profilePhoto, role }).subscribe({
          next: (user) => {
            this.submitting = false;
            const _a = user, { password: _pw } = _a, safe = __objRest(_a, ["password"]);
            localStorage.setItem("currentUser", JSON.stringify(safe));
            this.auth.currentUser.set(safe);
            this.router.navigateByUrl("/");
          },
          error: () => {
            this.submitting = false;
            alert("Kay\u0131t ba\u015Far\u0131s\u0131z");
          }
        });
      }
      fb = inject(FormBuilder);
      // Formu signal ile sarmala
      formSignal = signal(this.fb.group({
        name: ["", Validators.required],
        surname: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        passwordAgain: ["", Validators.required],
        role: ["student", Validators.required]
      }, {
        validators: (group) => {
          const password = group.get("password")?.value;
          const passwordAgain = group.get("passwordAgain")?.value;
          return password === passwordAgain ? null : { passwordMismatch: true };
        }
      }));
      get form() {
        return this.formSignal();
      }
      photoList = [
        "assets/profile-photo/1.png",
        "assets/profile-photo/2.png",
        "assets/profile-photo/3.png",
        "assets/profile-photo/4.png",
        "assets/profile-photo/5.png",
        "assets/profile-photo/6.png"
      ];
      selectedPhoto = "";
      selectPhoto(photo) {
        this.selectedPhoto = photo;
      }
    };
    Register = __decorate([
      Component({
        selector: "app-register",
        imports: [CommonModule, ReactiveFormsModule, BackgroundItem],
        template: register_default,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [register_default2]
      })
    ], Register);
  }
});

// src/app/pages/register/register.spec.ts
var require_register_spec = __commonJS({
  "src/app/pages/register/register.spec.ts"(exports) {
    init_testing();
    init_register3();
    init_test_setup();
    describe("Register", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Register],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(Register);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_register_spec();
//# sourceMappingURL=spec-register.spec.js.map
