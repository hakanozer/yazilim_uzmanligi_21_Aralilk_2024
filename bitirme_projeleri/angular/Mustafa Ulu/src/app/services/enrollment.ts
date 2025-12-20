import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private api = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}

  getUserEnrollments(userId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.api}?userId=${userId}`);
  }

  getEnrollment(userId: number, courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.api}?userId=${userId}&courseId=${courseId}`);
  }

  enroll(userId: number, courseId: number): Observable<Enrollment> {
    const payload: Omit<Enrollment, 'id'> = {
      userId,
      courseId,
      createdAt: new Date().toISOString(),
    };
    return this.http.post<Enrollment>(this.api, payload);
  }
}
