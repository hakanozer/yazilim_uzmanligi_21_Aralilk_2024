import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
     provideHttpClient()
  ]
};
/*🧠 Neden Oluyor? 
import { provideHttpClient } from '@angular/common/http'; bu kodu neden ekledik?

Angular 15+ ile gelen standalone mimaride artık NgModules yerine provideXXX sistemleri kullanılıyor.
 Yani HttpClientModule yerine provideHttpClient() kullanılmalı. Klasik Angular projesinde AppModule 
 içine HttpClientModule eklersin, ama burada app.config.ts içinde provideHttpClient() yapmalısın.*/