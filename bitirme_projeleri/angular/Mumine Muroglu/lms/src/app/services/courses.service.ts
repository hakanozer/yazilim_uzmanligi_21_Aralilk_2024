import { Injectable } from '@angular/core';

import { userUrl } from '../utils/apiUrl';
import { HttpClient} from '@angular/common/http';
import { ICourse, ICourseCreate } from '../models/ICourses';
import { Observable } from 'rxjs';
import { ILesson, ILessonCreate } from '../models/ILessons';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
 
  constructor(private http: HttpClient) { }

                          /**Kurslar Metodları */

//Tüm kursları getirme
   getAllCourses(): Observable<ICourse[]> {
  return this.http.get<ICourse[]>(userUrl.courses);
}


//Belirli bir kursu ID'sine göre getirme
    courseById(id:string): Observable<ICourse> {
      const url=`${userUrl.courses}/${id}`;
      return this.http.get<ICourse>(url);
    }

//Belirli bir eğitmenin kurslarını getirme
    getCourserByInstructor(instructorId:string): Observable<ICourse[]> {
      const url=`${userUrl.courses}?instructorId=${instructorId}`;
      return this.http.get<ICourse[]>(url);
    }

//Yeni kurs ekleme
addCourse(courseData: ICourseCreate): Observable<ICourse> {
  return this.http.post<ICourse>(userUrl.courses, courseData);
}

//Kurs silme
deleteCourse(courseId:string):Observable<any>{
  const url=`${userUrl.courses}/${courseId}`;
  return this.http.delete(url);
}

                            /**Dersler Metodları */



getLessons(page: number, per_page: number) {
   const params = {
    _page: page,
    _limit: per_page
  };
  return this.http.get<ILesson[]>(userUrl.lessons, { params });
}
//Belirli bir kursa ait dersleri getirme
 getLessonsByCourse(courseId: string): Observable<ILesson[]> {
  return this.http.get<ILesson[]>(`${userUrl.lessons}?courseId=${courseId}`);
}

//Yeni ders ekleme metodu
addLesson(lessonData:ILessonCreate):Observable<ILesson>{
  return this.http.post<ILesson>(userUrl.lessons,lessonData);

}
//Ders silme metodu
deleteLesson(lessonId:string):Observable<any>{
  const url=`${userUrl.lessons}/${lessonId}`;
  return this.http.delete(url);
}

//Ders güncelleme metodu
updateLesson(lessonData: ILesson): Observable<ILesson> {
  const url = `${userUrl.lessons}/${lessonData.id}`;
  return this.http.put<ILesson>(url, lessonData);// Tam nesneyi güncellemek için PUT kullanıyoruz.
}

}
