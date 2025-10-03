import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  readonly auth = inject(AuthService);
  private router = inject(Router);
  // template can call auth.currentUser() to get the current user signal value
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
