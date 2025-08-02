import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { productURL } from '../../utils/apiUrl';
import { IProduct, IProductResponse } from '../../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private httpClient = inject(HttpClient)
//  'https://dummyjson.com/products?limit=10&skip=10'
  getProducts(limit: number, skip: number) {
    return this.httpClient.get<IProductResponse>(`${productURL.products}?limit=${limit}&skip=${skip}`)
  }

  getProductById(id:number) {
    return this.httpClient.get<IProduct>(`${productURL.productById(id)}`)
  }
}
