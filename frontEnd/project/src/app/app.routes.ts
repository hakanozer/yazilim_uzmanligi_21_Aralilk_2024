import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Products } from './pages/products/products';
import { authGuard } from './auth-guard';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
    { path: "", component: Login },
    { path: "register", component: Register },
    { path: "products", component: Products, canActivate: [authGuard] },
    { path: "product-detail/:id", component: ProductDetail, canActivate: [authGuard] },
];
