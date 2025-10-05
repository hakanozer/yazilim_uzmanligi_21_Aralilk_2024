import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { emailValid } from '../../utils/valid';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/IUser';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  @ViewChild("emailRef") emailRef: ElementRef | undefined;
  @ViewChild("passwordRef") passwordRef: ElementRef | undefined;

  email = '';
  password = '';
  remember = false;
  error = '';

  passlock = false; // Şifrenin görünürlüğünü kontrol eder.
  passType ='password';// <input type="password"> ya da text olacak şekilde değiştirilir.

  userLogin() {
    this.error = '';

    // Email format kontrolü
    if (!emailValid(this.email)) {
      this.error = 'Email format error!';
      this.emailRef!.nativeElement.focus();
      return;
    }

    // Password boş kontrolü
    if (this.password === '') {
      this.error = 'Password Empty!';
      this.passwordRef!.nativeElement.focus();
      return;
    }

    // Login
    this.authService.loginUser(this.email, this.password).subscribe({
    next: (users: IUser[]) => {
      if (users.length > 0) {
        const user = users[0];

        // Token ve user bilgilerini localStorage'a kaydet
        const fakeToken = Math.random().toString(36).substring(2);
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('userRole', user.role);

        console.log('User logged in successfully:', user);

        // Tüm kullanıcıları /home yönlendir
        window.location.replace('/home');

      } else {
        this.error = 'E-Mail or Password Fail';
        this.cdr.detectChanges();
      }
    },
    error: (err) => {
      this.error = 'Server Error';
      this.cdr.detectChanges();
    }
  });
}

  validEmail() {
    console.log("Email Call", this.email);
  }

  // password text lock and unlock
  passwordLockUnLock() {
    this.passlock = !this.passlock
    this.passType = this.passlock === true ? 'text' : 'password'
  }
}
