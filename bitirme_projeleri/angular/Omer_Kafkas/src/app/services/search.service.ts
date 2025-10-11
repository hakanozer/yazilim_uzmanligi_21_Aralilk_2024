import { Injectable, inject, signal, computed } from '@angular/core';
import { Api } from '../api';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface GlobalSearchResult {
  type: 'course' | 'user' | 'lesson' | 'comment';
  id: string;
  title: string;
  subtitle?: string;
  relatedCourseId?: string;
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private api = inject(Api);
  private cache = new Map<string, GlobalSearchResult[]>();
  private loading = signal(false);
  readonly loadingState = computed(() => this.loading());

  search(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) return of<GlobalSearchResult[]>([]);
    if (this.cache.has(q)) {
      return of(this.cache.get(q)!);
    }
    this.loading.set(true);
    return forkJoin({
      courses: this.api.list<any>('courses'),
      users: this.api.list<any>('users'),
      lessons: this.api.list<any>('lessons'),
      comments: this.api.list<any>('comments')
    }).pipe(
      map(({ courses, users, lessons, comments }) => {
        const results: GlobalSearchResult[] = [];
        for (const c of courses) {
          if ([c.title, c.description, c.instructorName].some(f => typeof f === 'string' && f.toLowerCase().includes(q))) {
            results.push({ type: 'course', id: c.id, title: c.title, subtitle: c.instructorName, relatedCourseId: c.id });
          }
        }
        for (const u of users) {
          const full = [u.name, u.surname, u.email].filter(Boolean).join(' ');
            if (full.toLowerCase().includes(q)) {
              results.push({ type: 'user', id: u.id, title: full, subtitle: u.role || 'kullanıcı' });
            }
        }
        for (const l of lessons) {
          if (l.title?.toLowerCase().includes(q)) {
            results.push({ type: 'lesson', id: l.id, title: l.title, relatedCourseId: l.courseId });
          }
        }
        for (const cm of comments) {
          if (cm.text?.toLowerCase().includes(q)) {
            results.push({ type: 'comment', id: cm.id, title: cm.text.slice(0, 60) + (cm.text.length > 60 ? '…' : ''), relatedCourseId: cm.courseId });
          }
        }
        // Basit sıralama: course > lesson > comment > user sonra alfabetik
        results.sort((a, b) => {
          const weight: Record<GlobalSearchResult['type'], number> = { course: 0, lesson: 1, comment: 2, user: 3 };
          const oa = weight[a.type];
          const ob = weight[b.type];
          if (oa !== ob) return oa - ob;
          return a.title.localeCompare(b.title);
        });
        this.cache.set(q, results);
        this.loading.set(false);
        return results;
      })
    );
  }
}
