import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class Login {
  constructor(
    private router:Router, 
    private api: Api,
    private cdr: ChangeDetectorRef)
    {}


  email = ''
  password = ''
  remember = false
  error = ''

  @ViewChild("emailRef")
  emailRef:ElementRef | undefined

  @ViewChild("passwordRef")
  passwordRef: ElementRef | undefined
  
  userLogin(){
    this.api.userLogin(this.email,this.password).subscribe({
      next: (val : any) => {
        console.log("Giriş Başarılı! Kullanıcı Bilgileri:", val)
      }
    })


  }

}
