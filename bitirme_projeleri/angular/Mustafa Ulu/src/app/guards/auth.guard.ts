import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn =
    typeof (auth as any).isLoggedIn === 'function'
      ? (auth as any).isLoggedIn()
      : (auth as any).isLoggedInValue ?? false;

  if (isLoggedIn) return true;

  router.navigate(['/login']);
  return false;
};
