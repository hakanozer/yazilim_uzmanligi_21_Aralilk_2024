import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl, productUrl } from '../utils/apiUrl';
import { IUser } from '../models/IUser';
import { IProducts, ISingleproduct, IProduct } from '../models/IProducts';
import { Review } from '../models/Icomments';


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
  allProducts(page: number, per_page: number)
  {
    const sendObj = 
    {
      page: page,
      limit: per_page
    }
    return this.http.get<IProducts>('https://dummyjson.com/products', { params: sendObj });
  }
  productById(id: number) {
  return this.http.get<IProduct>(`https://dummyjson.com/products/${id}`);
  }
  commentsById(id: number) {
    return this.http.get<Review>(`https://dummyjson.com/products/${id}/reviews`);
  }



}
