import { CanActivateFn } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Api } from './services/api';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

export const pompeyGuard: CanActivateFn = async (route, state) => {
  console.log('Guard çalıştı, state:', state.url);
  const api = inject(Api);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem('token');
  if (token) {
    try {
      const res = await lastValueFrom(api.userProfileSync());
      console.log('userProfileSync sonucu:', res);

      // Eğer kullanıcı zaten products sayfasına gitmeye çalışıyorsa yönlendirme yapma
      if (res && state.url === '/') {
        await router.navigate(['/products']);
        return false; // login'e erişme
      }

      return true; // products gibi sayfalara erişim izni ver
    } catch (error) {
      console.error('Guard içinde hata:', error);
      localStorage.removeItem('token');
    }
  }

  return true;
};