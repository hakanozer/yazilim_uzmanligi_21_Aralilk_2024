import { Routes } from '@angular/router';
import { Products } from './components/products/products';
import { ProductDetails } from './components/product-details/product-details';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', component:Products },
    {path: 'products/:id', component:ProductDetails},
    {path: '**', redirectTo:'products', pathMatch:'full'}
];
