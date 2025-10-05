import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './auth.guard';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { RoleGuard } from './role.guard';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { notauthGuard } from './notauth.guard';
import { InstructorDashboardComponent } from './pages/instructor-dashboard/instructor-dashboard.component';


export const routes: Routes = [
     { path: "", component : LoginComponent,canActivate: [notauthGuard]},
     { path: "register", component: RegisterComponent,canActivate: [notauthGuard] },
     { path: "home", component: HomeComponent, canActivate: [authGuard] },
     { path: "course-detail/:id", component: CourseDetailComponent, canActivate: [authGuard] },
     {path: 'student-dashboard',component: StudentDashboardComponent,canActivate: [RoleGuard,authGuard],data: { expectedRole: 'student' }},
     {path: 'instructor-dashboard',component: InstructorDashboardComponent,canActivate: [RoleGuard,authGuard],data: { expectedRole: 'instructor' }}
]
