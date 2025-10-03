import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface UserDto {
  id?: string | number;
  name: string;
  surname: string;
  email: string;
  password: string;
  profilePhoto?: string;
  role?: 'student' | 'instructor' | 'admin';
  bio?: string;
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  private http = inject(HttpClient);
  private readonly api = environment.apiBaseUrl;

  // localStorage destekli auth state
  readonly currentUser = signal<UserDto | null>(this.loadUserFromStorage());

  private loadUserFromStorage(): UserDto | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }


  register(user: Omit<UserDto, 'id'>): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.api}/users`, user);
  }


  login(email: string, password: string): Observable<UserDto | null> {
    return this.http
      .get<UserDto[]>(`${this.api}/users`, { params: { email } })
      .pipe(
        map(list => {
          const found = list.find(u => u.password === password);
          if (found) {
            // Parolayı client storage'a koyma
            const { password, ...safeUser } = found as any;
            this.currentUser.set(safeUser);
            localStorage.setItem('currentUser', JSON.stringify(safeUser));
          } else {
            this.currentUser.set(null);
            localStorage.removeItem('currentUser');
          }
          return found ?? null;
        })
      );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }
}