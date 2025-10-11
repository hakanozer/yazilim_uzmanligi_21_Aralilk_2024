import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer], // Navbar'ı da ekleyin
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('LudusMagnus');
}
