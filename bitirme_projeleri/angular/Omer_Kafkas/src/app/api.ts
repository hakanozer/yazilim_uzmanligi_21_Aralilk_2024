import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private http = inject(HttpClient);

  // Merkezî base URL (gerekirse environment'a taşınabilir)
  private readonly baseUrl = environment.apiBaseUrl;

  // Yardımcı: path'i tam URL'ye çevir
  private url(path: string) {
    if (!path) return this.baseUrl;
    return path.startsWith('http') ? path : `${this.baseUrl}/${path.replace(/^\//,'')}`;
  }

  // Yardımcı: object -> HttpParams
  private toParams(params?: Record<string, any>): HttpParams | undefined {
    if (!params) return undefined;
    let hp = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v === null || v === undefined || v === '') return;
      hp = hp.set(k, String(v));
    });
    return hp;
  }

  get<T>(path: string, params?: Record<string, any>): Observable<T> {
    return this.http.get<T>(this.url(path), { params: this.toParams(params) })
      .pipe(catchError(this.handle));
  }

  list<T = any>(resource: string, params?: Record<string, any>): Observable<T[]> {
    return this.get<T[]>(resource, params);
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(this.url(path), body)
      .pipe(catchError(this.handle));
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(this.url(path), body)
      .pipe(catchError(this.handle));
  }

  patch<T>(path: string, body: unknown): Observable<T> {
    return this.http.patch<T>(this.url(path), body)
      .pipe(catchError(this.handle));
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.url(path))
      .pipe(catchError(this.handle));
  }

  // Kaynak (collection) builder: api.collection('users').create({...}) gibi kullanım sağlar
  collection(resource: string) {
    const base = resource.replace(/\/$/, '');
    return {
      all: <T = any>(params?: Record<string, any>) => this.list<T>(base, params),
      get: <T = any>(id: string | number) => this.get<T>(`${base}/${id}`),
      create: <T = any>(body: any) => this.post<T>(base, body),
      update: <T = any>(id: string | number, body: any) => this.put<T>(`${base}/${id}`, body),
      patch: <T = any>(id: string | number, body: any) => this.patch<T>(`${base}/${id}`, body),
      remove: <T = any>(id: string | number) => this.delete<T>(`${base}/${id}`)
    } as const;
  }

  private handle = (err: any) => {
    // İleride logging / toast entegre edebilirsin
    return throwError(() => err);
  };
}
