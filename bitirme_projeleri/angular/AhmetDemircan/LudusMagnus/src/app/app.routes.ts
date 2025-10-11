import { Routes } from '@angular/router';
import { CerberusGuard } from './guards/cerberus.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Ana sayfa - courses'a yönlendir (herkese açık)
  { 
    path: '', 
    loadComponent: () => import('./Pages/Courses/Courses').then(m => m.Courses)
  },
  
  { 
    path: 'user', 
    loadComponent: () => import('./Pages/user/user').then(m => m.User)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./Pages/login/login').then(m => m.Login)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./Pages/register/register').then(m => m.Register)
  },
  
  // Courses sayfası (herkese açık)
  { 
    path: 'Courses', 
    loadComponent: () => import('./Pages/Courses/Courses').then(m => m.Courses)
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about').then(m => m.default)
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact').then(m => m.default)
  },
  
  // Admin panel - Sadece admin erişebilir
  {
    path: 'admin-panel',
    loadComponent: () => import('./Pages/admin-panel/admin-panel').then(m => m.AdminPanel),
    canActivate: [AdminGuard]
  },
  {
    path: 'newCours',
    loadComponent: () => import('./Pages/NewCours/newCours').then(m => m.newCours),
    canActivate: [TeacherGuard]
  },
  
  // Kurs düzenleme sayfası - Sadece teacher ve admin erişebilir
  {
    path: 'edit-course/:id',
    loadComponent: () => import('./Pages/edit-course/edit-course').then(m => m.EditCourse),
    canActivate: [TeacherGuard]
  },
  // Teacher panel sayfası - Sadece teacher ve admin erişebilir
  {
    path: 'teacher-panel',
    loadComponent: () => import('./Pages/teacher-panel/teacher-panel').then(m => m.TeacherPanel),
    canActivate: [TeacherGuard]
  },
  
  // Kurs kayıt sayfası - ID parametresi ile
  {
    path: 'enroll-Course/:id',
    loadComponent: () => import('./Pages/enroll-Course/enroll-Course').then(m => m.EnrollCourse),
    canActivate: [CerberusGuard]
  },
  
  // Search sayfası
  {
    path: 'search',
    loadComponent: () => import('./Pages/search/search').then(m => m.Search)
  },
  
  // Kurs detay sayfası (parametreli rotalar en sonda olmalı)
  {
    path: 'course-details/:id',
    loadComponent: () => import('./Pages/course-details/course-details').then(m => m.CourseDetails)
  },
  
  // Unauthorized sayfası - Yetkisiz erişim için
  {
    path: 'unauthorized',
    loadComponent: () => import('./components/unauthorized/unauthorized').then(m => m.default)
  },
  
  // Not found sayfası
  {
    path: 'not-found',
    loadComponent: () => import('./components/not-found/not-found').then(m => m.default)
  },
  
  // Geçersiz route'lar için wildcard - not-found'a yönlendir
  { path: '**', redirectTo: '/not-found' }
];
