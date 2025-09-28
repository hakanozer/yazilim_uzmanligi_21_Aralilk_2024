import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Course } from "../../models/Course";
import { CourseService } from "../../services/course-service";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: "app-courses",
  imports: [RouterLink, Navbar],
  templateUrl: "./courses.html",
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Courses implements OnInit{
  
  //Bu componentte headerdan total course sayısına ihtiyacım olduğu için httpResource kullanmak yerine
  //serviste httpClient kullandım. httpResource ile header erişimi yok.
  readonly courseService = inject(CourseService);
  readonly page = signal(1);
  readonly limit = signal(9);
  readonly courses = signal<Course[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.limit()))
  );

  ngOnInit(): void {
    this.fetchCourses();
  }
  fetchCourses() {
  this.loading.set(true);
  this.error.set(null);
    //getCourse servisten {data,total} dönüyor.
  this.courseService.getCourses(this.page(), this.limit()).subscribe({
    next: (result) => {
      this.courses.set(result.data);
      this.total.set(result.total);
      this.loading.set(false);
    },
    error: () => {
      this.error.set("Kurslar yüklenemedi, tekrar deneyin.");
      this.loading.set(false);
    }
  });
}

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.fetchCourses();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.fetchCourses();
    }
  }
}
