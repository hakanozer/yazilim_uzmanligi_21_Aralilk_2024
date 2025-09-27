import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  
  teacherOrAdminRole = false

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

    // Admin veya teacher rolüne sahip olup olmadığını kontrol et
    if (this.authService.hasAnyRole(['admin', 'teacher'])) {
      this.teacherOrAdminRole = true
      return true;
    }

    // Yetkisiz erişim - ana sayfaya yönlendir
    this.router.navigate(['/unauthorized']);
    alert('You are not authorized to access this page.');
    console.log('Yetkisiz TeacherGuard')
    return false;
  }
}