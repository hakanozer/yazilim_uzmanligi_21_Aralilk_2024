import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface UserDto {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  profilePhoto?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:3000';

  // basit auth state
  readonly currentUser = signal<UserDto | null>(null);

  register(user: Omit<UserDto, 'id'>): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.api}/users`, user);
  }

  login(email: string, password: string): Observable<UserDto | null> {
    return this.http
      .get<UserDto[]>(`${this.api}/users`, { params: { email } })
      .pipe(
        map(list => {
          const found = list.find(u => u.password === password);
          this.currentUser.set(found ?? null);
          return found ?? null;
        })
      );
  }

  logout() {
    this.currentUser.set(null);
  }
}