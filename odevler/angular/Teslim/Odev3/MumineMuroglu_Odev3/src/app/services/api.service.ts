import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productUrl, userUrl } from '../utils/apiUrl';
import { IUser } from '../models/IUser';
import { IProduct, Product } from '../models/IProduct';


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


allProduct(page: number, per_page: number){
  const sendObj={
    skip : (page - 1) * per_page,
    limit: per_page
  }
  return this.http.get<IProduct>(productUrl.product ,{params:sendObj})
}




productById(id:number){ 
  const url= `${productUrl.product}/${id}`
  return this.http.get<Product>(url)

}

}



