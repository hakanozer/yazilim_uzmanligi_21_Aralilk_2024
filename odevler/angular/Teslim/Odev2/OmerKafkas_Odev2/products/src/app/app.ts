import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Bar } from "./components/bar/bar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Bar, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('products');
}
