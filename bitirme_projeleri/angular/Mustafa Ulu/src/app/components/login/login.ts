import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,

    // Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';
  loading = false;

  login(): void {
    if (this.loading) return;

    this.loading = true;
    this.error = '';

    this.auth.login(this.email.trim(), this.password.trim()).subscribe((ok) => {
      this.loading = false;

      if (!ok) {
        this.error = 'Email veya şifre hatalı';
        return;
      }

      if (this.auth.role === 'instructor') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/courses']);
      }
    });
  }
}
