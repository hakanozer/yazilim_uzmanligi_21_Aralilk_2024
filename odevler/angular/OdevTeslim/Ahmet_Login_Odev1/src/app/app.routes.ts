// src/app/app.routes.ts

import { Routes } from '@angular/router';
// LoginComponent'inizin import'u (Minimal halini kullanıyorsanız bile bu import'u doğru bırakın)
import { Login } from './login/login'; // Sizin sınıf adınız 'Login' olduğu için bu şekilde bırakıyorum.


export const routes: Routes = [
  // Kök adresinden login'e yönlendirme
  { path: "", component: Login },
];