import { Component, inject, OnInit, effect, OnDestroy, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CacheService } from '../../services/cache.service';
import { BackgroundItem } from "../../components/background-item/background-item";
import { AuthService, UserDto } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Api } from '../../api';
import { EnrollmentService } from '../../services/enrollment.service';
import { forkJoin, of } from 'rxjs';

interface Category {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
  categoryId: string;
  instructorId: string;
  image?: string;
  instructorName?: string;
  description?: string;
  price?: number;
}

@Component({
  selector: 'app-profile',
  imports: [BackgroundItem, CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private api = inject(Api);
  private enrollmentEvents = inject(EnrollmentService);
  private route = inject(ActivatedRoute);
  private cache = inject(CacheService);

  user: UserDto | null = null;
  profilePhoto = 'assets/logo.png';

  // reactive state (signals)
  readonly categories = signal<Category[]>([]);
  readonly groupedCourses = signal<Record<string, Course[]>>({});
  private readonly allCourses = signal<Course[]>([]);
  readonly loading = signal(true);
  readonly empty = computed(() => !this.loading() && Object.keys(this.groupedCourses()).length === 0);

  // Öğrenci metrikleri: alınan kurs listesini group map'inden düzleştirip hesapla
  readonly studentCourseList = computed(() => {
    if (!this.user || this.user.role !== 'student') return [] as any[];
    const groups = this.groupedCourses();
    const all: any[] = [];
    for (const k of Object.keys(groups)) {
      all.push(...groups[k]);
    }
    return all;
  });

  readonly studentMetrics = computed(() => {
    if (!this.user || this.user.role !== 'student') return { courseCount: 0, totalPrice: 0, totalHours: 0 };
    const list = this.studentCourseList();
    let totalPrice = 0;
    let totalHours = 0;
    for (const c of list) {
      if (typeof c.price === 'number') totalPrice += c.price;
      if (typeof c.durationHours === 'number') totalHours += c.durationHours;
    }
    return {
      courseCount: list.length,
      totalPrice: Number(totalPrice.toFixed(2)),
      totalHours
    };
  });

  readonly instructorMetrics = computed(() => {
    if (this.user?.role !== 'instructor') return { courseCount: 0, totalStudents: 0 };
    const all = this.allCourses();
    const mine = all.filter((c: Course) => c.instructorId === this.user?.id);
    const courseCount = mine.length;
    const totalStudents = mine.reduce((sum: number, c: Course) => sum + (Array.isArray((c as any).students) ? (c as any).students.length : 0), 0);
    return { courseCount, totalStudents };
  });

  // Eski manuel effect referansları kaldırıldı; Angular runtime cleanup'a bırakıyoruz.

  // Effects injection context: tanımlar property initializer olarak yapılır
  private readonly _enrollmentEffect = effect(() => {
    this.enrollmentEvents.version();
    if (!this.user) return;
    if (this.user.role && this.user.role !== 'student') return;
    if (this.allCourses().length) {
      this.cache.clear(`profile:${this.user.id}`);
      this.recomputeStudentGrouping();
    }
  });

  private readonly _userSyncEffect = effect(() => {
    const u = this.auth.currentUser();
    if (!u) return;
    if (this.user && this.user.id === u.id) return;
    const firstTime = !this.user;
    this.applyUser(u, true);
    if (firstTime && !this.allCourses().length) {
      this.loading.set(true);
      const isStudent = (u.role || 'student') === 'student';
      const categories$ = this.api.list<any>('categories');
      const courses$ = this.api.list<any>('courses');
      const enrollments$ = isStudent ? this.api.list<any>('enrollments', { userId: u.id }) : of<any[]>([]);
      forkJoin({ categories: categories$, courses: courses$, enrollments: enrollments$ }).subscribe(({ categories, courses, enrollments }) => {
        this.categories.set(categories);
        this.allCourses.set(courses);
        if (isStudent) {
          const ids = new Set(enrollments.map((e: any) => e.courseId));
          const my = courses.filter((c: any) => ids.has(c.id));
          this.groupedCourses.set(this.groupByCategory(my));
        } else {
          const mine = courses.filter((c: any) => c.instructorId === u.id);
          this.groupedCourses.set(this.groupByCategory(mine));
        }
        this.loading.set(false);
      });
    }
  });

  ngOnInit(): void {
    // İlk değer (varsa) alınır; yoksa effect ile sonradan gelecektir.
    const initial = this.auth.currentUser();
    if (initial) {
      this.applyUser(initial, false);
    }

  // Resolver'dan preload edilmiş veriyi al
    const data = this.route.snapshot.data['profileData'] as any;
    if (data) {
      this.categories.set(data.categories || []);
      const all = data.courses || [];
      this.allCourses.set(all);
      if (this.user?.role === 'instructor') {
        const my = all.filter((c: any) => c.instructorId === this.user!.id);
        this.groupedCourses.set(this.groupByCategory(my));
        this.loading.set(false);
      } else {
        // öğrenci: resolver enrollments verdi
        const enrollments = data.enrollments || [];
        const enrolledIds = new Set(enrollments.map((e: any) => e.courseId));
        const my = all.filter((c: any) => enrolledIds.has(c.id));
        this.groupedCourses.set(this.groupByCategory(my));
        this.loading.set(false);
      }
    } else {
      // Fallback: eski yol (normalde olmaz)
      this.loading.set(false);
    }

    // Eski ngOnInit içi effects kaldırıldı; property initializer effect'leri zaten çalışıyor.

  }

  // Enrollment değişince sadece enrollments'ı yeniden al (öğrenci ise)
  private refetchEnrollments() {
    if (!this.user || this.user.role !== 'student') return;
    this.api.list<any>('enrollments', { userId: this.user.id }).subscribe(enrolls => {
      const enrolledCourseIds = new Set(enrolls.map(e => e.courseId));
      const my = this.allCourses().filter(c => enrolledCourseIds.has(c.id));
      this.groupedCourses.set(this.groupByCategory(my));
    });
  }

  private recomputeStudentGrouping() {
    // Kayıtları yeniden çek (json-server basit olduğu için tekrar sorgu maliyeti düşük)
    this.refetchEnrollments();
  }

  ngOnDestroy() {}

  private groupByCategory(list: Course[]) {
    const map: Record<string, Course[]> = {};
    for (const c of list) {
      map[c.categoryId] = map[c.categoryId] || [];
      map[c.categoryId].push(c);
    }
    return map;
  }

  private applyUser(u: UserDto, late: boolean) {
    let updated = u;
    if (!u.role) {
      updated = { ...u, role: 'student' } as any;
      localStorage.setItem('currentUser', JSON.stringify(updated));
      this.auth.currentUser.set(updated);
    }
    this.user = updated;
    this.profilePhoto = updated.profilePhoto || this.profilePhoto;
    // Resolver verisi zaten yüklenmiş olabilir; grouping'i şimdi yap
    if (this.allCourses().length) {
      if (updated.role === 'instructor') {
        const my = this.allCourses().filter(c => c.instructorId === updated.id);
        this.groupedCourses.set(this.groupByCategory(my));
      } else {
        // Öğrenci ise enrollments yoksa getir
        this.refetchEnrollments();
      }
      this.loading.set(false);
    }
  }
}
