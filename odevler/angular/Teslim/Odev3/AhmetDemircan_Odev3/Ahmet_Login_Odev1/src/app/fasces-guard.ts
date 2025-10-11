import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Api } from './services/api';
import { Util } from './utils/Util';

export const fascesGuard: CanActivateFn = (route, state) => {
  const stToken = localStorage.getItem('token');
  if (stToken) {
    const api = inject(Api);
    api.userProfile().subscribe({
      next: (user) => {
        const item = user as any
        Util.username = item.name
      },
      error: () =>{
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    });
    return true;
  }else{
    window.location.replace('/');
    return false;
  }
};
