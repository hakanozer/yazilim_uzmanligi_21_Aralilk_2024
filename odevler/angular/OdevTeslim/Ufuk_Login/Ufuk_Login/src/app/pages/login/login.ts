import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { ILoginRequest } from '../../models/ILoginRequest';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username!: string;
  password!:string;
  error:string = "";
  private authService = inject(Auth)
  private cdr = inject(ChangeDetectorRef)

  onLogin() {
    const loginData: ILoginRequest = {
      username: this.username,
      password: this.password
    }
    console.log('Gönderilen veri: ', loginData);
    this.authService.userLogin(loginData).subscribe({
      next: (val) => {
        this.error = "";
        this.cdr.detectChanges();
        console.log('APIdan dönen veri', val)},
      error: (err) => {
        console.log('E-mail or password is wrong');
        this.error = err.error?.message || "E-mail or password is wrong"
        this.cdr.detectChanges();
      }
    })
  }
  
}
