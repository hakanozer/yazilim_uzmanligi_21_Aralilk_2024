import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const raw = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
  const user = raw ? JSON.parse(raw) : null;
  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  const expected: string[] = route.data?.['roles'] || [];
  if (expected.length && !expected.includes(user.role)) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
