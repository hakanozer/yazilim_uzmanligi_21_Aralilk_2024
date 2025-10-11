import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Api } from '../../api';
import { firstValueFrom } from 'rxjs';

export interface Course {
  id: string;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  instructorName?: string;
}

// Basit retry mekanizması (json-server geç ayağa kalkarsa)
async function fetchWithRetry(api: Api, attempts = 3, delayMs = 300): Promise<Course[]> {
  try {
    return await firstValueFrom(api.list<Course>('courses'));
  } catch (err) {
    if (attempts <= 1) throw err;
    await new Promise(r => setTimeout(r, delayMs));
    return fetchWithRetry(api, attempts - 1, delayMs * 2);
  }
}

export const coursesResolver: ResolveFn<Course[]> = async () => {
  const api = inject(Api);
  return fetchWithRetry(api, 3, 200);
};
