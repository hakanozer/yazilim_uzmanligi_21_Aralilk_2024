import { Routes } from '@angular/router';
import { coursesResolver } from './pages/courses/courses.resolver';
import { roleGuard } from './auth/role-guard';
import { profileResolver } from './pages/profile/profile.resolver';
import { courseDetailResolver } from './pages/course-detail/course-detail.resolver';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
    { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
    { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile), resolve: { profileData: profileResolver }, canActivate: [authGuard] },
    { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
    { path: 'about-us', loadComponent: () => import('./pages/about-us/about-us').then(m => m.AboutUs) },
    { path: 'courses', loadComponent: () => import('./pages/courses/courses').then(m => m.Courses), resolve: { courses: coursesResolver } },
    { path: 'courses/:id', loadComponent: () => import('./pages/course-detail/course-detail').then(m => m.CourseDetail), resolve: { detail: courseDetailResolver } },
    { path: 'edit-courses', loadComponent: () => import('./pages/edit-courses/edit-courses').then(m => m.EditCourses), canActivate: [roleGuard], data: { roles: ['instructor'] } },
    { path: 'search', loadComponent: () => import('./pages/search/search').then(m => m.Search) }
];
