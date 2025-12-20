import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type Role = 'student' | 'instructor' | '';

export interface User {
  id: number | string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<Role>('');
  private userIdSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    const raw = localStorage.getItem('auth_user');
    if (raw) {
      try {
        const u: User = JSON.parse(raw);
        this.loggedInSubject.next(true);
        this.roleSubject.next(u.role);
        this.userIdSubject.next(Number(u.id));
      } catch {}
    }
  }

  // ====== MODERN KULLANIM ======
  get isLoggedInValue(): boolean {
    return this.loggedInSubject.value;
  }

  get role(): Role {
    return this.roleSubject.value;
  }

  get userId(): number {
    return this.userIdSubject.value;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`;

    return new Observable<boolean>((subscriber) => {
      this.http.get<User[]>(url).subscribe({
        next: (users) => {
          const user = users?.[0];
          if (!user) {
            this.clearSession();
            subscriber.next(false);
            subscriber.complete();
            return;
          }

          localStorage.setItem('auth_user', JSON.stringify(user));
          this.loggedInSubject.next(true);
          this.roleSubject.next(user.role);
          this.userIdSubject.next(Number(user.id));

          subscriber.next(true);
          subscriber.complete();
        },
        error: () => {
          this.clearSession();
          subscriber.next(false);
          subscriber.complete();
        },
      });
    });
  }

  logout(): void {
    this.clearSession();
  }

  // ====== BACKWARD COMPAT (ESKİ KODLAR İÇİN) ======
  getCurrentUser(): User | null {
    const raw = localStorage.getItem('auth_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getRole(): Role {
    return this.roleSubject.value;
  }

  // ====== HELPERS ======
  private clearSession(): void {
    localStorage.removeItem('auth_user');
    this.loggedInSubject.next(false);
    this.roleSubject.next('');
    this.userIdSubject.next(0);
  }
}
