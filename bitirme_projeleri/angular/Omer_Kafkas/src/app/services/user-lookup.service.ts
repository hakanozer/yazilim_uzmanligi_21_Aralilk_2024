import { Injectable, inject, signal } from '@angular/core';
import { Api } from '../api';
import { CacheService } from './cache.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface User { id: string; name?: string; surname?: string; email?: string; }

@Injectable({ providedIn: 'root' })
export class UserLookupService {
  private api = inject(Api);
  private cache = inject(CacheService);
  private loading = signal(false);
  private key = 'userMapAll';

  getAllMap(): Observable<Record<string,string>> {
    const cached = this.cache.get<Record<string,string>>(this.key);
    if(cached) return of(cached);
    if(this.loading()) return of({});
    this.loading.set(true);
    return this.api.list<User>('users').pipe(
      map(users => {
        const mapObj: Record<string,string> = {};
        for(const u of users){
          const full = [u.name, u.surname].filter(Boolean).join(' ').trim();
          mapObj[u.id] = full || u.email || u.id;
        }
        this.cache.set(this.key, mapObj, 5 * 60_000);
        return mapObj;
      }),
      tap({ next: () => this.loading.set(false), error: () => this.loading.set(false) })
    );
  }
}
