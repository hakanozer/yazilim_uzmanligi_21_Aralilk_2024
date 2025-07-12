import { Component, ElementRef, ViewChild } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { emailValid } from '../../utils/valids';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  imports: [Bar, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private router:Router, private api: Api){ }

  @ViewChild("emailRef")
  emailRef:ElementRef | undefined
  @ViewChild("passwordRef")
  passwordRef:ElementRef | undefined


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
        next(res) {
          console.log("success :", res)
        },
        error(err) {
          console.log("err :", err.message)
        },
      })
      
    }
  }


}
