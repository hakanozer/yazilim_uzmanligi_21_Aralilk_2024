import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Api } from './services/api';
import { lastValueFrom } from 'rxjs';

export const notauthGuard: CanActivateFn = async (route, state) => {
  const api = inject(Api);
  const stToken = localStorage.getItem('token')
   const router = inject(Router);
  if (stToken) {
    try {
      const res = await lastValueFrom( api.userProfileSync() )
      if(res) {
        // window.location.replace('/dashboard')
        return false
      }
    } catch (error) {
      localStorage.removeItem('token')
      // window.location.reload()
      router.navigate(['/login']);
      return true
    }
  }
  return true
};
