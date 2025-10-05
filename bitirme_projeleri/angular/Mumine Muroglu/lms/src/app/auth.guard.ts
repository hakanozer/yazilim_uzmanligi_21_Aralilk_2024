import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Util } from './utils/util';

export const authGuard: CanActivateFn = (route, state) => {
  const stToken = localStorage.getItem('token');
  if (stToken) {
    const authService = inject(AuthService);
    authService.userProfileById().subscribe({
      next: (user) => {
        Util.username = user.name; // kullanıcı adı kaydediliyor
      },
      error: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.replace('/');
      }
    });
    return true;
  } else {
    window.location.replace('/');
    return false;
  }
};