import { Component, ElementRef, ViewChild } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { emailValid } from '../../utils/valids';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Bar, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

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
      console.log("Form Send :", this.email, this.password, this.remember)
    }
  }


}
