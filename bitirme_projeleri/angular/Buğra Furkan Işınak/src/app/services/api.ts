import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { commentUrl, newslatterUrl, productUrl, searchUrl, usersUrl, userUrl } from '../utils/apiUrl';
import { IUser } from '../models/IUser';
import { Product, ISingleProduct } from '../models/IProducts';
import { IComments } from '../models/IComments';
import { IUsers } from '../models/IUsers';
import { Observable, switchMap } from 'rxjs';
import { ISearch } from '../models/ISearch';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: number; // veya string olabilir
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor( private http: HttpClient ) { }

userLogin(email: string, password: string) {
  return this.http.post<{ accessToken: string, user: any }>(
    `${userUrl.login}`,  // yani http://localhost:3000/login
    { email, password }
  );
}
  
userRegister(data:any) {
  return this.http.post<{ accessToken: string, user: any }>(
    `${userUrl.register}`,  // yani http://localhost:3000/register
    data
  );
}

  //   userProfile() {
  //   // localStorage'daki user bilgisini döndür
  //   const userStr = localStorage.getItem('token');
  //   let user: any = null;
  //   try {
  //     user = userStr ? JSON.parse(userStr) : null;
  //   } catch (e) {
  //     user = null;
  //   }
  //   // json-server-auth ile uyumlu olması için { data: user } şeklinde döndür
  //   return new Observable((observer) => {
  //     if (user) {
  //       observer.next({ data: user });
  //       observer.complete();
  //     } else {
  //       observer.error('No user');
  //     }
  //   });
  // }


; 

  userProfileSync() {
    const jwt = localStorage.getItem('token') ?? '';
    const token = localStorage.getItem('token') ?? '';
    const decoded = jwtDecode<JwtPayload>(token);
    const userId = decoded.sub;
    return this.http.get<IUser>(`${userUrl.profile}/${userId}`).pipe()
  }

  userLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

  }

  // Query String
allProducts(page: number, per_page: number) {
  return this.http.get<Product[]>(productUrl.products, {
    params: {
      _page: page,
      _limit: per_page
    },
    observe: 'response' // <-- meta bilgileri header'dan almak için
  });
}
  // Path Variable 
  productById(id: number) {
    const url = `${productUrl.products}/${id}`
    return this.http.get<ISingleProduct>(url)
  }

  // comment
  productComment(page: number, per_page: number,postId: number = 1): Observable<any> {
    const sendObj = {
      post_id: postId,
      page: page,
      per_page: per_page
    }
    return this.http.get<IComments>(commentUrl.comments, {params: sendObj,observe: 'response' })
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
    
    return this.http.get<IUsers>(usersUrl.users, {headers: headers, params: sendObj,observe: 'response' })
  }
  SearchProducts(query: string, page:number, per_page: number){
    const sendObj = {
      query:query,
      page: page,
      per_page: per_page
    }
    return this.http.get<ISearch>(searchUrl.search, {params: sendObj})
  }

  stockUpdate(productId: number, stock: number) {
        const jwt = localStorage.getItem('token') ?? '';
    const headers = { 'Authorization': `Bearer ${jwt}` };
    return this.http.patch(
      `${productUrl.products}/${productId}`,
      { stock: stock },
      { headers }
    );
  }
  updateUsersProducts(user: any, productId: number,stock?: number) {
    const jwt = localStorage.getItem('token') ?? '';
    const headers = { 'Authorization': `Bearer ${jwt}` };
   
  this.http.patch(
      `${productUrl.products}/${productId}`,
      { stock: stock },
      { headers }
    );
     return this.http.patch(
      `${usersUrl.users}/${user.id}`,
      { courses:user.courses },
      { headers }
    );

  }
  
  updateUsersLessons(user: any) {
    const jwt = localStorage.getItem('token') ?? '';
    const headers = { 'Authorization': `Bearer ${jwt}` };

    return this.http.patch(
      `${usersUrl.users}/${user.id}`,
      { lessons:user.lessons },
      { headers }
    );
  }

  addProduct(data:any) {
  return this.http.post(
        `${productUrl.products}`,
        data
      );
  }
    addComment(data:any) {
  return this.http.post(
        `${commentUrl.comments}`,
        data
      );
  }
}