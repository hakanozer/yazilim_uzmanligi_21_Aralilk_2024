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
  CommonModule,
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  computed,
  init_common,
  init_core,
  init_testing,
  init_tslib_es6,
  inject,
  signal
} from "./chunk-534ETNV2.js";

// angular:jit:template:src\app\pages\edit-courses\edit-courses.html
var edit_courses_default;
var init_edit_courses = __esm({
  "angular:jit:template:src\\app\\pages\\edit-courses\\edit-courses.html"() {
    edit_courses_default = '<div class="container py-5 mt-5">\r\n	<h3 class="mb-4">Kurs Y\xF6netimi</h3>\r\n	@if(loading()){\r\n		<div class="d-flex gap-2 align-items-center text-muted"><div class="spinner-border spinner-border-sm"></div><span>Y\xFCkleniyor...</span></div>\r\n	} @else {\r\n		<div class="row g-4">\r\n			<div class="col-md-4">\r\n				<div class="d-flex justify-content-between align-items-center mb-2">\r\n					<h5 class="m-0">Kurslar\u0131m</h5>\r\n					<button class="btn btn-sm btn-primary" (click)="newCourse()">Yeni</button>\r\n				</div>\r\n				<div class="list-group small" style="max-height:420px;overflow:auto">\r\n					@for(c of filteredCourses(); track c.id){\r\n						<button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" [class.active]="selectedCourseId()===c.id" (click)="edit(c)">\r\n							<span class="text-start">\r\n								<strong class="d-block">{{ c.title }}</strong>\r\n								<small class="text-muted">\u20BA{{ c.price }} \u2022 {{ c.durationHours }} saat</small>\r\n							</span>\r\n							<span class="badge bg-secondary">{{ c.level }}</span>\r\n						</button>\r\n					}\r\n					@if(!filteredCourses().length){\r\n						<div class="list-group-item text-muted">Kurs yok</div>\r\n					}\r\n				</div>\r\n			</div>\r\n			<div class="col-md-5">\r\n				<h5 class="mb-3">Kurs Formu</h5>\r\n				<form [formGroup]="form" (ngSubmit)="save()" class="vstack gap-2">\r\n					<input type="text" class="form-control" placeholder="Ba\u015Fl\u0131k" formControlName="title" />\r\n					<textarea rows="3" class="form-control" placeholder="A\xE7\u0131klama" formControlName="description"></textarea>\r\n					<select class="form-select" formControlName="categoryId">\r\n						<option value="" disabled>Kategori se\xE7</option>\r\n						@for(cat of categories(); track cat.id){\r\n							<option [value]="cat.id">{{ cat.name }}</option>\r\n						}\r\n					</select>\r\n					<div class="d-flex gap-2">\r\n						<input type="number" class="form-control" placeholder="Fiyat" formControlName="price" />\r\n						<input type="number" class="form-control" placeholder="S\xFCre (saat)" formControlName="durationHours" />\r\n					</div>\r\n					<div class="d-flex gap-2">\r\n						<select class="form-select" formControlName="level">\r\n							<option>Ba\u015Flang\u0131\xE7</option>\r\n							<option>Orta</option>\r\n							<option>\u0130leri</option>\r\n						</select>\r\n						<input type="text" class="form-control" placeholder="Resim (opsiyonel)" formControlName="image" />\r\n					</div>\r\n					<div class="d-flex gap-2 mt-2">\r\n						<button type="submit" class="btn btn-success" [disabled]="saving()">Kaydet</button>\r\n						@if(form.value.id){\r\n							<button type="button" class="btn btn-outline-danger" (click)="remove(form.value)">Sil</button>\r\n						}\r\n					</div>\r\n				</form>\r\n			</div>\r\n			<div class="col-md-3">\r\n				<h5 class="mb-3">Ders Ekle</h5>\r\n				@if(!selectedCourse()){\r\n					<div class="alert alert-info p-2 small">\xD6nce bir kurs se\xE7 / kaydet.</div>\r\n				} @else {\r\n					<form [formGroup]="lessonForm" (ngSubmit)="addLesson()" class="vstack gap-2">\r\n						<input type="text" class="form-control" placeholder="Ders Ba\u015Fl\u0131\u011F\u0131" formControlName="title" />\r\n						<input type="number" class="form-control" placeholder="S\xFCre (dk)" formControlName="durationMin" />\r\n						<button type="submit" class="btn btn-primary btn-sm" [disabled]="addingLesson()">Ekle</button>\r\n					</form>\r\n				}\r\n			</div>\r\n		</div>\r\n	}\r\n</div>\r\n';
  }
});

// angular:jit:style:src\app\pages\edit-courses\edit-courses.css
var edit_courses_default2;
var init_edit_courses2 = __esm({
  "angular:jit:style:src\\app\\pages\\edit-courses\\edit-courses.css"() {
    edit_courses_default2 = "/* src/app/pages/edit-courses/edit-courses.css */\n/*# sourceMappingURL=edit-courses.css.map */\n";
  }
});

