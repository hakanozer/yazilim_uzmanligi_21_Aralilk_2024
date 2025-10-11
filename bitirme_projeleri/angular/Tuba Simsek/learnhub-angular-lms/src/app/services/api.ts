import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { Course } from '../models/ICourse';
import { ILesson } from '../models/ILesson';
import { IEnrollment } from '../models/IEnrollment';
import { IComment } from '../models/IComment';
import { Observable } from 'rxjs';


const baseURL = "http://localhost:3001/";


@Injectable({
 providedIn: 'root'
})

export class Api {

 constructor(private http: HttpClient) {}


 // -----------------------------
 // Auth / User
 // -----------------------------

 userLogin(email: string, password: string): Observable<IUser[]> {
  return this.http.get<IUser[]>(`${baseURL}users?email=${email}&password=${password}`)
 }

 userRegister(name: string, email: string, password: string, role: 'student' | 'instructor'): Observable<IUser> {
  const sendObj = { name, email, password, role }
  return this.http.post<IUser>(`${baseURL}users`, sendObj)
 }

 userProfile(id: number): Observable<IUser> {
  localStorage.getItem("userId")
  return this.http.get<IUser>(`${baseURL}users/${id}`)
 }

 updateUser(id: number, user: Partial<IUser>) {
 return this.http.put<IUser>(`${baseURL}users/${id}`, user)
}

 userLogout() {
  localStorage.removeItem("token")
  localStorage.removeItem("userId")
  return true;
 }


 // -----------------------------
 // Courses
 // -----------------------------

getAllCourses(page: number, per_page: number): Observable<Course[]> {
 return this.http.get<Course[]>(`${baseURL}courses?_page=${page}&_limit=${per_page}`);
}

 getCourseById(id: number): Observable<Course> {
  return this.http.get<Course>(`${baseURL}courses/${id}`);
 }

 addCourse(course: Partial<Course>): Observable<Course> {
 return this.http.post<Course>(`${baseURL}courses`, course);
 }

updateCourse(id: number, course: Partial<Course>): Observable<Course> {
 return this.http.put<Course>(`${baseURL}courses/${id}`, course);
}

 deleteCourse(id: number): Observable<void> {
 return this.http.delete<void>(`${baseURL}courses/${id}`);
 }


 // -----------------------------
 // Lessons
 // -----------------------------

 getLessonsByCourse(courseId: number): Observable<ILesson[]> {
  return this.http.get<ILesson[]>(`${baseURL}lessons?courseId=${courseId}`);
 }

 addLesson(lesson: ILesson) {
  return this.http.post(`${baseURL}lessons`, lesson);
 }

 updateLesson(id: number, lesson: ILesson) {
  return this.http.put(`${baseURL}lessons/${id}`, lesson);
 }

 deleteLesson(id: number) {
  return this.http.delete(`${baseURL}lessons/${id}`);
 }

 // -----------------------------
 // Enrollments
 // -----------------------------

 getEnrollmentsByUser(userId: number): Observable<IEnrollment[]> {
  return this.http.get<IEnrollment[]>(`${baseURL}enrollments?userId=${userId}`);
 }

 addEnrollment(enrollment: IEnrollment): Observable<IEnrollment> {
 return this.http.post<IEnrollment>(`${baseURL}enrollments`, enrollment);
}


 // -----------------------------
 // Comments
 // -----------------------------

 getCommentsByCourse(courseId: number): Observable<IComment[]> {
  return this.http.get<IComment[]>(`${baseURL}comments?courseId=${courseId}`);
 }

 addComment(comment: IComment) {
  return this.http.post(`${baseURL}comments`, comment);
 }

}