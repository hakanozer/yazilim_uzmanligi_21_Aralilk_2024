import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserUrl, CoursesUrl, CommentUrl, EnrollUrl } from '../Utils/apiUrl'; // CursusUrl eklendi
import { Observable, switchMap, throwError } from 'rxjs'; // switchMap ve throwError eklendi
import { IUser } from '../models/IUser';
import { ICourses } from '../models/Icourses'; 
import { IComment } from '../models/IComment';
import { IEnroll } from '../models/IEnroll';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private http: HttpClient) { }

  // Tüm kullanıcıları getir
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(UserUrl.users);
  }

  // Tek bir kullanıcı getir
  getUser(id: string): Observable<IUser> { // number yerine string
    return this.http.get<IUser>(`${UserUrl.users}/${id}`);
  }

  // Belirli parametrelerle kullanıcıları getir (başarısız json server ile uyumsuz)
  //Users(id: number, name: string, email: string, password: string) {
   // const sendObj = {
   //   id: id,
   //   name: name,
    //  email: email,
   //  password: password
//  }
   // return this.http.get<IUser>(UserUrl.Ushers, {params: sendObj})
//  }

  //Kullanıcı ekle (mevcut - basit versiyon)
  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(UserUrl.users, user);
  }

  // Kullanıcı ekle (validation ile - YENİ)
  addUserWithValidation(user: IUser): Observable<IUser> {
    return this.getUsers().pipe(
      switchMap(existingUsers => {
        // Email kontrolü
        const emailExists = existingUsers.some(u => u.email === user.email);
        if (emailExists) {
          return throwError(() => new Error(`This email is already in use: ${user.email}`));
        }

        // İsteğe bağlı: İsim kontrolü de eklenebilir
        // const nameExists = existingUsers.some(u => u.name === user.name);
        // if (nameExists) {
        //   return throwError(() => new Error(`Bu isim zaten kullanılıyor: ${user.name}`));
        // }

        // Validation geçtiyse kullanıcıyı ekle
        return this.http.post<IUser>(UserUrl.users, user);
      })
    );
  }

  // Tüm kursları getir - DÜZELTİLDİ
  getCourses(): Observable<ICourses[]> {
    return this.http.get<ICourses[]>(CoursesUrl.Courses);
  }

  // Tek bir kurs getir
  getCoursesById(id: string): Observable<ICourses> {
    return this.http.get<ICourses>(`${CoursesUrl.Courses}/${id}`);
  }

  // Seviyeye göre kursları getir
  getCoursesByLevel(level: string): Observable<ICourses[]> {
    return this.http.get<ICourses[]>(`${CoursesUrl.Courses}?level=${level}`);
  }

  // Aktif kursları getir
  getActiveCourses(): Observable<ICourses[]> {
    return this.http.get<ICourses[]>(`${CoursesUrl.Courses}?isActive=true`);
  }
  // Kurs ekle
  addCourse(Courses: ICourses): Observable<ICourses> {
    return this.http.post<ICourses>(CoursesUrl.Courses, Courses);
  }
  // Kurs güncelle
  updateCourses(id: string, Courses: ICourses): Observable<ICourses> {
    return this.http.put<ICourses>(`${CoursesUrl.Courses}/${id}`, Courses);
  }

  // Kurs sil
  deleteCursus(id: string): Observable<void> {
    return this.http.delete<void>(`${CoursesUrl.Courses}/${id}`);
  }
// Kullanıcının oluşturduğu kursları getir (createdById ile)
getCursusByCreator(createdById: string): Observable<ICourses[]> {
  return this.http.get<ICourses[]>(`${CoursesUrl.Courses}?createdById=${createdById}`);
}

  // Kurs ara
