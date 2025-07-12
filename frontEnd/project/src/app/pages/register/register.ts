import { Component, ElementRef, ViewChild } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { emailValid, nameSurnameValid } from '../../utils/valids';

@Component({
  selector: 'app-register',
  imports: [Bar, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  constructor(private router: Router){
    console.log("Register Call")
  }

  @ViewChild("nameRef")
  nameRef:ElementRef | undefined
  @ViewChild("emailRef")
  emailRef:ElementRef | undefined
  @ViewChild("passwordRef")
  passwordRef:ElementRef | undefined
  @ViewChild("passwordAgainRef")
  passwordAgainRef:ElementRef | undefined

  passlock = false
  passType = "password"
  error = ''

  // register values
  name = ''
  email = ''
  password = ''
  passwordAgain = ''

  // register fnc
  userRegister() {
    this.error = ''
    const nameData = nameSurnameValid(this.name)
    if (nameData === '') {
      this.error = 'Name / Surname not valid!'
      this.nameRef!.nativeElement.focus()
    }else if (!emailValid(this.email)) {
      this.error = 'Email not vali!'
      this.emailRef!.nativeElement.focus()
    }else if (this.password === '') {
      this.error = 'Password empty!'
      this.passwordRef!.nativeElement.focus()
    }else if (this.password !== this.passwordAgain) {
      this.error = 'Password and Password Again not equals!'
      this.passwordAgainRef!.nativeElement.focus()
    }else {
      this.name = nameData
      // 1. javascript
      //window.location.href = '/'
      // 2. bir önceki ekrana dönüşü engelle
      //window.location.replace('/')
      // 3. Router ile geçiş - tavsiye
      //this.router.navigate(['/'], {replaceUrl: true, queryParams: {id: 10}})
      this.router.navigate(['/'], {replaceUrl: true})
    }
  }

  // resetfnc
  formReset(){
    this.name = ''
    this.email = ''
    this.password = ''
    this.passwordAgain = ''
    this.error = ''
  }

  // password text lock and unlock
  passwordLockUnLock() {
    this.passlock = !this.passlock
    this.passType = this.passlock === true ? 'text' : 'password'
  }

}
