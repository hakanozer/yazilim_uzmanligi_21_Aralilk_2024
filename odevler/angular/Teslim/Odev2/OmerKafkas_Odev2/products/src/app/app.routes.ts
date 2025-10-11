import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { ProductsDetail } from './pages/products-detail/products-detail';

export const routes: Routes = [
    {path:"", component: Products},
    {path: "products-detail/:id", component: ProductsDetail}
];
