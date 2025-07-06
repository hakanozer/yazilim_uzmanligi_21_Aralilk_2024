import { Component } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { emailValid, nameSurnameValid } from '../../utils/valids';

@Component({
  selector: 'app-register',
  imports: [Bar, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

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
    }else if (!emailValid(this.email)) {
      this.error = 'Email not vali!'
    }else if (this.password === '') {
      this.error = 'Password empty!'
    }else if (this.password !== this.passwordAgain) {
      this.error = 'Password and Password Again not equals!'
    }else {
      this.name = nameData
      console.log("Form Send!")
      console.log(this.name, this.email, this.password)
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
