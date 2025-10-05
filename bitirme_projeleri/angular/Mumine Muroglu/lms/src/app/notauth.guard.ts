import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';
import { lastValueFrom } from 'rxjs';

export const notauthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const user = await lastValueFrom(authService.userProfileSync());
      if (user) {
        // Zaten giriş yapmış kullanıcıları home'a yönlendir
        window.location.replace('/home');
        return false;
      }
    } catch (error) {
      // Hata durumunda localStorage temizle ve sayfayı yeniden yükle
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      window.location.reload();
      return true;
    }
  }

  // Giriş yapmamış kullanıcılar için izin ver
  return true;
};
