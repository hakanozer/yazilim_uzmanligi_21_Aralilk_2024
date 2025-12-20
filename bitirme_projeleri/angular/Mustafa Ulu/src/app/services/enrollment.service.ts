import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Enrollment {
  id?: number;
  userId: number;
  courseId: number;
}

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private baseUrl = 'http://localhost:3000/enrollments'; // json-server portuna göre güncelle

  constructor(private http: HttpClient) {}

  getByUser(userId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}?userId=${userId}`);
  }

  getByUserAndCourse(userId: number, courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}?userId=${userId}&courseId=${courseId}`);
  }

  enroll(userId: number, courseId: number): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.baseUrl, { userId, courseId });
  }

  unenroll(enrollmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${enrollmentId}`);
  }
}
