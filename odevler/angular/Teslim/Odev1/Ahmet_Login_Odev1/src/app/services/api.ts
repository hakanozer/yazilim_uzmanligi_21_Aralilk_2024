import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl } from '../utils/apiUrl';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) { }

  userLogin(username: string, password: string) {
    const sendObj = {
      username: username,
      password: password,
    }
    // Remove withCredentials: true
    return this.http.post<IUser>('https://dummyjson.com/auth/login', sendObj);
  }

  userRegister(name: string, username: string, password: string) {
    const sendObj = {
      name: name,
      username: username,
      password: password
    }
    // Use the correct endpoint for registration
    return this.http.post('https://dummyjson.com/users/add', sendObj);
  }
}
