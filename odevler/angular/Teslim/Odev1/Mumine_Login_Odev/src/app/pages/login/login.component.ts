import { Component, ElementRef, ViewChild ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import { BarComponent } from '../../components/bar/bar.component';
import { FormsModule } from '@angular/forms';
import { userNameValid } from '../../utils/valids';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  imports: [BarComponent,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent {

  constructor(private router:Router,private api:ApiService,private cdr:ChangeDetectorRef){ }

  @ViewChild("usernameRef")
  usernameRef :ElementRef | undefined
  @ViewChild("passwordRef")
  passwordRef:ElementRef | undefined

 
  username = ''
  password =''
  remember=''
  error = ''
  placeholder =''
  

 userLogin(){
  this.error= ''
  const usernameStatus = userNameValid(this.username)
   if(!usernameStatus){
    this.error= 'Username not valid!'
    this.usernameRef!.nativeElement.focus()
   }else if(this.password === ''){
    this.error='Password Empty!'
    this.passwordRef!.nativeElement.focus()
   }else{
    console.log("Kullanıcı Bilgileri :", "username: " , this.username, "password: ",this.password)
    this.api.userLogin(this.username,this.password).subscribe({
        next:(res)=>{
        console.log("Giriş Başarılı.." , res)
        },
         error: (err) => {
        this.error='Username Or Password Fail!'
        this.cdr.detectChanges()
        }
    })
      
    }
   }
 
 }

