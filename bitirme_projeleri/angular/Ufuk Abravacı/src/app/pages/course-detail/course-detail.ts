import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewEncapsulation,
  OnInit,
  computed,
} from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CourseWithLessons } from "../../models/CourseWithLessons";
import { PublicUser } from "../../models/User";
import { CourseService } from "../../services/course-service";
import { UserService } from "../../services/user-service";
import { Navbar } from "../../components/navbar/navbar";
import { EnrollmentService } from "../../services/enrollment-service";
import { AuthService } from "../../services/auth-service";
import { CommonModule } from "@angular/common";
import { Comments } from "../../components/comments/comments";

@Component({
  selector: "app-course-detail",
  standalone: true,
  imports: [RouterLink, Navbar, CommonModule, Comments],
  templateUrl: "./course-detail.html",
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetail implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly courseService = inject(CourseService);
  readonly userService = inject(UserService);
  readonly enrollmentService = inject(EnrollmentService);
  readonly auth = inject(AuthService);
  readonly course = signal<CourseWithLessons | null>(null);
  readonly instructor = signal<PublicUser | null>(null);
  readonly loading = signal(false);
  readonly isEnrolling = signal(false); //kayıt olma sırasında buton deaktivasyonu için
  readonly isEnrolled = signal(false); // kullanıcı bu kursa kayıt oldu mu?
  readonly error = signal<string | null>(null);
  readonly lessonsCount = computed(() => this.course()?.lessons?.length ?? 0);
  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get("id"));
    if (!courseId) {
      this.error.set("Geçersiz kurs id");
      return;
    }

    this.loadCourse(courseId);
    const user = this.auth.user();
    if (user) {
      this.enrollmentService.isEnrolled(user.id, courseId).subscribe({ // kurs sahiib değilse backendden check ediyoruz
        next: (enrolled: boolean) => this.isEnrolled.set(enrolled),
        error: () => this.isEnrolled.set(false),
      });
    }
  }

  private loadCourse(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.courseService.getCourseByIdWithLessons(id).subscribe({
      //kursu idden dersleri ile birlikte getir.
      next: (c) => {
        this.course.set(c);
        this.loading.set(false);

        // Instructorı da getiriyoruz.
        if (c.instructorId) {
          this.loadInstructor(c.instructorId);
        } else {
          this.instructor.set(null);
        }
      },
      error: () => {
        this.error.set("Kurs yüklenemedi");
        this.loading.set(false);
      },
    });
  }

  private loadInstructor(id: number) {
    this.userService.getPublicUserById(id).subscribe({
      next: (u) => this.instructor.set(u),
      error: () => this.instructor.set(null), // backend bulamazsa null
    });
  }

  enroll() {
    if (!this.course() || !this.auth.user()) return;

    this.isEnrolling.set(true);
    const dto = {
      userId: this.auth.user()!.id,
      courseId: this.course()!.id,
    };
    this.enrollmentService.createEnrollment(dto).subscribe({
      next: () => {
        this.isEnrolling.set(false);
        this.isEnrolled.set(true); //artık enroll oldu. Dersleri izleyebilir.
      },
      error: () => {
        this.isEnrolling.set(false);
        this.error.set("Kursa kayıt olunurken hata oluştu");
      },
    });
  }
}
