import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  token$: Observable<string | null>;

  private userSubject: BehaviorSubject<any>;
  user$: Observable<any>;

  constructor() {
    // token güvenli al
    const token = localStorage.getItem('token') ?? null;
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.token$ = this.tokenSubject.asObservable();

    // user güvenli al
    const storedUser = this.getUserFromStorage();
    this.userSubject = new BehaviorSubject<any>(storedUser);
    this.user$ = this.userSubject.asObservable();
  }

  private getUserFromStorage(): any {
    const data = localStorage.getItem('user');
    if (!data || data === 'undefined' || data === '') return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("localStorage 'user' parse hatası:", e, data);
      return null;
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  setUser(user: any) {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    } catch (e) {
      console.error("localStorage 'user' yazılırken hata:", e);
    }
  }

  clearUser() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
