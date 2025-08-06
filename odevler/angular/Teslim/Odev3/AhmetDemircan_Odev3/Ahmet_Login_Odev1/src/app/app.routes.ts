// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { Product } from './Pages/products/products';
import { ProductDetail } from './components/product-detail/product-detail';
import { NotFound } from './Pages/not-found/not-found';
import { pompeyGuard } from './pompey-guard';


export const routes: Routes = [
  { path: "", component: Login, canActivate: [pompeyGuard] },
  { path: "products", component: Product, canActivate: [pompeyGuard] },
  { path: "product-detail/:id", component: ProductDetail, canActivate: [pompeyGuard] },
  { path: 'not-found', component: NotFound },
  { path: '**', redirectTo: 'not-found' }
];
