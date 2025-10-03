import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
navigateToLogin() {
throw new Error('Method not implemented.');
}
  submitting = false;
  private auth = inject(AuthService);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  this.submitting = true;
    const { name, surname, email, password } = this.form.value;
  this.auth.register({ name: name!, surname: surname!, email: email!, password: password! })
      .subscribe({
        next: user => {
          this.submitting = false;
          console.log('Kayıt başarılı', user);
        },
        error: err => {
          this.submitting = false;
          console.error(err);
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
    passwordAgain: ['', Validators.required]
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
}
