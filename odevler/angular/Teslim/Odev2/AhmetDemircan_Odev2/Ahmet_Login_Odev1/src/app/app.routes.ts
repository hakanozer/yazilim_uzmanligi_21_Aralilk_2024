// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { Product } from './Pages/products/products';
import { ProductDetail } from './Pages/product-detail/product-detail';
import { NotFound } from './Pages/not-found/not-found';


export const routes: Routes = [
  { path: "", component: Login },
  { path: "products", component: Product },
  { path: "product-detail/:id", component: ProductDetail },
  { path: 'not-found', component: NotFound },
  { path: '**', redirectTo: 'not-found' }
];
