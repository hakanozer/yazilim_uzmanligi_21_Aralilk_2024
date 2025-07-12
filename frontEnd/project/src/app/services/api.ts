import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl } from '../utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) { }

  userLogin(email: string, password: string) {
    const sendObj = {
      email: email,
      password: password
    }
    return this.http.post(userUrl.login, sendObj)
  }



}