import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userURL } from '../utils/serviceURL';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Login Services
  userLogin(username:string, password:string) {
    const sendObj = { 
      username: username,
      password: password
    }
    return this.http.post(userURL.login,sendObj) 
  }

}

