import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    {path: "", component:LoginComponent},
    {path: "product", component:ProductComponent}
];
