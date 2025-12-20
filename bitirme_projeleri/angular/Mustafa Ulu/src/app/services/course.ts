import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Course = {
  id: number;
  title: string;
  description: string;
  instructorId: number;
};

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/courses/${id}`);
  }

  createCourse(payload: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/courses`, payload);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/courses/${id}`);
  }
}
