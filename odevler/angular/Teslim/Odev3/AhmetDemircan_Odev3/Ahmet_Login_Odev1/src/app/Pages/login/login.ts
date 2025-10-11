import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { App } from '../../app';


@Component({
  selector: 'app-login',
  imports: [Bar, FormsModule, RouterModule, CommonModule],
  providers: [Api],
  templateUrl: './login.html',
  styleUrls: ['./login.css'], 
  changeDetection: ChangeDetectionStrategy.Default
})
export class Login {

  username = '';
  password = '';
  remember = false;
  error = '';

  @ViewChild("usernameRef")
  usernameRef: ElementRef | undefined;

  @ViewChild("passwordRef")
  passwordRef: ElementRef | undefined;

  constructor(private router: Router, private api: Api, private cdr: ChangeDetectorRef, private app: App) { }

userLogin() {
  if(this.username == ''){
    this.error = 'Username is required';
    this.usernameRef!.nativeElement.focus()
    this.cdr.detectChanges();
    return;
  }else if (this.password == ''){
    this.error = 'Password is required';
    this.passwordRef!.nativeElement.focus()
    this.cdr.detectChanges();
    return;
  }else{
    this.api.userLogin(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.accessToken)
        console.log('token', res.accessToken)
        this.router.navigate(['/products'])
        this.app.authControl();
      },
      error: (err) => {
        this.error = 'Login failed';
        this.cdr.detectChanges();
      }
    })
  }
}

}