// src/app/pages/edit-courses/edit-courses.ts
var EditCourses;
var init_edit_courses3 = __esm({
  "src/app/pages/edit-courses/edit-courses.ts"() {
    "use strict";
    init_tslib_es6();
    init_edit_courses();
    init_edit_courses2();
    init_core();
    init_common();
    init_forms();
    init_api();
    init_auth_service();
    EditCourses = class EditCourses2 {
      api = inject(Api);
      auth = inject(AuthService);
      fb = inject(FormBuilder);
      loading = signal(true);
      saving = signal(false);
      addingLesson = signal(false);
      courses = signal([]);
      categories = signal([]);
      selectedCourseId = signal("");
      form = this.fb.group({
        id: [""],
        title: ["", Validators.required],
        description: ["", Validators.required],
        categoryId: ["", Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
        durationHours: [0, [Validators.required, Validators.min(1)]],
        level: ["Ba\u015Flang\u0131\xE7", Validators.required],
        image: [""]
      });
      lessonForm = this.fb.group({
        title: ["", Validators.required],
        durationMin: [10, [Validators.required, Validators.min(1)]]
      });
      currentUser = computed(() => this.auth.currentUser());
      instructorId = computed(() => this.currentUser()?.id || "");
      filteredCourses = computed(() => this.courses().filter((c) => c.instructorId === this.instructorId()));
      selectedCourse = computed(() => this.filteredCourses().find((c) => c.id === this.selectedCourseId()));
      constructor() {
        const user = this.auth.currentUser();
        if (!user || user.role !== "instructor") {
          return;
        }
        this.loadInitial();
      }
      loadInitial() {
        this.loading.set(true);
        this.api.list("categories").subscribe((cats) => this.categories.set(cats));
        this.api.list("courses").subscribe((all) => {
          this.courses.set(all);
          this.loading.set(false);
        });
      }
      edit(course) {
        this.form.reset({
          id: course.id,
          title: course.title,
          description: course.description,
          categoryId: course.categoryId,
          price: course.price,
          durationHours: course.durationHours,
          level: course.level || "Ba\u015Flang\u0131\xE7",
          image: course.image || ""
        });
        this.selectedCourseId.set(course.id);
      }
      newCourse() {
        this.form.reset({ id: "", title: "", description: "", categoryId: "", price: 0, durationHours: 1, level: "Ba\u015Flang\u0131\xE7", image: "" });
        this.selectedCourseId.set("");
      }
      save() {
        if (this.form.invalid || !this.instructorId()) {
          this.form.markAllAsTouched();
          return;
        }
        const v = this.form.value;
        const payload = {
          title: v.title,
          description: v.description,
          categoryId: v.categoryId,
          price: Number(v.price),
          durationHours: Number(v.durationHours),
          level: v.level,
          image: v.image,
          instructorId: this.instructorId(),
          instructorName: [this.currentUser()?.name, this.currentUser()?.surname].filter(Boolean).join(" ").trim(),
          instructorPhoto: this.currentUser()?.profilePhoto || "assets/logo.png"
        };
        this.saving.set(true);
        if (v.id) {
          this.api.put(`courses/${v.id}`, payload).subscribe((updated) => {
            const list = this.courses().map((c) => c.id === v.id ? updated : c);
            this.courses.set(list);
            this.saving.set(false);
          });
        } else {
          this.api.post("courses", payload).subscribe((created) => {
            this.courses.set([...this.courses(), created]);
            this.saving.set(false);
            this.form.patchValue({ id: created.id });
            this.selectedCourseId.set(created.id);
          });
        }
      }
      remove(course) {
        if (!confirm("Silmek istedi\u011Finize emin misiniz?"))
          return;
        this.api.delete(`courses/${course.id}`).subscribe(() => {
          this.courses.set(this.courses().filter((c) => c.id !== course.id));
          if (this.selectedCourseId() === course.id) {
            this.newCourse();
          }
        });
      }
      addLesson() {
        if (this.lessonForm.invalid || !this.selectedCourse()) {
          this.lessonForm.markAllAsTouched();
          return;
        }
        const v = this.lessonForm.value;
        const payload = { courseId: this.selectedCourseId(), title: v.title, durationMin: Number(v.durationMin) };
        this.addingLesson.set(true);
        this.api.post("lessons", payload).subscribe({
          next: () => {
            this.addingLesson.set(false);
            this.lessonForm.reset({ title: "", durationMin: 10 });
            alert("Ders eklendi");
          },
          error: () => {
            this.addingLesson.set(false);
            alert("Ders eklenemedi");
          }
        });
      }
      static ctorParameters = () => [];
    };
    EditCourses = __decorate([
      Component({
        selector: "app-edit-courses",
        imports: [CommonModule, ReactiveFormsModule],
        template: edit_courses_default,
        styles: [edit_courses_default2]
      })
    ], EditCourses);
  }
});

// src/app/pages/edit-courses/edit-courses.spec.ts
var require_edit_courses_spec = __commonJS({
  "src/app/pages/edit-courses/edit-courses.spec.ts"(exports) {
    init_testing();
    init_edit_courses3();
    init_test_setup();
    describe("EditCourses", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [EditCourses],
          providers: [...globalTestConfig.providers]
        }).compileComponents();
        fixture = TestBed.createComponent(EditCourses);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_edit_courses_spec();
//# sourceMappingURL=spec-edit-courses.spec.js.map
