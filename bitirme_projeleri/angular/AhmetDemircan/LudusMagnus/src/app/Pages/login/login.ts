import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login implements OnDestroy {
  loginForm: FormGroup;
  error = '';
  isLoading = false;
  showForgotPasswordMessage = false;
  showTestUsers = false;
  
  private destroy$ = new Subject<void>();

  @ViewChild("emailRef")
  emailRef: ElementRef | undefined;

  @ViewChild("passwordRef")
  passwordRef: ElementRef | undefined;

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  ngOnDestroy(): void { //Memory Leak Önleme : Component destroy edildiğinde subscription'ları temizler
    this.destroy$.next();
    this.destroy$.complete();
  }

  // AuthService kullanarak kullanıcı girişini yönetir
  userLogin(): void {
    if (this.loginForm.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      this.cdr.markForCheck();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.error = '';
    this.cdr.markForCheck();

    this.authService.login(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (success: boolean) => {
          this.isLoading = false;
          if (success) {
            console.log('Login başarılı');
            this.navigateByUserRole();
          } else {
            this.error = 'Email or password is incorrect';
            this.cdr.markForCheck();
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Failed to login. Please try again.';
          console.error('Login hatası:', err);
          this.cdr.markForCheck();
        }
      });
  }


  // Kullanıcıyı rolüne göre yönlendirir
  private navigateByUserRole(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      const routes = {
        admin: '/admin-panel',
        teacher: '/teacher-panel',
        student: '/Courses'
      };
      this.router.navigate([routes[user.role as keyof typeof routes] || '/Courses']);
    } else {
      this.router.navigate(['/Courses']);
    }
  }


  // Şifremi unuttum mesajının görünürlüğünü değiştirir
  toggleForgotPasswordMessage(event: Event): void {
    event.preventDefault();
    this.showForgotPasswordMessage = !this.showForgotPasswordMessage;
    this.cdr.markForCheck();
  }


  // Test kullanıcılarının görünürlüğünü değiştirir
  toggleTestUsers(event: Event): void {
    event.preventDefault();
    this.showTestUsers = !this.showTestUsers;
    this.cdr.markForCheck();
  }


   // Form gönderme işleyicisi
  onSubmit(event: Event): void {
    event.preventDefault();
    this.userLogin();
  }

 //Template erişimi için form kontrollerini getirir
  get f() {
    return this.loginForm.controls;
  }
}



