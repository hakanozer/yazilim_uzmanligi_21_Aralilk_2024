import { Component } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [Bar, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // user models
  email = ''
  password = ''

  // fonksion
  userLogin(){
    console.log("Data:", this.email, this.password)
  }


}
