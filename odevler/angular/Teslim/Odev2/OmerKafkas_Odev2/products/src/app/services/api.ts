import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts, Product } from '../models/IProducts';
import { productsUrl } from '../utils/apiUrl';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Api {

constructor(private http:HttpClient) {}

  getProducts(limit: number, skip: number): Observable<IProducts> {
    
    const sendObj = {
      limit: limit,
      skip: skip
    }
    return this.http.get<IProducts>(productsUrl.products, {params: sendObj});
  }

  productsById(id: number){
    const url = `${productsUrl.products}/${id}`;
    return this.http.get<Product>(url);
  }
  
}
