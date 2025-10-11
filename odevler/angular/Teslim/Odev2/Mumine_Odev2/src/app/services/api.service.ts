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

//page → Kullanıcının istediği sayfa numarası (ör. 1, 2, 3 …).

//per_page → Bir sayfada kaç ürün gösterileceği.


/**
 limit → API’ye kaç ürün istediğini söylüyor.

Örn: per_page = 10 → her sayfada 10 ürün getir.

skip → Kaç ürünü atlayarak başlaması gerektiğini söylüyor.

Formül: (page - 1) * per_page

Örn:

page = 1, per_page = 10 → skip = 0 → ilk 10 ürün gelir.

page = 2, per_page = 10 → skip = 10 → ilk 10’u atla, 11–20 arasını getir.

page = 3, per_page = 10 → skip = 20 → 21–30 arasını getir. */


