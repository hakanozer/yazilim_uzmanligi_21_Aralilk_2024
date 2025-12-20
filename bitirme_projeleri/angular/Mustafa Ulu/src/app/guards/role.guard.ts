import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user =
    typeof (auth as any).getCurrentUser === 'function'
      ? (auth as any).getCurrentUser()
      : (auth as any).currentUser ?? null;

  // Login yoksa
  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  // Instructor değilse
  if (user.role !== 'instructor') {
    router.navigate(['/courses']);
    return false;
  }

  return true;
};
