import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../services/user';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,

    // Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  role: 'student' | 'instructor' = 'student';

  loading = false;
  error = '';

  register(): void {
    if (this.loading) return;

    const payload = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
      role: this.role,
    };

    if (!payload.name || !payload.email || !payload.password) {
      this.error = 'Tüm alanları doldur.';
      return;
    }

    this.error = '';
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (users: any[]) => {
        const exists = users.some((u) => u.email === payload.email);
        if (exists) {
          this.loading = false;
          this.error = 'Bu email zaten kayıtlı.';
          return;
        }

        this.userService.createUser(payload).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/login']);
          },
          error: () => {
            this.loading = false;
            this.error = 'Kayıt sırasında hata oluştu.';
          },
        });
      },
      error: () => {
        this.loading = false;
        this.error = 'Sunucuya bağlanılamadı.';
      },
    });
  }
}
