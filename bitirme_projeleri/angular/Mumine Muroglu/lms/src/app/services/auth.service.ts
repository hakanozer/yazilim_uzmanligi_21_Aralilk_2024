import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl } from '../utils/apiUrl';
import { IUser } from '../models/IUser';
import {  catchError, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  //Login Fonksiyonu
  loginUser(email: string, password: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(userUrl.users, { params: { email, password }
    });
  }

  //Register Fonksiyonu
  userRegister(name: string, email: string, password: string,role:string): Observable<IUser> {
    const sendObj = {
      name: name,
      email: email,
      password: password,
      role: role
    };
    return this.http.post<IUser>(userUrl.users, sendObj);
  }

// ID’ye göre kullanıcı profili
  userProfileById(): Observable<IUser> {
    const userId = localStorage.getItem('userId') ?? '';
    const url = `${userUrl.users}/${userId}`; 
    return this.http.get<IUser>(url);}


// Kullanıcı profilini senkronize eden fonksiyon (hata durumunda null döner)
   userProfileSync(): Observable<IUser | null> {
    return this.userProfileById().pipe( 
      catchError(err => {
        console.error('User profile hatası:', err); 
        return of(null);
      })
    );
  }

  //Kullanıcı updatini sağlayan metod
  updateUser(id: string, data: Partial<IUser>): Observable<IUser> {
  return this.http.patch<IUser>(`${userUrl.users}/${id}`, data);
  }

  //Şifre güncelleme metodu
  updatePassword(id: string, newPassword: string): Observable<any> {
  return this.http.patch(`${userUrl.users}/${id}`, { password: newPassword });
  }

  // Tüm kullanıcıları getiren metod
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(userUrl.users);
  }

}