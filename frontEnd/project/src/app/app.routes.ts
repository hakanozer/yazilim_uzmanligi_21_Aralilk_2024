import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Products } from './pages/products/products';

export const routes: Routes = [
    { path: "", component: Login },
    { path: "register", component: Register },
    { path: "products", component: Products },
];
