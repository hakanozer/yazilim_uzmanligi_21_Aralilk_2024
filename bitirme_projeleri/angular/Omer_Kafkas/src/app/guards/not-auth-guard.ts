import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const notAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const raw = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
  if (raw) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
