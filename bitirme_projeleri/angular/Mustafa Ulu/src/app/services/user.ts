import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/users`);
  }

  createUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.API}/users`, payload);
  }
}
