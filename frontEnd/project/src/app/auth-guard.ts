import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const stToken = localStorage.getItem('token')
    if (stToken) {
      return true
    }
    window.location.replace('/')
    return false
};
