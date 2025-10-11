import { Component, ElementRef, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule ],
  providers: [Api],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  
  constructor(private router:Router, private api: Api, private cdr: ChangeDetectorRef) {}

  @ViewChild('usernameRef') 
  usernameRef: ElementRef | undefined;
  @ViewChild('passwordRef') 
  passwordRef: ElementRef | undefined;

  showPassword = false;
  username = '';
  password = '';
  error = '';
  successMessage = '';

  userLogin() {
    if (!this.username || !this.password) {
      this.error = 'Lütfen kullanıcı adı ve şifre giriniz.';
      return;
    }

    if (!this.usernameValid(this.username)) {
      this.error = 'Geçersiz kullanıcı adı formatı.';
      return;
    }

    this.api.userLogin(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);
        this.error = '';
        this.successMessage = 'Giriş başarılı!';
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Login error:', error);
        this.error = 'Kullanıcı adı veya şifre hatalı.';
        this.successMessage = '';
        this.cdr.detectChanges();
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('exampleInputPassword1') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }


  usernameValid(username: string): boolean {
    // Örnek doğrulama: en az 3 karakter ve boşluk yok
    return typeof username === 'string' && username.length >= 3 && !username.includes(' ');
  }
}
