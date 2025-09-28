import { inject, Injectable, signal } from '@angular/core';
import { PublicUser, UserRegisterDto } from '../models/User';
import { AuthResponse } from '../models/AuthResponse';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../utils/apiUrl';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  private router = inject(Router);
  readonly token = signal<string | null>(localStorage.getItem("token"));
  readonly user = signal<PublicUser | null>(localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')!) : null)

  register(payload: UserRegisterDto) {
    return this.http.post<AuthResponse>(`${endpoints.auth.register}`, payload)
  }

  //loginden sonra çağrılacak. hem localstorage'a hem signal'a değerleri ayarlıyoruz.
  login(res: AuthResponse) {
    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("user", JSON.stringify(res.user));
    this.token.set(res.accessToken);
    this.user.set(res.user);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.token.set(null);
    this.user.set(null);
    this.router.navigate(['/'])
  }

  isLoggedin():boolean {
    return this.token() ? true : false
  }
}
