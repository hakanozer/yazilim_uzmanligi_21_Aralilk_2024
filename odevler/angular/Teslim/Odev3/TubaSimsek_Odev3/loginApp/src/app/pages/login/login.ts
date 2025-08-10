import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  providers: [Api],
  templateUrl: './login.html',
  styleUrls: ['./login.css'], 
  changeDetection: ChangeDetectionStrategy.Default
})
export class Login {

  constructor(private router:Router, private api: Api, private cdr: ChangeDetectorRef){ }

  @ViewChild("usernameRef")
  emailRef:ElementRef | undefined

  @ViewChild("passwordRef")
  passwordRef:ElementRef | undefined

  // user models
  username  = ''
  password = ''
  remember = false
  error = ''

  // login function
  userLogin() {
    this.api.userLogin(this.username, this.password).subscribe({
      next: (res) => {
        console.log('User:', res); //
      },
      error: (err) => {
        this.error = 'Login failed. Please check your credentials.';
        this.cdr.detectChanges();
        }
      })
    }
  }

