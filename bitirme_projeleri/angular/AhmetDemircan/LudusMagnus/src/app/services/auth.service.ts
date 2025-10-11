import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, catchError, of, tap, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { IUser } from '../models/IUser';
import { IToken } from '../models/IToken';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkStoredAuth();
  }

  // Giriş yap
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          const user = users[0];
          
          // ID kontrolü ekle
          if (!user.id) {
            console.error('User ID is missing');
            return of(false);
          }
          
          // aktifmi diye kontrol et
          if (user.isActive === false) {
            console.error('User account is inactive');
            return of(false);
          }
          
          // Token oluştur - ID artık string olduğu için Number() kaldırıldı
          return this.tokenService.generateToken(user.id).pipe(
            map(tokenResponse => {
              // Kullanıcı bilgilerini kaydet
              this.currentUserSubject.next(user);
              this.isAuthenticatedSubject.next(true);
              
              // localStorage'a kaydet (sadece browser'da)
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('authToken', tokenResponse.token);
              }
              
              return true;
            }),
            catchError(error => {
              console.error('Token generation failed:', error);
              return of(false);
            })
          );
        } else {
          return of(false);
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  // Çıkış yap
  logout(): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser && currentUser.id) {
      // Kullanıcının tüm token'larını sil
      this.tokenService.deleteUserTokens(currentUser.id).subscribe();
    }
    
    // localStorage'ı sadece browser ortamında temizle
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    }
    
    // State'i sıfırla
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    
    // Login sayfasına yönlendir
    this.router.navigate(['/']);
  }

  // Giriş yapılmış mı kontrol et
  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return this.isAuthenticatedSubject.value && !!localStorage.getItem('authToken');
  }

  // Mevcut kullanıcıyı getir
  getCurrentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  // Mevcut token'ı doğrula
  validateCurrentToken(): Observable<boolean> {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.id || !isPlatformBrowser(this.platformId)) {
      return of(false);
    }
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      return of(false);
    }
  
    return this.tokenService.validateToken(token, currentUser.id).pipe(
      map(isValid => {
        if (!isValid) {
          this.logout();
        }
        return isValid;
      }),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  // Token yenile
  refreshToken(): Observable<boolean> {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.id || !isPlatformBrowser(this.platformId)) {
      return of(false);
    }
  
    // ID artık string olduğu için direkt kullanılıyor
    return this.tokenService.generateToken(currentUser.id).pipe(
      map(newToken => {
        localStorage.setItem('authToken', newToken.token);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  // Sayfa yüklendiğinde localStorage'dan auth durumunu kontrol et
  private checkStoredAuth(): void {
    // Sadece browser ortamında localStorage'a eriş
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
  
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('authToken');
  
    if (storedUser && storedToken) {
      try {
        const user: IUser = JSON.parse(storedUser);
        
        // ID kontrolü ekle
        if (!user.id) {
          console.error('Stored user ID is missing');
          this.logout();
          return;
        }
        
        // Token'ı doğrula
        this.tokenService.validateToken(storedToken, user.id).subscribe({
          next: (isValid) => {
            if (isValid) {
              this.currentUserSubject.next(user);
              this.isAuthenticatedSubject.next(true);
            } else {
              this.logout();
            }
          },
          error: () => {
            this.logout();
          }
        });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    }
  }

  // Kullanıcının rolünü getir
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  // Belirli bir role sahip mi kontrol et
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  // Birden fazla rolden birine sahip mi kontrol et
  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  }

  // Admin mi kontrol et
  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  // Teacher mi kontrol et
  isTeacher(): boolean {
    return this.hasRole('teacher');
  }

  // Student mi kontrol et
  isStudent(): boolean {
    return this.hasRole('student');
  }
}