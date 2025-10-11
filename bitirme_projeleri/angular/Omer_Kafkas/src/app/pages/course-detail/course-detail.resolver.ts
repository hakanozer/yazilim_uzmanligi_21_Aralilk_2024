import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Api } from '../../api';
import { forkJoin, of } from 'rxjs';

export interface CourseDetailData {
  course: any | null;
  lessons: any[];
  comments: any[];
}

export const courseDetailResolver: ResolveFn<CourseDetailData> = (route: ActivatedRouteSnapshot) => {
  const api = inject(Api);
  const id = route.paramMap.get('id');
  if (!id) return of({ course: null, lessons: [], comments: [] });

  const course$ = api.get<any>(`courses/${id}`);
  const lessons$ = api.list<any>('lessons', { courseId: id });
  const comments$ = api.list<any>('comments', { courseId: id });

  return forkJoin({ course: course$, lessons: lessons$, comments: comments$ });
};
