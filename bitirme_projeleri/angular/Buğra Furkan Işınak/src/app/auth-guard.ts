import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot,Router  } from '@angular/router';
import { inject } from '@angular/core';
import { Api } from './services/api';
import { Util } from './utils/util';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const stToken = localStorage.getItem('token');
     const router = inject(Router);
    if (!stToken) {
       router.navigate(['/login']);
      return false;
    }

    const api = inject(Api);

    return new Promise<boolean>((resolve) => {
      api.userProfileSync().subscribe({
        next: (user: any) => {
          const item = user as any;
          Util.username = item.name;
          Util.role = item.role;

          if (allowedRoles.includes(item.role)) {
            resolve(true);
          } else {
            // yetkisiz → yönlendir
            router.navigate(['/login']);
            resolve(false);
          }
        },
        error: () => {
          localStorage.removeItem('token');
           router.navigate(['/login']); 
          resolve(false);
        }
      });
    });
  };
}
