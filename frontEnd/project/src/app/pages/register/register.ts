import { Component } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { nameSurnameValid } from '../../utils/valids';

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
    const nameData = nameSurnameValid(this.name)
    if (nameData === '') {
      this.error = 'Name / Surname not valid'
    }
  }

  // password text lock and unlock
  passwordLockUnLock() {
    this.passlock = !this.passlock
    this.passType = this.passlock === true ? 'text' : 'password'
  }

}
