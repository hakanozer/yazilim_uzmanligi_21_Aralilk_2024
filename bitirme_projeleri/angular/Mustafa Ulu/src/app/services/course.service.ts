import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);

  // json-server portun farklıysa burayı değiştir
  private baseUrl = 'http://localhost:3000';

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }

  /**
   * ✅ FIX:
   * db.json içinde course id'leri hem "1","2" gibi string numeric hem de "c386" gibi string olabilir.
   * O yüzden Number() yapma. json-server string id ile de /courses/:id çalışır.
   */
  getCourseById(id: string | number): Observable<Course> {
    const courseId = String(id).trim();

    if (!courseId) {
      return new Observable<Course>((sub) => {
        sub.error(new Error('Geçersiz course id'));
      });
    }

    return this.http.get<Course>(`${this.baseUrl}/courses/${courseId}`);
  }

  addCourse(payload: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/courses`, payload);
  }

  /**
   * ✅ FIX:
   * Silmede de id string olabilir. Number'a çevirme.
   */
  deleteCourse(id: string | number): Observable<void> {
    const courseId = String(id).trim();

    if (!courseId) {
      return new Observable<void>((sub) => {
        sub.error(new Error('Geçersiz course id'));
      });
    }

    return this.http.delete<void>(`${this.baseUrl}/courses/${courseId}`);
  }
}
