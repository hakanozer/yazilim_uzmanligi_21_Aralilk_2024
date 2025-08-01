import { Routes } from '@angular/router';
import { Products } from './components/products/products';
import { ProductDetails } from './components/product-details/product-details';

export const routes: Routes = [
    { path: "", component: Products },
    { path: "products", component: Products, },
    { path: "product-detail/:id", component: ProductDetails },
];