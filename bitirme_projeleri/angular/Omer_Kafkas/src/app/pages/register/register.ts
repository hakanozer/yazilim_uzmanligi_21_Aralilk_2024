import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundItem } from "../../components/background-item/background-item";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, BackgroundItem],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  photo: any;
  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
  submitting = false;
  private auth = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  this.submitting = true;
    const { name, surname, email, password, role } = this.form.value as any;
    const profilePhoto = this.selectedPhoto || this.photoList[0] || '';
    this.auth.register({ name: name!, surname: surname!, email: email!, password: password!, profilePhoto, role: role! })
      .subscribe({
        next: user => {
          this.submitting = false;
          const { password: _pw, ...safe } = user as any;
          localStorage.setItem('currentUser', JSON.stringify(safe));
          this.auth.currentUser.set(safe);
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.submitting = false;
          alert('Kayıt başarısız');
        }
      });
  }
  private fb = inject(FormBuilder);

  // Formu signal ile sarmala
  readonly formSignal = signal(this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordAgain: ['', Validators.required],
    role: ['student', Validators.required]
  }, {
    validators: (group) => {
      const password = group.get('password')?.value;
      const passwordAgain = group.get('passwordAgain')?.value;
      return password === passwordAgain ? null : { passwordMismatch: true };
    }
  }));


  get form() {
    return this.formSignal();
  }
    photoList = [
    'assets/profile-photo/1.png',
    'assets/profile-photo/2.png',
    'assets/profile-photo/3.png',
    'assets/profile-photo/4.png',
    'assets/profile-photo/5.png',
    'assets/profile-photo/6.png',
  ];
  selectedPhoto = '';

    selectPhoto(photo: string) {
    this.selectedPhoto = photo;
  }
}
