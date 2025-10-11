import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// Global test providers setup. Each spec can import this file to ensure
// HttpClient ve zoneless change detection sağlanır.
export const globalTestConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter([])
  ]
};
