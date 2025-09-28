import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Enrollment, EnrollmentCreateDTO } from '../models/Enrollment';
import { endpoints } from '../utils/apiUrl';
import { PagedResult } from '../models/PagedResult';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  readonly http = inject(HttpClient)
  
  createEnrollment(payload: EnrollmentCreateDTO) {
    return this.http.post<Enrollment>(endpoints.enrollments.create, payload)
  }
  deleteEnrollment(id: number) {
    return this.http.delete(endpoints.enrollments.delete(id))
  }

  getEnrollmentsByUserId(userId: number, page: number = 1, limit:number = 10): Observable<PagedResult<Enrollment>> {
    return this.http.get<Enrollment[]>(endpoints.enrollments.byUserIdEnrollmentsWithCourses(userId, page, limit), {observe: "response"}).pipe(
      map((res) => ({
        data: res.body ?? [],
        total: Number(res.headers.get("X-Total-Count") ?? 0)
      }))
    )
  }

  getEnrollmentsByCourseId(courseId: number, page:number =1, limit:number =10): Observable<PagedResult<Enrollment>>{
    return this.http.get<Enrollment[]>(endpoints.enrollments.byCourseId(courseId), {observe: "response"}).pipe(
      map((res) => ({data: res.body ?? [], total: Number(res.headers.get("X-Total-Count") ?? 0)}))
    )
  }

  isEnrolled(userId:number, courseId:number) {
    return this.http.get<Enrollment[]>(endpoints.enrollments.isEnrolled(courseId,userId))
    .pipe(map(res => res.length > 0)) // doğrudan boolean dönüyoruz.
  }

  getUserEnrollments(userId: number) {
    return endpoints.enrollments.byUserId(userId);
  }
}
