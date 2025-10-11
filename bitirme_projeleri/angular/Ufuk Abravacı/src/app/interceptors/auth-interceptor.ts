import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
}
//Tokenin zamanını kontrol eden geçersizse localstorage temizleyip login sayfasına atan interceptor.
//token varsa tokeni headera ekleyip isteği öyle atar.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();
  const router = inject(Router)

  if (token) {
    //token decode edilebilirse/edilemezse durum kontrolü
    try {
      //jwt tokeni decode edip, exp değişkenine ulaşacağız. Bunu kullanarak token süresinin geçip geçmediğine göre aksiyon alacağız.
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000); //saniyeye çevir

      if (decoded.exp < now) {
        // Token süresi dolmuşsa logout et, yani eski tokeni temizle.
        authService.logout();
        router.navigate(['/login']);
        //logine yönlendirdiğimiz için isteği tamamlamanın bir manası yok. İstek gönderilmeden login ekrana gitmek daha mantıklı.
        //Aslında error mesajının da bir manası yok çünkü componentte hatayı handle etmeden logine geçiyoruz.
        //bu durumda sadece isteği durdurmaya yarıyor bu error.
        return throwError(() => new Error('Token expired. Redirecting to login.'));
      }

      // Token geçerli request'e tokeni ekle
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned);

    } catch (e) {
      // Token decode edilemediyse logout
      authService.logout();
      return next(req);
    }
  }
  //token yoksa olduğu gibi iletiyoruz. Tokensiz ulaşılabilecek alanlara ulaşılabilmesi için.
  return next(req);
};

