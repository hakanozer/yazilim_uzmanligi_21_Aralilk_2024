import { HttpClient, httpResource } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Course, CourseCreateDTO } from "../models/Course";
import { endpoints } from "../utils/apiUrl";
import { PagedResult } from "../models/PagedResult";
import { map, Observable } from "rxjs";
import { CourseWithLessons } from "../models/CourseWithLessons";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private http = inject(HttpClient);

  createCourse(payload: CourseCreateDTO): Observable<Course> {
    return this.http.post<Course>(endpoints.courses.create, payload);
  }

  //observe olmadan sadece response body döner. observe ile full httpResponse döner. Bize full response lazım.
  //res.headers ile headerdan X-Total-Count'a erişebilriiz.
  //map ile responsu'u dönüştürüp {data, total} şeklinde döndük. Component headerla body ile uğraşmasın diye.
  getCourses(
    page: number = 1,
    limit: number = 9
  ): Observable<PagedResult<Course>> {
    return this.http
      .get<Course[]>(endpoints.courses.listPagination(page, limit), {
        observe: "response",
      })
      .pipe(
        map((res) => ({
          data: res.body ?? [],
          total: Number(res.headers.get("X-Total-Count") ?? 0),
        }))
      );
  }
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(endpoints.courses.detail(id));
  }

  getCourseByIdWithLessons(id: number): Observable<CourseWithLessons> {
  return this.http.get<CourseWithLessons>(endpoints.courses.withLessons(id));
}
  //Bir instructora ait kurslar paginated
  getCoursesByInstructorId(
    id: number,
    page: number = 1,
    limit: number = 10
  ): Observable<PagedResult<Course>> {
    return this.http
      .get<Course[]>(
        endpoints.courses.getCoursesWithInstructorId(id, page, limit),
        { observe: "response" }
      )
      .pipe(
        map((res) => ({
          data: res.body ?? [],
          total: Number(res.headers.get("X-Total-Count") ?? 0),
        }))
      );
  }

  updateCourse(id: number,payload: CourseCreateDTO): Observable<Course> {
    return this.http.put<Course>(endpoints.courses.update(id), payload);
  }

  deleteCourse(id: number) {
    //delete metodu boş obje döndüğü için bir dönüş tipi belirtmedim
    return this.http.delete(endpoints.courses.delete(id));
  }
}
