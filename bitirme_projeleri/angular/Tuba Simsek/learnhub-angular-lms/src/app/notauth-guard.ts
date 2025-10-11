import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Api } from './services/api';
import { lastValueFrom } from 'rxjs';

export const notauthGuard: CanActivateFn = async (route, state) => {
  const api = inject(Api);
  const stToken = localStorage.getItem('token');
  const userId = Number(localStorage.getItem('userId')); // ✅ userId alındı

  if (stToken && userId) {
    try {
      const res = await lastValueFrom(api.userProfile(userId)); // ✅ userProfile çağrısı düzeltildi
      if (res) {
        window.location.replace('/courses'); // Kullanıcı zaten giriş yapmışsa /courses sayfasına yönlendir
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.reload();
      return true;
    }
  }

  return true;
};
