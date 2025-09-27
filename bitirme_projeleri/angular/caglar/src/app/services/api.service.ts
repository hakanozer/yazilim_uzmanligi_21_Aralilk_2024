import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userUrl } from '../utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // json-server-auth ile login
  userLogin(email: string, password: string): Observable<any> {
    const sendObj = {
      email: email,
      password: password
    };
    return this.http.post(userUrl.login, sendObj);
  }

  // json-server-auth ile kayıt
  userRegister(userName:string,userSurname:string,email:string,password:string,userType:string): Observable<any> {
    const sendObj = {
      email: email,
      password: password,
      name: userName,
      surname: userSurname,
      type: userType
    }
    return this.http.post(userUrl.register, sendObj);
  }

  // Mevcut kullanıcı bilgilerini getir
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }
    
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
 
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenData.sub;
      return this.http.get(`${userUrl.users}/${userId}`, { headers });
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Kurs sayfaları

  allCourses(): Observable<any[]> {
    return this.http.get<any[]>(userUrl.courses)
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get(`${userUrl.courses}/${id}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${userUrl.users}/${id}`);
  }

  // Eğitmen için kurs yönetimi metodları
  createCourse(course: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(userUrl.courses, course, { headers });
  }

  updateCourse(id: number, course: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${userUrl.courses}/${id}`, course, { headers });
  }

  deleteCourse(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${userUrl.courses}/${id}`, { headers });
  }

  // Eğitmenin kurslarını getir
  getInstructorCourses(instructorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${userUrl.courses}?InstructorId=${instructorId}`);
  }

  // Öğrencinin kayıtlı olduğu kursları getir
  getStudentCourses(): Observable<any[]> {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (enrolledCourses.length === 0) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
    
    // Kayıtlı kurs ID'lerini kullanarak kurs bilgilerini getir
    const courseRequests = enrolledCourses.map((courseId: number) => 
      this.http.get<any>(`${userUrl.courses}/${courseId}`)
    );
    
    return new Observable(observer => {
      Promise.all(courseRequests.map((req: Observable<any>) => req.toPromise()))
        .then(courses => {
          observer.next(courses);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  // Kursa kayıt ol
  enrollCourse(courseId: number): Observable<any> {
    return new Observable(observer => {
      try {
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        if (!enrolledCourses.includes(courseId)) {
          enrolledCourses.push(courseId);
          localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
          observer.next({ success: true, message: 'Course enrolled successfully' });
        } else {
          observer.next({ success: false, message: 'Already enrolled in this course' });
        }
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  // Kurstan çık
  unenrollCourse(courseId: number): Observable<any> {
    return new Observable(observer => {
      try {
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        const courseIndex = enrolledCourses.indexOf(courseId);
        if (courseIndex > -1) {
          enrolledCourses.splice(courseIndex, 1);
          localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
          observer.next({ success: true, message: 'Successfully unenrolled from course' });
        } else {
          observer.next({ success: false, message: 'Not enrolled in this course' });
        }
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  // Kurs arama fonksiyonu
  searchCourses(query: string): Observable<any[]> {
    return new Observable(observer => {
      this.allCourses().subscribe({
        next: (courses) => {
          const filteredCourses = courses.filter(course => 
            course.coursesTitle.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase()) ||
            course.Instructor.toLowerCase().includes(query.toLowerCase())
          );
          observer.next(filteredCourses);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  // Comment ekleme fonksiyonu
  addComment(courseId: number, comment: string): Observable<any> {
    return new Observable(observer => {
      try {
        // Mevcut kullanıcıyı JWT token'dan al
        this.getCurrentUser().subscribe({
          next: (currentUser) => {
            if (!currentUser || !currentUser.id) {
              observer.error('Kullanıcı bulunamadı');
              return;
            }

            // Kursu bul ve comment ekle
            this.getCourseById(courseId).subscribe({
              next: (course) => {
                if (!course.comments) {
                  course.comments = [];
                }
                
                const newComment = {
                  userId: currentUser.id,
                  comment: comment,
                  date: new Date().toISOString().split('T')[0]
                };
                
                course.comments.push(newComment);
                
                // Kursu güncelle
                this.updateCourse(courseId, course).subscribe({
                  next: (response) => {
                    console.log('Comment added successfully:', newComment);
                    observer.next({ success: true, comment: newComment });
                    observer.complete();
                  },
                  error: (error) => {
                    console.error('Update course error:', error);
                    observer.error(error);
                  }
                });
              },
              error: (error) => {
                console.error('Get course error:', error);
                observer.error(error);
              }
            });
          },
          error: (error) => {
            console.error('Get current user error:', error);
            observer.error('Kullanıcı bilgileri alınamadı');
          }
        });
      } catch (error) {
         console.error('Add comment error:', error);
         observer.error(error);
       }
    });
  }

  // Kurs yorumlarını getirme fonksiyonu
  getCourseComments(courseId: number): Observable<any[]> {
    return new Observable(observer => {
      this.getCourseById(courseId).subscribe({
        next: (course) => {
          observer.next(course.comments || []);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  // Logout metodunu düzelt
  userLogout(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(userUrl.logout, {}, { headers });
  }

}
