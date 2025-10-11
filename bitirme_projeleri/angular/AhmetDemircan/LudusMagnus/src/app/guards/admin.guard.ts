import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Önce kullanıcının giriş yapmış olup olmadığını kontrol et
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    // Admin rolüne sahip olup olmadığını kontrol et
    if (this.authService.isAdmin()) {
      return true;
    }

    // Yetkisiz erişim - ana sayfaya yönlendir
    this.router.navigate(['/unauthorized']);
    alert('You are not authorized to access this page.');
    return false;
  }
}