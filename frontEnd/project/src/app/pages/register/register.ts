import { Component } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [Bar, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  passlock = false

  // register fnc
  userRegister() {
    console.log("userRegister call")
  }

  // password text lock and unlock
  passwordLockUnLock() {
    this.passlock = !this.passlock
  }

}
