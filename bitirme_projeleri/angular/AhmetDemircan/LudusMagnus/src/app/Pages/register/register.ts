import { Component, ChangeDetectorRef } from '@angular/core';
import { Api } from '../../services/api';
import { IRegisterModel, IUser, createEmptyRegisterModel } from '../../models/IUser';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ValidationUtils } from '../../Utils/validEmailPassword';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  // Form properties - Factory function kullanarak
  formModel: IRegisterModel = createEmptyRegisterModel();
  
  // UI state properties
  isLoading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(private api: Api, private router: Router, private cdr: ChangeDetectorRef) { }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    // Reset messages
    this.error = '';
    this.success = '';
    
    // Comprehensive form validation using ValidationUtils
    const validationResult = ValidationUtils.validateRegistrationForm({
      name: this.formModel.name,
      email: this.formModel.email,
      password: this.formModel.password,
      confirmPassword: this.formModel.confirmPassword,
      role: this.formModel.role
    });
    
    if (!validationResult.isValid) {
      this.error = validationResult.errors.join(' ');
      return;
    }
    
    this.addUser();
  }

  // Email validation için ayrı method (real-time validation için)
  validateEmailOnBlur(): void {
    if (this.formModel.email && !ValidationUtils.isValidEmail(this.formModel.email)) {
      this.error = 'Do you belive that your email is valid?';
    } else {
      this.error = '';
    }
    this.cdr.detectChanges();
  }
  
  // Password validation için ayrı method (real-time validation için)
  validatePasswordOnBlur(): void {
    if (this.formModel.password) {
      const passwordValidation = ValidationUtils.validatePassword(this.formModel.password);
      if (!passwordValidation.isValid) {
        this.error = passwordValidation.message;
      } else {
        this.error = '';
      }
      this.cdr.detectChanges();
    }
  }
  
  // Password confirmation validation
  validatePasswordConfirmation(): void {
    if (this.formModel.confirmPassword && !ValidationUtils.passwordsMatch(this.formModel.password, this.formModel.confirmPassword)) {
      this.error = 'make copy paste your password do not match';
    } else {
      this.error = '';
      this.cdr.detectChanges();
    }
  }

  // Kullanıcı ekle (validation ile)
  addUser(): void {
    this.isLoading = true;
    
    const newUser: IUser = {
      // id atamıyoruz, JSON Server otomatik atayacak
      name: this.formModel.name.trim(),
      email: this.formModel.email.trim().toLowerCase(),
      password: this.formModel.password,
      role: this.formModel.role as 'teacher' | 'student',
      createdAt: new Date().toISOString(),
      isActive: this.formModel.role === 'student', // Öğretmen rolü de aktif başlar onay gerektirir
      courseIds: [],
      savedCourses: []
    };
    
    this.api.addUserWithValidation(newUser).subscribe({
      next: (addedUser: IUser) => {
        console.log('Now you are in the cool people club:', addedUser);
        this.success = 'you did greate job, now you can login now ;)';
        
        // 2 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('We are sorry but some problems have occurred:', error.message);
        this.error = error.message || 'We got problem here, please try again';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Formu sıfırla - Factory function kullanarak
  resetForm(): void {
    this.formModel = createEmptyRegisterModel();
    this.error = '';
    this.success = '';
  }
}
