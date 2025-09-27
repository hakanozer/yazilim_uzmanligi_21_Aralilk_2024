import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesItemComponent } from './components/courses-item/courses-item.component';
import { authGuard } from './auth.guard';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "courses", component: CoursesComponent, canActivate:[authGuard]},
    {path: "courses/:id", component: CoursesItemComponent, canActivate:[authGuard]},
    {path: "profile", component: ProfileComponent, canActivate:[authGuard]},
    {path: "**", component:NotfoundComponent}
];
