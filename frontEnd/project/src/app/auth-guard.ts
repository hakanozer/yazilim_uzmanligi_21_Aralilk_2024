import { CanActivateFn } from '@angular/router';
import { Api } from './services/api';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const stToken = localStorage.getItem('token')
    if (stToken) {
      const api = inject(Api);
      api.userProfile().subscribe({
        next: (user) => {
          
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
