import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/IUser';
import { FormsModule } from '@angular/forms';
import { emailValid, nameSurnameValid } from '../../utils/valid';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: IUser | null = null;
  updatedName: string = '';
  updatedEmail: string = '';
  updatedPassword: string = '';

 error='';
 success='';
 passlock = false; // Şifrenin görünürlüğünü kontrol eder.
 passType ='password';// <input type="password"> ya da text olacak şekilde değiştirilir.

 @ViewChild("nameRef")
  nameRef:ElementRef | undefined
  @ViewChild("emailRef")
  emailRef:ElementRef | undefined
  @ViewChild("passwordRef")
  passwordRef:ElementRef | undefined
  @ViewChild("passwordAgainRef")
  passwordAgainRef:ElementRef | undefined

  

  constructor(private authService: AuthService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authService.userProfileSync().subscribe({
      next: (data) => {
        if (data) {
          this.user = data;
          this.updatedName = data.name;
          this.updatedEmail = data.email;
          this.updatedPassword = data.password;
        }
      },
      error: () => console.error('Profil alınamadı')
    });
  }

  updateUser(): void {
    this.error =''
    this.success=''

   
    if(!nameSurnameValid(this.updatedName)){
      this.error='Geçerli bir isim girin!'
      this.nameRef?.nativeElement.focus();
      return;
    }

    if(!emailValid(this.updatedEmail)){
      this.error='Geçerli bir email girin!'
      this.emailRef?.nativeElement.focus();
      return;
    }
    

    if(!this.updatedPassword || this.updatedPassword.length<6){
       this.error ='Şifre en az 6 karekter olmalı!';
       this.passwordRef?.nativeElement.focus();
       return;
    }
    


    if(!this.user) return;

    const updatedUser: Partial<IUser> = {
        name: this.updatedName,
        email: this.updatedEmail,
        password: this.updatedPassword
    };
       this.authService.updateUser(this.user.id, updatedUser).subscribe({
    next: (res) => {
      // Başarılı güncelleme sonrası component state güncelle
      if(res) {
        this.user = res;
        this.updatedName = res.name;
        this.updatedEmail = res.email;
        this.updatedPassword = res.password;
      }
      this.success ='Bilgiler güncellendi!';
      this.cdr.detectChanges();
      setTimeout(() => this.success='', 2000);
    },
    error: () => {
      this.error='Güncelleme başarısız!';
      this.cdr.detectChanges();
      setTimeout(() => this.error='', 2000);
    }
  });
    }

    // password text lock and unlock
  passwordLockUnLock() {
    this.passlock = !this.passlock
    this.passType = this.passlock === true ? 'text' : 'password'
  }
  }