// Kurs ara - title ve description'da arama yap
searchCourses(query: string): Observable<ICourses[]> {
console.log('API search query:', query);
  // json-server'da q parametresi full-text search yapar
  return this.http.get<ICourses[]>(`${CoursesUrl.Courses}?q=${query}`);
}

  // Kursu kullanıcının profiline kaydet
  saveCourse(userId: string, courseId: string): Observable<IUser> {
    // Önce kullanıcıyı getir
    return this.http.get<IUser>(`${UserUrl.users}/${userId}`).pipe(
      switchMap(user => {
        // savedCourses dizisi yoksa oluştur kullanıcı oluşturma fonksiyonuna bu kısmı eklemedik:))
        // Bundan dolayı bu fonksiyon hiç kullanılmamış ise savedCourses dizisi oluşmaz.
        if (!user.savedCourses) {
          user.savedCourses = [];
        }
        
        // Kurs zaten kaydedilmişse ekleme gerçek bir backend olmadığı için güüvebsizlikten aapi içinde kontrolü ek olarak yapıyorum:)
        if (!user.savedCourses.includes(courseId)) {
          user.savedCourses.push(courseId);
        }
        
        // Kullanıcıyı güncelle
        return this.http.put<IUser>(`${UserUrl.users}/${userId}`, user);
      })
    );
  }

  // Kursu kullanıcının profiline sil olmayan dosya zaten silinmez dolayısı ile ek kontole gerek yon
  removeCourse(userId: string, courseId: string): Observable<IUser> {
    // Önce kullanıcıyı getir
    return this.http.get<IUser>(`${UserUrl.users}/${userId}`).pipe(
      switchMap(user => {
          user.savedCourses = user.savedCourses?.filter(id => id !== courseId) || [];
        // Kullanıcıyı güncelle
        return this.http.put<IUser>(`${UserUrl.users}/${userId}`, user);
      })
    );
  }

  //Login

  userLogin(username: string, password: string) {
    return this.http.get<IUser[]>(`${UserUrl.users}?email=${username}&password=${password}`);
  }

  // Yorumlar için API metodları
  getCommentsByCourseId(courseId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${CommentUrl.Comments}?courseId=${courseId}&isApproved=true`);
  }

  addComment(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(`${CommentUrl.Comments}`, comment);
  }

  getAllComments(): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${CommentUrl.Comments}`);
  }

  // Yorum güncelle
  updateComment(id: string, comment: IComment): Observable<IComment> {
    return this.http.put<IComment>(`${CommentUrl.Comments}/${id}`, comment);
  }

  // Yorum sil
  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(`${CommentUrl.Comments}/${id}`);
  }

  // Kullanıcının yorumlarını getir
  getCommentsByUserId(userId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${CommentUrl.Comments}?userId=${userId}`);
  }

  // Enrollments için API metodları
  getEnrollments(): Observable<IEnroll[]> {
    return this.http.get<IEnroll[]>(`${EnrollUrl.Enrollments}`);
  }

  // Kullanıcının kayıtlı olduğu kursları getir
  getUserEnrollments(userId: string): Observable<IEnroll[]> {
    return this.http.get<IEnroll[]>(`${EnrollUrl.Enrollments}?userId=${userId}`);
  }

  // Kullanıcının belirli bir kursa kayıtlı olup olmadığını kontrol et
  checkUserEnrollment(userId: string, courseId: string): Observable<IEnroll[]> {
    return this.http.get<IEnroll[]>(`${EnrollUrl.Enrollments}?userId=${userId}&courseId=${courseId}`);
  }

  // Yeni kayıt ekle
  addEnrollment(enrollment: IEnroll): Observable<IEnroll> {
    return this.http.post<IEnroll>(`${EnrollUrl.Enrollments}`, enrollment);
  }

  // Kayıt sil
  removeEnrollment(enrollmentId: string): Observable<any> {
    return this.http.delete(`${EnrollUrl.Enrollments}/${enrollmentId}`);
  }

  // Kullanıcı güncelle
  updateUser(id: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${UserUrl.users}/${id}`, user);
  }

  // Kullanıcı sil
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${UserUrl.users}/${id}`);
  }
}


