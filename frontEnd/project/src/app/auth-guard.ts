import { CanActivateFn } from '@angular/router';
import { Api } from './services/api';
import { inject } from '@angular/core';
import { Util } from './utils/util';

export const authGuard: CanActivateFn = (route, state) => {
  const stToken = localStorage.getItem('token')
    if (stToken) {
      const api = inject(Api);
      api.userProfile().subscribe({
        next: (user) => {
          const item = user.data as any
          Util.username = item.name
        },
        error: () => {
          localStorage.removeItem('token')
          window.location.replace('/')
        }
      });
      return true
    }else {
      window.location.replace('/')
      return false
    }
    
};
