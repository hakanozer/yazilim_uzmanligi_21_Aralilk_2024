import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard = (allowedRoles: ('student' | 'instructor')[]): CanActivateFn => {
  return (route, state) => {
    const router = inject(Router)
    
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role') // login.ts’de kaydetmiştik

    // Token veya rol yoksa → login’e yönlendir
    if (!token || !role) {
      router.navigate(['/login'])
      return false;
    }

    // Kullanıcının rolü izin verilen roller içinde mi?
    if (allowedRoles.includes(role as 'student' | 'instructor')) {
      return true
    }

    // Yanlış role sahipse → erişim yok, login’e yönlendir
    router.navigate(['/courses'])
    return false
  };
};
