import { Routes } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list';
import { CourseDetailComponent } from './components/course-detail/course-detail';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { MyCoursesComponent } from './components/my-courses/my-courses';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';

import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },

  { path: 'courses', component: CourseListComponent },
  { path: 'course/:id', component: CourseDetailComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'my-courses', component: MyCoursesComponent, canActivate: [authGuard] },

  // ÖNEMLİ: Admin sayfası admin-panel component olacak
  { path: 'admin', component: AdminPanelComponent, canActivate: [authGuard, roleGuard] },

  { path: '**', redirectTo: 'courses' },
];
