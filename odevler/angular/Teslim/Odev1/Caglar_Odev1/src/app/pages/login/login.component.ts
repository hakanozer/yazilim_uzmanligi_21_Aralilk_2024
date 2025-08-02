import { Component } from '@angular/core';
import { BarComponent } from '../../componets/bar/bar.component';
import { FormsModule } from '@angular/forms';
import { userValid } from '../../utils/valid';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  imports: [BarComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor (private api: ApiService) {}

placeHolderEmail = 'Lütfen mail adresinizi giriniz!'
placeHolderPassword = 'Lütfen şifrenizi giriniz!'

passlock = false

  username = ''
  password = ''
  remember = false
  error = ''
  success = " "


userLogin() {
 this.error = ''
 const emailStatus = userValid(this.username)
 if(!emailStatus) {
  this.error = "Email format error!"
 }else if(this.password === ''){
  this.error = "password format error!"
 }else{
   console.log(` Form Send; email: ${this.username}, password: ${this.password}, remember: ${this.remember}`)
  this.api.userLogin(this.username, this.password).subscribe({
    next(value) {
      console.log("success :", value)
    },
    error(err) {
      console.log("err :", err.message)
    },
  })
   
 }
   
  }

  passwordEye(){
   this.passlock = !this.passlock
  }

  loginReset() {
    this.username = ''
    this.password = ''
  }

}
