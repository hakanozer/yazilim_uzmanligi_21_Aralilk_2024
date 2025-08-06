import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private api: Api, private cdr: ChangeDetectorRef) { }

  userLogin() {
    this.api.userLogin(this.username, this.password).subscribe({
      next: (res) => {
        console.log('User:', res);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        this.router.navigateByUrl('/products', { replaceUrl: true }); 

      },
      error: (err) => {
        this.error = 'Login failed';
        this.cdr.detectChanges();
      }
    });
  }
}



