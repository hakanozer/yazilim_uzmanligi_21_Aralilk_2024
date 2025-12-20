import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lesson {
  id?: string | number;
  courseId: string; // ✅ db.json ile uyumlu: string
  title: string;
  videoUrl: string;
}

@Injectable({ providedIn: 'root' })
export class LessonService {
  private baseUrl = 'http://localhost:3000/lessons';

  constructor(private http: HttpClient) {}

  getByCourse(courseId: string | number): Observable<Lesson[]> {
    const params = new HttpParams().set('courseId', String(courseId));
    return this.http.get<Lesson[]>(this.baseUrl, { params });
  }

  // ✅ dışarıdan string|number kabul ediyoruz, içerde stringe çeviriyoruz
  add(payload: { courseId: string | number; title: string; videoUrl: string }): Observable<Lesson> {
    const body: Omit<Lesson, 'id'> = {
      courseId: String(payload.courseId), // ✅ fix
      title: payload.title,
      videoUrl: payload.videoUrl,
    };
    return this.http.post<Lesson>(this.baseUrl, body);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
