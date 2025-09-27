import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { emailValid, passwordValid } from '../../utils/valid';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router:Router, private apiService: ApiService) {}

  //user models
  email = ''
  password = ''
  check = false
  error = ''


  //ViewChild
  @ViewChild("emailRef")
  emailRef: ElementRef | undefined
  @ViewChild("passwordRef")
  passwordRef: ElementRef | undefined



  //function
  
  userLogin() {
   this.error = ''
   const emailStatus = emailValid(this.email)
   const passwordStatus = passwordValid(this.password)

   if(!emailStatus) {
    this.error = 'Email format error'
    this.emailRef?.nativeElement.focus()
   }else if (!passwordStatus) {
    this.error = 'Password format error'
    this.passwordRef?.nativeElement.focus()
   }else {
    // API servisini kullanarak giriş yapma
    this.apiService.userLogin(this.email, this.password).subscribe({
      next: (response) => {
        // json-server-auth başarılı login response'u
        if (response && response.accessToken) {
          console.log('Giriş başarılı:', response);
          
          // json-server-auth'dan gelen JWT token'ı localStorage'a kaydet
          localStorage.setItem('accessToken', response.accessToken);
          console.log('JWT Access token kaydedildi:', response.accessToken);
          
          
          // kurs sayfasına yönlendir
          this.router.navigate(["courses"], {replaceUrl:true});
        } else {
          // Giriş başarısız
          this.error = 'Email or password is incorrect';
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.error = 'Connection error. Please try again.';
      }
    });
   }
    
  }

}
