import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})
export class AppComponent {
  showNavbar = true; // Navbar görünürlüğünü kontrol eden değişken

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {// Yalnızca NavigationEnd olaylarını dinle
        const hiddenRoutes = ['/', '/register'];// Navbar'ın gizleneceği rotalar
        this.showNavbar = this.isLoggedIn() && !hiddenRoutes.includes(event.url);//
      }
    });
  }
// Kullanıcının giriş yapıp yapmadığını kontrol eden yöntem
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}


  
