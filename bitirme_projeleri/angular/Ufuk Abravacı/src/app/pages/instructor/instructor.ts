import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { AuthService } from '../../services/auth-service';
import { Course } from '../../models/Course';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-instructor',
  imports: [Navbar, RouterLink],
  templateUrl: './instructor.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Instructor implements OnInit {
  readonly courseService = inject(CourseService);
  readonly authService = inject(AuthService)
  readonly router = inject(Router)
  readonly courses = signal<Course[]>([])
  readonly isLoading = signal(false)
  readonly page = signal(1)
  readonly limit = signal(10)
  readonly total = signal(0)
  readonly error = signal<string | null>(null)
  //kaç sayfa olduğunu bulan signal 1 ile total/limit değerlerinden hangisi büyükse onu alıyor.
  //diğer signallerin değerine bağlı olarak hesaplandığı için computed kullanılıyor.
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.limit())))
  ngOnInit(): void {
    this.fetchInstructorCourses();
  }
  //Eğitmene ait kursları getiren metot
  fetchInstructorCourses() {
    this.isLoading.set(true);
    const instructorId = this.authService.user()?.id
    if(!instructorId) {
      this.error.set("Instructor bulunamadı!")
      this.router.navigate(['/login']);
      return;
    }
    this.courseService.getCoursesByInstructorId(instructorId, this.page(), this.limit()).subscribe({
      next: (result) => {
        this.courses.set(result.data);
        this.total.set(result.total);
        this.isLoading.set(false)
      },
      error: () => {
        this.error.set("Kurslar yüklenemedi, tekrar deneyin.");
        this.isLoading.set(false);
      },
      complete: () => this.isLoading.set(false)
    })
  }

  deleteCourse(id: number) {
  this.courseService.deleteCourse(id).subscribe({
    next: () => {
      this.fetchInstructorCourses(); //signali yeniden çek
      //burda update ile de signal güncellemesi yapabilirdik. Ama backend ile uyumsuzluk oluşma riski olurdu.
    },
    error: () => {
      this.error.set("Kurs silinemedi, tekrar deneyin.");
    }
  });
}

  nextPage() {
    if(this.page() < this.totalPages()){
      this.page.update((p) => p+1); // mevcut değeri kullanmak istediğim için update kullandım set yerine.
      this.fetchInstructorCourses(); // page değeri değişti, yeni veriyi çekiyoruz.
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.fetchInstructorCourses();
    }
  }
}
