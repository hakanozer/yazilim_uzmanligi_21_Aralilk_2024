import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userUrl } from '../utils/apiUrl';
//import { IUser } from '../models/IUser';
import { productUrl } from '../utils/apiUrl';
//import { IProducts, } from '../models/IProducts';
import { ISingleProduct } from '../models/IProducts';
import { IComment } from '../models/IComment';
import { map } from 'rxjs/operators'; // map operatörünü  RxJS kütüphanesinden içe aktardım



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
    return this.http.post(userUrl.login, sendObj);
  }
 

  userRegister(name: string, username: string, password: string) {
    const sendObj = {
      name: name,
      username: username,
      password: password
    }
  return this.http.post(userUrl.register, sendObj)
  }

  allProducts(page: number, per_page: number) {
  const skip = (page - 1) * per_page;
  const params = {
    limit: per_page,
    skip
  };

  return this.http.get<any>('https://dummyjson.com/products', { params });
}

getSingleProduct(id: number) {
  return this.http.get<ISingleProduct>(`${productUrl.single}${id}`);


}

getCommentsForProduct(productId: number) {
  return this.http.get<{ comments: IComment[] }>('https://dummyjson.com/comments')
    .pipe(
      map(res => {
        // Basit eşleştirme: Her ürün ID’si için yorum ID % 10 == productId % 10 ise göster
        return res.comments.filter(c => c.postId % 10 === productId % 10);
      })
    );
}


getProductComments(productId: number) {
  return this.http.get<IComment[]>(`https://dummyjson.com/comments/post/${productId}`);
}


}