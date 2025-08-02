import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { authUrl } from '../../utils/apiUrl';
import { ILoginRequest } from '../../models/ILoginRequest';
import { ILoginResponse } from '../../models/ILoginResponse';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient)

  userLogin(credentials: ILoginRequest){
    return this.http.post<ILoginResponse>(authUrl.login,credentials)
  }
}
// , {
//       withCredentials: true
//     }