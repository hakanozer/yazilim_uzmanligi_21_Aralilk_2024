import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/product-detail/product-detail';
import { notauthGuard } from './notauth-guard';
import { Notfound } from './pages/notfound/notfound';
import { Users } from './pages/users/users';
import { Search } from './pages/search/search';
import { Dashboard } from './pages/dashboard/dashboard';

import { roleGuard } from './auth-guard';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: "register", component: Register, canActivate: [notauthGuard] },
  { path: "login", component: Login, canActivate: [notauthGuard] },
  { path: "dashboard", component: Dashboard, canActivate: [roleGuard(['admin','student','instructor'])] },
  { path: "products", component: Products, canActivate: [roleGuard(['student','admin','instructor'])] },
  { path: "product-detail/:id", component: ProductDetail, canActivate: [roleGuard(['student','admin','instructor'])] },
  { path: "users", component: Users, canActivate: [roleGuard(['admin','instructor'])] },
  { path: "search", component: Search, canActivate: [roleGuard(['student','admin','instructor'])] },
  { path: "profile", component: Profile, canActivate: [roleGuard(['student','admin','instructor'])] },
  { path: "", component: Dashboard, canActivate: [roleGuard(['admin','student','instructor'])] },
  { path: "**", component: Dashboard, canActivate: [roleGuard(['admin','student','instructor'])] },
];
