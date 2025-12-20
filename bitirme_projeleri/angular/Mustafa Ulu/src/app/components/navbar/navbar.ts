import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,

    // Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  get isLoggedIn(): boolean {
    return typeof (this.auth as any).isLoggedIn === 'function'
      ? (this.auth as any).isLoggedIn()
      : (this.auth as any).isLoggedInValue ?? false;
  }

  get role(): any {
    return typeof (this.auth as any).getRole === 'function'
      ? (this.auth as any).getRole()
      : (this.auth as any).role ?? '';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
