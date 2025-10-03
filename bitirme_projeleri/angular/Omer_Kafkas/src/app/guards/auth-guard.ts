import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const raw = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
  if (!raw) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
