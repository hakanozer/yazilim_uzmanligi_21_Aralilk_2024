import { inject } from '@angular/core';
import { Api } from './services/api';
import { CanActivateFn } from '@angular/router';
import { Util } from './utils/util';

export const authGuard: CanActivateFn = (route, state) => {
  const stToken = localStorage.getItem('token');
  const userId = Number(localStorage.getItem('userId')); // ✅ userId alındı

  if (stToken && userId) {
    const api = inject(Api);

    api.userProfile(userId).subscribe({
      next: (user) => {
        Util.username = user.name; // ✅ direkt user.name alıyoruz
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
