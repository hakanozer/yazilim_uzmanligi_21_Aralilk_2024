import { Component, inject, ChangeDetectionStrategy, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../../api';
import { EnrollmentService } from '../../services/enrollment.service';
import { CoursesItem } from '../../components/courses-item/courses-item';
import { BackgroundItem } from '../../components/background-item/background-item';
import { CommonModule } from '@angular/common';

interface Course {
  id: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  instructorName?: string;
  categoryId?: string; // kategori bazlı filtre için
}

interface Category { id: string; name: string; }

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, BackgroundItem, CoursesItem],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Courses implements OnInit {
  private readonly api = inject(Api);
  private readonly route = inject(ActivatedRoute);
  private readonly enrollmentEvents = inject(EnrollmentService);
  courses: Course[] = [];
  categories: Category[] = [];
  selectedCategory = signal<string>('');
  filtered = computed(() => {
    const cat = this.selectedCategory();
    if (!cat) return this.courses;
    return this.courses.filter(c => c?.categoryId === cat);
  });
  enrolling = new Set<string>();
  enrolled = new Set<string>();
  loading = true;
  error = false;
  http: any;

  ngOnInit() {
    const resolved = this.route.snapshot.data['courses'] as Course[] | undefined;
    try {
      if (resolved) {
        this.courses = [...resolved];
      }
      this.loading = false;
    } catch {
      this.loading = false;
      this.error = true;
    }
    // Kullanıcının kayıt olduğu kursları yükle
    const userRaw = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    const user = userRaw ? JSON.parse(userRaw) : null;
    if (user) {
      this.api.list<any>('enrollments?userId=' + user.id).subscribe((enrolls) => {
        for (const e of enrolls) this.enrolled.add(e.courseId);
      });
    }
    // Kategorileri çek
    this.api.list<Category>('categories').subscribe(cats => this.categories = cats);
  }

  enroll = (courseId: string) => {
    if (this.enrolled.has(courseId)) {
      alert('Bu kursa zaten kayıtlısınız');
      return;
    }
  this.enrolling = new Set([...this.enrolling, courseId]);
    const userRaw = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
    const user = userRaw ? JSON.parse(userRaw) : null;
    if (!user) return;
    // Sunucu tarafında da kontrol et
    this.api.list<any>('enrollments', { userId: user.id, courseId }).subscribe(existing => {
      if (existing.length) {
  const newEnrolling = new Set(this.enrolling); newEnrolling.delete(courseId); this.enrolling = newEnrolling;
  this.enrolled = new Set([...this.enrolled, courseId]);
        alert('Bu kursa zaten kayıtlısınız');
        return;
      }
      const payload = { userId: user.id, courseId };
      this.api.post('enrollments', payload).subscribe({
        next: () => {
          const newEnrolling2 = new Set(this.enrolling); newEnrolling2.delete(courseId); this.enrolling = newEnrolling2;
          this.enrolled = new Set([...this.enrolled, courseId]);
          this.enrollmentEvents.notifyEnrollment();
          alert('Kursa kayıt yapıldı');
        },
        error: () => {
          const newEnrolling3 = new Set(this.enrolling); newEnrolling3.delete(courseId); this.enrolling = newEnrolling3;
          alert('Kayıt sırasında hata oluştu');
        },
      });
    });
  };

  // Manuel yenileme (gerekirse template'e buton eklenebilir)
  refreshCourses() {
    this.loading = true; this.error = false;
    this.api.list<Course>('courses').subscribe({
      next: list => { this.courses = [...list]; this.loading = false; },
      error: () => { this.loading = false; this.error = true; }
    });
  }
}
