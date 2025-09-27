import { inject, Injector } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from './services/api.service';

export const authGuard: CanActivateFn = (route, state) => {
  //Token varlık denetimi
  const stToken = localStorage.getItem('accessToken')
    if(stToken) {
     return true

    }
        window.location.replace('/')
    return true

};
