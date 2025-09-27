import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, FormsModule,  ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class App implements OnInit {
  protected title = 'LearnHub';
  tokenStatus = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    console.log("App ngOnInit localStorage kontrol:", { userId, token });

    if (userId && token) {
      this.tokenStatus = true;
    } else {
      this.tokenStatus = false;
    }

    this.cdr.detectChanges();
  }
}











/*import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit  } from '@angular/core'; //Component: Angular bileşeni tanımlamak için kullanılır. ChangeDetectionStrategy: Angular'ın değişiklikleri nasıl takip edeceğini belirler. ChangeDetectorRef: DOM’un elle güncellenmesi gerekirse kullanılır.
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Api } from './services/api';
import { lastValueFrom } from 'rxjs';
//import { Footer } from "./components/footer/footer"; //lastValueFrom: RxJS Observable'ını Promise'e çevirir.
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.Default //ChangeDetectionStrategy.Default: Angular'ın varsayılan değişiklik algılama stratejisini kullanır. Bu, bileşenlerin değişikliklerini otomatik olarak takip eder.
})
export class App implements OnInit{
  protected title = 'LearnHub';
  tokenStatus = false //tokenStatus: Kullanıcının oturum durumunu tutar. true ise kullanıcı giriş yapmıştır.
  constructor(private api: Api, private cdr: ChangeDetectorRef) { //api: API servis çağrıları için kullanılır. cdr: Angular bileşenini elle yenilemek için kullanılır.
  // this.authControl(userId)// Bileşen oluşturulurken kullanıcı oturum durumu kontrol edilir.
  }


  ngOnInit() {
    const userId = localStorage.getItem("userId");
     console.log("App ngOnInit userId:", userId); // 👈 test log
    if (userId) {
      this.authControl(Number(userId));
    }
  }


  async authControl(id: number) {
    console.log("authControl çalıştı, id:", id); // 👈 test log
    try {
      const res = await lastValueFrom( this.api.userProfile(id))
      console.log("authControl res:", res); // 👈 test log
      if (res) {
        this.tokenStatus = true
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.log("authControl error:", error);
      this.tokenStatus = false
      this.cdr.detectChanges();
    }
  }

}
/*Açıklama:
userProfileSync(): Kullanıcının token’ı geçerli mi, onu kontrol eden bir API çağrısıdır.
Eğer geçerliyse (res varsa):
tokenStatus = true
this.cdr.detectChanges() ile Angular manuel olarak DOM güncellenir.
Eğer hata olursa (token geçersiz, süresi dolmuşsa vs.):
tokenStatus = false olarak ayarlanır.
DOM tekrar güncellenir.

Özetle bu App bileşeni:
Uygulama başlatıldığında token geçerliliğini kontrol eder.
Eğer token geçerliyse, tokenStatus true olur.
Bu bilgi, navbar'da veya HTML içinde login/logout butonu göstermek için kullanılabilir.
ChangeDetectorRef sayesinde DOM manuel olarak yenilenir.
*/
