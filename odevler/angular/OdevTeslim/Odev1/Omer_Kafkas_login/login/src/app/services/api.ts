import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers } from '../models/IUsers';
import { userUrl } from '../utils/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor (private http: HttpClient){}

  /**
    const loginPayload = {
      username: email,
      password: password
    }
    return this.http.post<IUsers>(userUrl.login, loginPayload)
   */
  userLogin(email: string, password: string){
    const sendObj = {
      username: email,
      password: password
    }
    return this.http.get<IUsers>(userUrl.login)
  }
}
