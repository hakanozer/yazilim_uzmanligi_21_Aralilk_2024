import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl } from '../utils/apiUrl';
import { IEnrollment } from '../models/IEnrollment';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { ICourse } from '../models/ICourses';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  

  constructor(private http: HttpClient) { }


// Öğrencinin kayıtlı olduğu kursları getiren metod
getCoursesByStudentId(userId: string ): Observable<ICourse[]> {
  return this.http.get<IEnrollment[]>(`${userUrl.enrollments}`).pipe(
    switchMap((enrollments: IEnrollment[]) => {
      const filtered = enrollments.filter(enroll => enroll.userId == userId);
      const courseRequests = filtered.map(enroll =>
        this.http.get<ICourse>(`${userUrl.courses}/${enroll.courseId}`)
      );
      return forkJoin(courseRequests);
    })
  );
}

//Kursa kaydolma metodu
enrollInCourse(userId: string, courseId: string): Observable<IEnrollment> {
  const sendObj = {
     userId:userId, 
     courseId:courseId 
    };
  return this.http.post<IEnrollment>(userUrl.enrollments, sendObj);
}

//Öğrenci kursa kayıtlı mı kontrol eden metod
isStudentEnrolled(userId:string, courseId: string): Observable<boolean> {
  return this.http.get<IEnrollment[]>(`${userUrl.enrollments}`).pipe(
    map(enrollments =>
      !!enrollments.find(enroll =>
        enroll.userId == userId && enroll.courseId == courseId
      )
    )
  );
}

}
