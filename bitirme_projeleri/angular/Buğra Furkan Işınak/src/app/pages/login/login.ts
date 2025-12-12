import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { emailValid } from '../../utils/valids';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { AuthService } from '../../utils/auth.service';

@Component({
  selector: 'app-login',
  imports: [Bar, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Login {

  @ViewChild("emailRef")
  emailRef:ElementRef | undefined
  @ViewChild("passwordRef")
  passwordRef:ElementRef | undefined

  ngAfterViewInit() {
    if (this.emailRef !== undefined) {
      this.emailRef.nativeElement.addEventListener("keyup", (ev:KeyboardEvent) => {
      })
    }
  }

  constructor(private router:Router, private api: Api, private cdr: ChangeDetectorRef, private auth: AuthService) {
  }


  // user models
  email = ''
  password = ''
  remember = false
  error = ''


  // fonksion
  userLogin() {
    this.error = ''
    const emailStatus = emailValid(this.email)
    if (!emailStatus) {
      this.error = 'Email format error'
      this.emailRef!.nativeElement.focus()
    }else if ( this.password === '' ) {
      this.error = 'Password Empty!'
      this.passwordRef!.nativeElement.focus()
    }else {
      // this.router.navigate(['/products'], {replaceUrl: true})
      // next, error

      this.api.userLogin(this.email, this.password).subscribe({
          next: (response) => {
            if (response && response.accessToken) {
               this.auth.setToken(response.accessToken);
              localStorage.setItem("token", response.accessToken)
              localStorage.setItem("user", JSON.stringify(response.user))
              this.router.navigate(['/dashboard'])
            } else {
              this.error = 'E-Mail or Password Fail'
              this.cdr.detectChanges()
            }
          },
        error: (err) => {
          this.error = 'E-Mail or Password Fail'
          this.cdr.detectChanges()
        }
      })

      
    }
  }

  validEmail() {
  }


}
