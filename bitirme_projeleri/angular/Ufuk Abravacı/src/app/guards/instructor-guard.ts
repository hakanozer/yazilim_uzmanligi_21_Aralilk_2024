import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const instructorGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const user = authService.user();

  if(user && user.role === "instructor") {
    return true;
  }
  //instructor yetkisi yoksa login sayfasına yönlendirdik.
  //Buraya not-authorized şeklinde bir sayfa oluşturulabilir.
  router.navigate(["login"]);
  return false;
};
