import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Lesson, LessonCreateDTO } from '../models/Lesson';
import { endpoints } from '../utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  readonly http = inject(HttpClient);

  getLessonByCourse(courseId: number) {
    return this.http.get<Lesson[]>(`${endpoints.lessons.byCourseId(courseId)}`)
  }

  createLesson(dto: LessonCreateDTO) {
    return this.http.post<Lesson>(`${endpoints.lessons.create}`, dto)
  }

  updateLesson(id:number, dto: LessonCreateDTO) {
    return this.http.put<Lesson>(`${endpoints.lessons.update(id)}`, dto)
  }

  deleteLesson(id:number) {
    return this.http.delete(`${endpoints.lessons.delete(id)}`)
  }
}
