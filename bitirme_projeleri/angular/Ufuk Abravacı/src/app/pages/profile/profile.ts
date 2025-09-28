import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { UserService } from "../../services/user-service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CourseService } from "../../services/course-service";
import { Course } from "../../models/Course";
import { PublicUser } from "../../models/User";
import { EnrollmentService } from "../../services/enrollment-service";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: "app-profile",
  imports: [RouterLink, Navbar],
  templateUrl: "./profile.html",
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly userService = inject(UserService);
  readonly courseService = inject(CourseService);
  readonly enrollmentService = inject(EnrollmentService);
  readonly user = signal<PublicUser | null>(null);
  readonly courses = signal<Course[]>([]);
  readonly total = signal(0);
  readonly page = signal(1);
  readonly limit = signal(6);
  readonly isInstructor = computed(() => this.user()?.role === "instructor");
  readonly isStudent = computed(() => this.user()?.role === "student");
  readonly error = signal<string | null>(null);
  readonly loading = signal(true);
  readonly totalPages = computed(() => Math.ceil(this.total() / this.limit()));

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!id) {
      this.error.set("Geçersiz kullanıcı ID");
      return;
    }
    this.loadUserProfile(id);
  }
  private loadUserProfile(userId: number) {
    this.loading.set(true);
    this.error.set(null);

    this.userService.getPublicUserById(userId).subscribe({
      next: (u) => {
        this.user.set(u);
        if (u.role === "instructor") {
          this.loadInstructorCourses(userId);
        } else {
          this.loadStudentEnrollments(userId);
        }
      },
      error: () => {
        this.error.set("Kullanıcı bulunamadı");
        this.loading.set(false);
      },
    });
  }

  loadInstructorCourses(userId: number) {
    this.courseService
      .getCoursesByInstructorId(userId, this.page(), this.limit())
      .subscribe({
        next: (res) => {
          this.courses.set(res.data);
          this.total.set(res.total);
          this.loading.set(false);
        },
        error: () => {
          this.error.set("Kurslar yüklenemedi");
          this.loading.set(false);
        }
      });
  }
  
  private loadStudentEnrollments(userId: number) {
    this.enrollmentService.getEnrollmentsByUserId(userId, this.page(), this.limit())
      .subscribe({
        next: (res) => {
          //expand kullanıldığı için enrollmentlarda course listesi de ekli burada enrollmentlardan courseları çekiyoruz.
          const courses = res.data.map((e: any) => e.course).filter(Boolean); //kurs yoksa vs onun filtrelenmesi
          this.courses.set(courses);
          this.total.set(res.total);
          this.loading.set(false);
        },
        error: () => {
          this.error.set("Kayıt olunan kurslar alınamadı");
          this.loading.set(false);
        }
      });
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update(p => p + 1);
      this.loadCourses();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.loadCourses();
    }
  }

  private loadCourses() {
    const user = this.user();
    if (!user) return;

    if (user.role === 'instructor') {
      this.loadInstructorCourses(user.id);
    } else {
      this.loadStudentEnrollments(user.id);
    }
  }
}
