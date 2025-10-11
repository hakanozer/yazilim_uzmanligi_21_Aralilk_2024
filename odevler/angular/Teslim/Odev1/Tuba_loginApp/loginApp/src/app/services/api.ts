import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl } from '../utils/apiUrl';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) { }

  userLogin(email: string, password: string) {
    const sendObj = {
      username: email,
      password: password
    }
    return this.http.post<IUser>(userUrl.login, sendObj)
  }
  userRegister(name: string, email: string, password: string) {
    const sendObj = {
      name: name,
      email: email,
      password: password
    }
    return this.http.post(userUrl.register, sendObj)
  }

}