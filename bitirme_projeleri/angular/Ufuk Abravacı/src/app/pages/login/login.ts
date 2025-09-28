import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { endpoints } from '../../utils/apiUrl';
import { AuthResponse } from '../../models/AuthResponse';
import { AuthService } from '../../services/auth-service';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, Navbar],
  templateUrl: './login.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  readonly http = inject(HttpClient);
  readonly router = inject(Router)
  readonly message = signal<string | null>(null)
  readonly isLoading = signal(false)
  readonly auth = inject(AuthService)



  onSubmit(formData: NgForm) {
    if (formData.form.invalid) return;
    this.isLoading.set(true);
    this.http.post<AuthResponse>(endpoints.auth.login, formData.value).subscribe({
      next: (res) => {
        this.auth.login(res)
        this.message.set('✅ Giriş başarılı! Anasayfaya yönlendiriliyorsunuz...');
        setTimeout(() => this.router.navigate(['/']), 200);
        this.isLoading.set(false);
      },
      error: () => {
        this.message.set('❌ Email veya şifre hatalı!');
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    })
  }
}
