import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productUrl, userURL } from '../utils/serviceURL';
import { IProduct, IProductResponse } from '../models/IProduct';


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

  // Product Services
  allproducts(title: number, price:number) {
    const sendObj = {
      title:title,
      price:price
    }
    return this.http.get<IProductResponse>(productUrl.products, {params: sendObj})
  }

}

