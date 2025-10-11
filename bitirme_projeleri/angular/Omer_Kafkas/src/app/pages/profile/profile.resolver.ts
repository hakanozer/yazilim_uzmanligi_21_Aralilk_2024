import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Api } from '../../api';
import { AuthService } from '../../services/auth.service';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { CacheService } from '../../services/cache.service';

interface Category { id: string; name: string; }
interface Course { id: string; categoryId: string; instructorId: string; durationHours?: number; price?: number; }
interface Enrollment { id: string; userId: string; courseId: string; }

export interface ProfileResolvedData {
  categories: Category[];
  courses: Course[];
  enrollments: Enrollment[]; // boş dizi döner (öğretmen ise).
}

export const profileResolver: ResolveFn<ProfileResolvedData> = () => {
  const api = inject(Api);
  const auth = inject(AuthService);
  const user = auth.currentUser();
  const cache = inject(CacheService);

  // Kullanıcı yoksa boş döndür (guard eklenebilir ileride)
  if (!user) {
    return of({ categories: [], courses: [], enrollments: [] });
  }

  // Cache key kullanıcıya göre izole
  const baseKey = `profile:${user.id}`;
  const cached = cache.get<ProfileResolvedData>(baseKey);
  if (cached) {
    return of(cached);
  }

  const categories$ = api.list<Category>('categories');
  const courses$ = api.list<Course>('courses');
  const enrollments$ = user.role === 'student'
    ? api.list<Enrollment>('enrollments', { userId: user.id })
    : of<Enrollment[]>([]);

  return forkJoin({ categories: categories$, courses: courses$, enrollments: enrollments$ })
    .pipe(
      map(result => {
        cache.set(baseKey, result, 60_000); // 60s cache
        return result;
      })
    );
};
