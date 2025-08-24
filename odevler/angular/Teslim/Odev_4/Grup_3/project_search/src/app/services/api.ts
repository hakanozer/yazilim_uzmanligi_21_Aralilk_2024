import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { commentUrl, newslatterUrl, productUrl, searchUrl, usersUrl, userUrl } from '../utils/apiUrl';
import { IUser } from '../models/IUser';
import { IProducts, ISingleProduct } from '../models/IProducts';
import { IComments } from '../models/IComments';
import { IUsers } from '../models/IUsers';
import { Observable } from 'rxjs';
import { ISearch } from '../models/ISearch';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor( private http: HttpClient ) { }

  userLogin(email: string, password: string) {
    const sendObj = {
      email: email,
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

  userProfile() {
    const jwt = localStorage.getItem('token') ?? '';
    const headers = { 'Authorization': `Bearer ${jwt}` };
    return this.http.get<IUser>(userUrl.profile, { headers });
  }

  userProfileSync() {
    const jwt = localStorage.getItem('token') ?? '';
    const headers = { 'Authorization': `Bearer ${jwt}` };
    return this.http.get<IUser>(userUrl.profile, { headers }).pipe()
  }

  userLogout() {
    const jwt = localStorage.getItem('token') ?? '';
    const headers = { 'Authorization': `Bearer ${jwt}` };
    return this.http.post(userUrl.logout, {}, {headers: headers});
  }

  // Query String
  allProducts(page: number, per_page: number) {
    const sendObj = {
      page: page,
      per_page: per_page
    }
    return this.http.get<IProducts>(productUrl.products, {params: sendObj})
  }

  // Path Variable 
  productById(id: number) {
    const url = `${productUrl.products}/${id}`
    return this.http.get<ISingleProduct>(url)
  }

  // comment
  productComment(page: number, per_page: number) {
    const sendObj = {
      page: page,
      per_page: per_page
    }
    return this.http.get<IComments>(commentUrl.comments, {params: sendObj})
  }

  newsletterControl(email: string) {
    const sendObj = {
      email: email
    }
    return this.http.get(newslatterUrl.news, {params: sendObj})
  }

  newslatterAdd(email: string) {
    const sendObj = {
      email: email
    }
    return this.http.post(newslatterUrl.news, sendObj)
  }

  users(page: number, per_page: number){
    const sendObj = {
      page: page,
      per_page: per_page
    }
    const jwt = localStorage.getItem('token') ?? '';
    const headers = { 'Authorization': `Bearer ${jwt}` };
    return this.http.get<IUsers>(usersUrl.users, {headers: headers, params: sendObj})
  }
  SearchProducts(query: string, page:number, per_page: number){
    const sendObj = {
      query:query,
      page: page,
      per_page: per_page
    }
    return this.http.get<ISearch>(searchUrl.search, {params: sendObj})
  }
  

}