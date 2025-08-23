import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Products } from './pages/products/products';
import { authGuard } from './auth-guard';
import { ProductDetail } from './pages/product-detail/product-detail';
import { notauthGuard } from './notauth-guard';
import { Notfound } from './pages/notfound/notfound';
import { Users } from './pages/users/users';
import { Search } from './pages/search/search';

export const routes: Routes = [
    { path: "", component: Login, canActivate: [notauthGuard] },
    { path: "register", component: Register, canActivate: [notauthGuard] },
    { path: "products", component: Products, canActivate: [authGuard] },
    { path: "product-detail/:id", component: ProductDetail, canActivate: [authGuard] },
    { path: "users", component: Users, canActivate: [authGuard] },
    { path: "search", component: Search, canActivate: [authGuard] },
    { path: "**", component: Notfound}
];
