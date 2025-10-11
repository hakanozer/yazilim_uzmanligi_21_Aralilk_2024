import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { emailValid } from '../../utils/valids';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { IUser } from '../../models/IUser';

@Component({
  selector: 'app-login',
  imports: [Bar, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.Default
})

export class Login {

  @ViewChild("emailRef")
  emailRef: ElementRef | undefined
  @ViewChild("passwordRef")
  passwordRef: ElementRef | undefined


  ngAfterViewInit() {
    if (this.emailRef !== undefined) {
      this.emailRef.nativeElement.addEventListener("keyup", (ev: KeyboardEvent) => {
        console.log("Email Call - 2", this.email)
      })
    }
  }

  constructor(private router: Router, private api: Api, private cdr: ChangeDetectorRef) {

  }

  // user models
  email = ''
  password = ''
  remember = false
  error = ''




  // login fonksionu

  userLogin() {
    this.error = ''
    const emailStatus = emailValid(this.email)
    if (!emailStatus) {
      this.error = 'Email format error'
      this.emailRef!.nativeElement.focus()

    } else if (this.password === '') {
      this.error = 'Password Empty!'
      this.passwordRef!.nativeElement.focus()

    } else {
      this.api.userLogin(this.email, this.password).subscribe({
        next: (res) => {
          console.log("Login Response:", res)

          if (res.length > 0) {
            const user = res[0];
            console.log("Logged in user:", user)

            // fake token üret
            const fakeToken = Math.random().toString(36).substring(2)

            // localStorage’a kaydet
            localStorage.setItem("userId", String(user.id))
            localStorage.setItem("token", fakeToken)
            localStorage.setItem("role", user.role) // role'u kaydet
             
            // role göre yönlendirme
            if (user.role === 'student') {
              this.router.navigate(['/student']) 
            } else if (user.role === 'instructor') {
              this.router.navigate(['/instructor'])
            }


          } else {
            this.error = 'E-Mail or Password Fail'
            this.cdr.detectChanges()
          }

        },
        error: () => {
          this.error = 'Login Error';
          this.cdr.detectChanges();
        }
      });
    }
  }

  validEmail() {
    console.log("Email Call", this.email)
  }

}