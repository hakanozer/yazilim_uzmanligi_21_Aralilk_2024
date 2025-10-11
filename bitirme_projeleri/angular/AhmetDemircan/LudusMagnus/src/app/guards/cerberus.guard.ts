import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CerberusGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Önce basit login kontrolü
    if (!this.authService.isLoggedIn()) {
      console.log('CerberusGuard: Kullanıcı giriş yapmamış, login sayfasına yönlendiriliyor');
      this.router.navigate(['/login']);
      return false;
    }

    // Token doğrulama
    return this.authService.validateCurrentToken().pipe(
      map(isValid => {
        if (isValid) {
          console.log('CerberusGuard: Token geçerli, erişim izni verildi');
          return true;
        } else {
          console.log('CerberusGuard: Token geçersiz, login sayfasına yönlendiriliyor');
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(error => {
        console.error('CerberusGuard: Token doğrulama hatası:', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}