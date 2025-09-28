import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";

import { Navbar } from "../../components/navbar/navbar";
import { CourseService } from "../../services/course-service";
import { LessonService } from "../../services/lesson-service";
import { AuthService } from "../../services/auth-service";

import { Course, CourseCreateDTO } from "../../models/Course";
import { Lesson, LessonCreateDTO } from "../../models/Lesson";
import { EnrollmentService } from "../../services/enrollment-service";

@Component({
  selector: "app-course-form",
  standalone: true,
  imports: [Navbar, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: "./course-form.html",
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//Bu formda düzenleme(edit) gibi ekstra kontrol isteyen yapılar olduğu için login/register gibi template driven forms kullanmadım.
//Özellikle edit kısmında kursun/dersin bir kopyasını oluşturup, onun üzerinde canlı değişiklikleri tutup, sonrasında değişiklikleri
//kayıt işlemi gerçekleşince gerçek nesnelere uygulamam gerekiyordu. Yoksa yaptığım değişiklikler daha onaylamadan
//gerçek dersi/kursu etkiliyordu. Zaten hem kurslar hem de lessonlarla aynı componentte uğraştığım için
//component kopyalarla vs çok şişti ve karmaşıklaştı. Bu sebeple componenti REACTIVE-FORMS ile yazdım. Çok daha iyi yönetilebilir oldu.
//Validasyonlar da daha şık ve görmesi daha kolay oldu. Template içinde validasyonları bulması zor olabiliyordu.
export class CourseForm implements OnInit {
  // Services
  readonly courseService = inject(CourseService);
  readonly lessonService = inject(LessonService);
  readonly enrollmentService = inject(EnrollmentService)
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly auth = inject(AuthService);
  readonly fb = inject(FormBuilder); //reactive form nesnesi
  readonly mode = signal<"create" | "edit">("create"); // formun create mi edit mi modunda olacağını belirleyen signal
  readonly courseId = signal<number | null>(null); //editteki kursun idsi
  readonly error = signal<string | null>(null);
  readonly lessons = signal<Lesson[]>([]);
  readonly editingLessonId = signal<number | null>(null); //o an edit yapılan lessonid'si ona göre edit formu açılacak.
  // isLoading benzeri yapılar. Bunlara göre butonları devre dışı bırakıp üst üste tıklamayı engelleyeceğiz.
  readonly isSavingCourse = signal(false);
  readonly isCreatingLesson = signal(false);
  readonly isUpdatingLesson = signal(false);
  readonly deletingLessonId = signal<number | null>(null);

  private readonly urlPattern = /^https?:\/\/.+/i; //url'i kontrol etmek için validasyon regexi

  // Reactive Forms
  readonly courseForm = this.fb.nonNullable.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    category: ["", Validators.required],
    imageUrl: ["", [Validators.required, Validators.pattern(this.urlPattern)]],
    instructorId: [this.auth.user()!.id, Validators.required],
  });

  readonly lessonCreateForm = this.fb.nonNullable.group({
    title: ["", Validators.required],
    videoUrl: ["", [Validators.required, Validators.pattern(this.urlPattern)]],
    duration: ["", [Validators.required]], //duration için ek validasyonlar da yapılabilir.
  });

  readonly lessonEditForm = this.fb.nonNullable.group({
    title: ["", Validators.required],
    videoUrl: ["", [Validators.required, Validators.pattern(this.urlPattern)]],
    duration: ["", [Validators.required]],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id"); //id'yi routedan çekiyoruz. Snapshot bu sayfa için yeterli.
    if (idParam) { //url'de id varsa yani edit yapıyorsak
      this.mode.set("edit");
      this.courseId.set(Number(idParam));

      // Kurs verisini yükle
      this.courseService.getCourseById(this.courseId()!).subscribe({
        next: (c: Course) => {
          this.courseForm.patchValue({ //apiden gelen verileri formun içine yerleştiriyoruz.
            title: c.title,
            description: c.description,
            category: c.category,
            imageUrl: c.imageUrl,
            instructorId: c.instructorId,
          });
        },
        error: () => this.error.set("❌ Kurs bilgileri yüklenemedi."),
      });

      // Kursa ait dersleri yükle
      this.lessonService.getLessonByCourse(this.courseId()!).subscribe({
        next: (ls) => this.lessons.set(ls),
        error: () => this.error.set("❌ Dersler yüklenemedi."),
      });
    }
  }

  // Create/Update formu onaylandığında
  onSubmit(): void {
    if (this.courseForm.invalid) return; //invalidse hiç bir şey yapma
    this.error.set(null);
    this.isSavingCourse.set(true);

    const dto: CourseCreateDTO = this.courseForm.getRawValue();//Formdaki verileri alıyoruz.

    if (this.mode() === "create") {
      this.courseService.createCourse(dto).subscribe({
        next: (createdCourse) => {
        // Kurs oluşturulduktan sonra otomatik kurs sahibi kursa enroll olmuş oluyor
        this.enrollmentService.createEnrollment({
          userId: createdCourse.instructorId,
          courseId: createdCourse.id
        }).subscribe(); //hata yakalama işlemi ile uğraşmadım.

        this.router.navigate(["/instructor"]);
      },
        error: () => {
          this.error.set("❌ Course creation failed!");
          this.isSavingCourse.set(false);
        },
        complete: () => this.isSavingCourse.set(false),
      });
    } else if (this.mode() === "edit" && this.courseId()) {
      this.courseService.updateCourse(this.courseId()!, dto).subscribe({
        next: () => this.router.navigate(["/instructor"]),
        error: () => {
          this.error.set("❌ Course update failed!");
          this.isSavingCourse.set(false);
        },
        complete: () => this.isSavingCourse.set(false),
      });
    }
  }

  // Lessons
  addLesson(): void {
    if (this.mode() !== "edit" || !this.courseId()) {
      this.error.set("Önce kursu oluşturmalısınız.");
      return;
    }
    if (this.lessonCreateForm.invalid) return;

    this.error.set(null);
    this.isCreatingLesson.set(true);

    const dto: LessonCreateDTO = {//verileri ve courseId'nin alıyoruz
      ...this.lessonCreateForm.getRawValue(),
      courseId: this.courseId()!,
    };

    this.lessonService.createLesson(dto).subscribe({
      next: (newLesson) => {
        this.lessons.update((list) => [...list, newLesson]);
        this.lessonCreateForm.reset(); //dersi kursa ekleyip lessonformunu resetledik.
      },
      error: () => this.error.set("❌ Ders oluşturulamadı."),
      complete: () => this.isCreatingLesson.set(false),
    });
  }

  editLesson(lesson: Lesson): void {
    //editingLessonId() === lesson.id html'de döngüde şu şartı sağlayan lessonda edit formu açılacak.
    this.editingLessonId.set(lesson.id);
    this.lessonEditForm.reset({ //form resetlencek. Yeni değerleri alma ve kaydetme işi saveLesson metodunda yapılıyor.
      title: lesson.title,       //bu sadece edit butonuna tıklandığında formu açmak için var.
      videoUrl: lesson.videoUrl,
      duration: lesson.duration,
    });
  }

  cancelEditLesson(): void { 
    //edit yaparken iptal edebiliyoruz. Yaptığımız değişiklikler dersi etkilemeden iptal edebiliyoruz.
    //Reactive form kullanmamın sebebi buydu. reactive-form değişiklikleri kendi içinde saklar orijinal dersi değiştirmez.
    //ancak onay verildiği zaman orijinal dersi etkiler.
    this.editingLessonId.set(null);
    this.lessonEditForm.reset();
  }

  saveLesson(): void { //editteki değişiklikleri onaylayacağımız metot.
    const id = this.editingLessonId();
    if (!id) return; //editlenen ders yoksa bir şey yapma
    if (this.lessonEditForm.invalid) return; //form invalidse bir şey yapma

    this.error.set(null);
    this.isUpdatingLesson.set(true); //butonu disable etmek için

    // updateLesson dto'sunda courseId istendiği için mevcut lessonu alıyoruz. Sonra bunun içinde courseId'yi alcaz.
    const current = this.lessons().find((l) => l.id === id);
    if (!current) {
      this.error.set("Ders bulunamadı.");
      this.isUpdatingLesson.set(false);
      return;
    }

    const dto: LessonCreateDTO = {
      courseId: current.courseId,
      ...this.lessonEditForm.getRawValue(),
    };

    this.lessonService.updateLesson(id, dto).subscribe({
      next: (saved) => {
        this.lessons.update((list) =>
          //eğer lessonId'si backendden dönen(saved) id ise saved lessonu al, diğerlerinde lessonu olduğu gibi al dedik.
          list.map((lesson) => (lesson.id === saved.id ? saved : lesson))
        );
        this.editingLessonId.set(null);
        this.lessonEditForm.reset();
      },
      error: () => this.error.set("❌ Ders güncellenemedi."),
      complete: () => this.isUpdatingLesson.set(false),
    });
  }

  deleteLesson(id: number): void {
    this.error.set(null);
    this.deletingLessonId.set(id);

    this.lessonService.deleteLesson(id).subscribe({
      next: () => {
        this.lessons.update((list) => list.filter((l) => l.id !== id)); //l.id olanı filtreleyip attık. diğerleri devam etti.
        if (this.editingLessonId() === id) { //silinen lessonun edit formunu da kaldırıyoruz.
          this.editingLessonId.set(null);
          this.lessonEditForm.reset();
        }
      },
      error: () => this.error.set("❌ Ders silinemedi."),
      complete: () => this.deletingLessonId.set(null),
    });
  }
}