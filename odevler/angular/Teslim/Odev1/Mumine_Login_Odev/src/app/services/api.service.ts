import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl } from '../utils/apiUrl';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(private http:HttpClient) { }

userLogin(username: string,password: string){

        const sendObj={
          username: username,
          password: password
          
        }
        return this.http.post<IUser>(userUrl.login,sendObj)

}
}



