import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Bar } from '../../components/bar/bar';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { emailValid, nameSurnameValid } from '../../utils/valids';
import { Api } from '../../services/api';
import { hashPassword } from '../../utils/hash';
import { AuthService } from '../../utils/auth.service';

@Component({
  selector: 'app-register',
  imports: [Bar, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Register {

  constructor(private router: Router, private api: Api, private cdr: ChangeDetectorRef, private auth: AuthService) {
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
  success = ''

  // register values
  name = ''
  email = ''
  password = ''
  passwordAgain = ''

  // register fnc
userRegister() {
  this.error = '';
  this.success = '';

  const nameData = nameSurnameValid(this.name);
  if (nameData === '') {
    this.error = 'Name / Surname not valid!';
    this.nameRef!.nativeElement.focus();
  } else if (!emailValid(this.email)) {
    this.error = 'Email not valid!';
    this.emailRef!.nativeElement.focus();
  } else if (this.password === '') {
    this.error = 'Password empty!';
    this.passwordRef!.nativeElement.focus();
  } else if (this.password.length < 8) {
    this.error = 'Password min 8 chars!';
    this.passwordRef!.nativeElement.focus();
  } else if (this.password !== this.passwordAgain) {
    this.error = 'Password and Password Again not equals!';
    this.passwordAgainRef!.nativeElement.focus();
  } else {
    this.name = nameData;
    // const hashedPassword = hashPassword(this.password);
    var data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'student',
      courses: [],
      lessons: []
    }
    this.api.userRegister(data).subscribe({
      next: (res:any) => {
        // JWT kaydet
        localStorage.setItem("token", res.accessToken);
        // localStorage.setItem("user", JSON.stringify(res.user));

        this.success = 'Register Success 🎉';
        
        this.cdr.detectChanges();

        setTimeout(() => {
           this.api.userLogin(this.email, this.password).subscribe({
          next: (response) => {
            if (response && response.accessToken) {
              this.auth.setToken(response.accessToken);
              localStorage.setItem("token", response.accessToken)
              localStorage.setItem("user", JSON.stringify(response.user))
              this.formReset();
              this.router.navigate(['/dashboard'])
            } else {
              this.error = 'E-Mail or Password Fail'
              this.cdr.detectChanges()
            }
          },
        error: (err) => {
          this.error = 'E-Mail or Password Fail'
          this.cdr.detectChanges()
        }
      })
        }, 2000);
      },
      error: (err) => {
        this.error = 'Register fail!';
        this.cdr.detectChanges();
      }
    });
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
