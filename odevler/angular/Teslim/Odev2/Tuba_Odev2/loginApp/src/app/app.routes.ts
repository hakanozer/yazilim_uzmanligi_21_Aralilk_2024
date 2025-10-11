import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
//import { register } from './pages/register/register';
import { Products } from './pages/products/products';
import { ProductDetail } from './components/product-detail/product-detail';


export const routes: Routes = [
    {path: "", component: Login},
    //{path: "register", component: register},
    {path: "products", component: Products},
    { path: 'products/:id', component: ProductDetail }, // detay

    ];