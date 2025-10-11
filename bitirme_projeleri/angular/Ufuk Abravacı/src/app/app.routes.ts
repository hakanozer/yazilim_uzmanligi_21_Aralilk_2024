import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { instructorGuard } from "./guards/instructor-guard";
import { authGuard } from "./guards/auth-guard";

export const routes: Routes = [
  { path: "", component: Home },
  {
    path: "register",
    loadComponent: () =>
      import("./pages/register/register").then((m) => m.Register),
  },
  {
    path: "login",
    loadComponent: () => import("./pages/login/login").then((m) => m.Login),
  },
  {
    path: "our-instructors",
    loadComponent: () =>
      import("./pages/our-instructors/our-instructors").then(
        (m) => m.OurInstructors
      ),
  },
  {
    path: "courses",
    loadComponent: () =>
      import("./pages/courses/courses").then((m) => m.Courses),
  },

  {
    path: "courses/create",
    loadComponent: () =>
      import("./pages/course-form/course-form").then((m) => m.CourseForm), //creation için courseforma yönlendiriyoruz.
    canMatch: [instructorGuard],
  },
  {
    path: "courses/edit/:id",
    loadComponent: () =>
      import("./pages/course-form/course-form").then((m) => m.CourseForm), //edit için de courseforma yönlendiriyoruz.
    // FOrmdaki mode değişkenine göre component şekillenecek.
    // 2'si neredeyse tamamen aynı olacağı için create ve edit için ayrı componentler oluşturmadım.
    canMatch: [instructorGuard],
  },
  {
    path: "courses/:id",
    loadComponent: () =>
      import("./pages/course-detail/course-detail").then((m) => m.CourseDetail),
  },
  {
    path: "my-courses",
    loadComponent: () =>
      import("./pages/my-courses/my-courses").then((m) => m.MyCourses),
    canActivate: [authGuard], //sadece giriş yapmış kişiler my-courses pathine erişebilsin.
  },
  {
    path: "instructor",
    loadComponent: () =>
      import("./pages/instructor/instructor").then((m) => m.Instructor),
    //lazy loading bir componente guard uyguladığım için daha component yüklenmeden kontrol yapılsın istedim.
    //lazy loading componentlerde canMatch, canActivate'den daha performanslı çalışır. Load edilmeden kontrol yapıldığı için.
    canMatch: [instructorGuard],
  },
  {
    path: "profile/:id",
    loadComponent: () =>
      import("./pages/profile/profile").then((m) => m.Profile),
  },
  { path: "**", redirectTo: "" },
];
