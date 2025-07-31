import { Routes } from "@angular/router";
import { Login } from "./pages/login/login";

export const routes: Routes = [
  { path: "login", component: Login },
  { path: "", redirectTo: "/login", pathMatch: "full" }, 
];
