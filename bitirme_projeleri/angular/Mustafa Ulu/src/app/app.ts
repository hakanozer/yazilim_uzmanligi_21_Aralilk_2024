import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  private auth = inject(AuthService);

  user = computed(() => this.auth.getCurrentUser());

  isLoggedIn = computed(() => this.auth.isLoggedIn);
  role = computed(() => this.auth.role);
  userName = computed(() => {
    const u = this.auth.getCurrentUser();
    if (!u) return '';
    return u.role === 'instructor' ? 'Instructor' : 'Student';
  });

  logout(): void {
    this.auth.logout();
  }
}
