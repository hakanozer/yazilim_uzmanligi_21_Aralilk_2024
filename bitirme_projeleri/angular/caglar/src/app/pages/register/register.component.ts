import { Component, ElementRef, ViewChild,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { emailValid, nameValid, passwordValid, surnameValid } from '../../utils/valid';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection:ChangeDetectionStrategy.Default

})
export class RegisterComponent {

  constructor(private router: Router, private apiService: ApiService, private cdr:ChangeDetectorRef) {
    console.log("register call")
  }

  // error
  error = ''
  success = ''


  //passview model
  passlock = false
  passType = "password"

  // register value
  userName = ''
  userSurname = ''
  email = ''
  password = ''
  passwordAgain = ''

  // Register Role
  userType = ''

  //ViewChild

  @ViewChild("userNameRef")
  userNameRef:ElementRef | undefined
  @ViewChild("userSurnameRef")
  userSurnameRef:ElementRef | undefined
  @ViewChild("emailRef")
  emailRef:ElementRef | undefined
  @ViewChild("passwordRef")
  passwordRef:ElementRef | undefined
  @ViewChild("passwordAgainRef")
  passwordAgainRef: ElementRef | undefined
  



  userRegister() {
    this.error = ''
    this.success = ''
    const nameStatus = nameValid(this.userName)
    if(nameStatus === '') {
      this.error = 'Name is not valid'
      this.userNameRef?.nativeElement.focus()
      return
    }
    console.log(nameStatus)
    
    const surnameStatus = surnameValid(this.userSurname)
    if(surnameStatus === '') {
      this.error = 'Surname is not valid'
      this.userSurnameRef?.nativeElement.focus()
      return
    }
    console.log(surnameStatus)
    const emailStatus = emailValid(this.email)
    const passwordStatus = passwordValid(this.password)
    if(emailStatus === null) {
      this.error = 'Email is not valid'
      this.emailRef?.nativeElement.focus()
    }else if (!passwordStatus) {
      this.error = 'Password format error'
      this.passwordRef?.nativeElement.focus()
    }else if(this.password !== this.passwordAgain) {
      this.error = 'Password and Password Again not equals'
      this.passwordAgainRef?.nativeElement.focus()
    }else if(this.userType === ''){
      this.error = 'Please select user type'
    }else{
      // API servisini kullanarak kayıt yapma
      this.apiService.userRegister(nameStatus, surnameStatus, this.email, this.password, this.userType).subscribe({
        next: (response) => {
          this.success= "Register User Success"
          this.cdr.detectChanges()
          this.formReset()
          setTimeout(() => {
             this.router.navigate(["/login"], {replaceUrl:true});
          }, 3000);  
         
        },
        error: (error) => {
          this.error = 'Registration failed. Please try again.';
          this.cdr.detectChanges()
        }
      });
    }
  }

  // password text lock and unlock

  passwordLockUnLock () {
    this.passlock = !this.passlock
    this.passType = this.passlock === true ? 'text' : 'password'
  }

  // Form Reset
  formReset() {
    this.userName = ''
    this.userSurname = ''
    this.email = '  '
    this.password = ''
    this.passwordAgain = ''
    this.userType = ''
    this.error = ''

  }

}
