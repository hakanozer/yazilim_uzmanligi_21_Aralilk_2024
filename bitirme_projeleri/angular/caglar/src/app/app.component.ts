import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'lmsProject';
  tokenStatus = false;
  
  constructor(private router: Router) {
    this.checkTokenStatus();
  }
  
  ngOnInit() {
    // Her route değişiminde token durumunu kontrol et
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkTokenStatus();
    });
  }
  
  checkTokenStatus() {
    this.tokenStatus = localStorage.getItem('accessToken') ? true : false;
  }
}
