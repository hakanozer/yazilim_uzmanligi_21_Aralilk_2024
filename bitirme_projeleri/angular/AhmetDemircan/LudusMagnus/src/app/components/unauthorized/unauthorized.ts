// src/app/unauthorized/unauthorized.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./unauthorized.html",  
  styleUrls: ["./unauthorized.css"]
})
export default class UnauthorizedComponent {}

