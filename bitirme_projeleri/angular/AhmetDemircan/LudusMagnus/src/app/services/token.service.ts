import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { IToken } from '../models/IToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = 'http://localhost:3000/tokens';

  constructor(private http: HttpClient) {}

  // Token oluştur - userId artık string
  generateToken(userId: string): Observable<IToken> {
    const token = this.createRandomToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const createdAt = new Date().toISOString();

    const newToken: Omit<IToken, 'id'> = {
      token,
      userId, // artık string
      expiresAt,
      createdAt
    };

    return this.http.post<IToken>(this.apiUrl, newToken);
  }

  // Token doğrula - iki parametreli versiyon
  validateToken(token: string, userId: string): Observable<boolean> {
    return this.http.get<IToken[]>(`${this.apiUrl}?token=${token}&userId=${userId}`).pipe(
      map(tokens => {
        if (tokens.length === 0) return false;
        
        const foundToken = tokens[0];
        const now = new Date();
        const expiresAt = new Date(foundToken.expiresAt);
        
        // Token süresi dolmuş mu kontrol et
        if (now > expiresAt) {
          this.deleteToken(foundToken.id!).subscribe();
          return false;
        }
        
        return true;
      }),
      catchError(() => of(false))
    );
  }

  // Kullanıcının token'ını getir - userId artık string
  getUserToken(userId: string): Observable<IToken | null> {
    return this.http.get<IToken[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      map(tokens => {
        if (tokens.length === 0) return null;
        
        const userToken = tokens[0];
        const now = new Date();
        const expiresAt = new Date(userToken.expiresAt);
        
        // Token süresi dolmuş mu kontrol et
        if (now > expiresAt) {
          this.deleteToken(userToken.id!).subscribe();
          return null;
        }
        
        return userToken;
      }),
      catchError(() => of(null))
    );
  }

  // Token sil
  deleteToken(tokenId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tokenId}`);
  }

  // Kullanıcının tüm token'larını sil - userId artık string
  deleteUserTokens(userId: string): Observable<any> {
    return this.http.get<IToken[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      map(tokens => {
        tokens.forEach(token => {
          this.deleteToken(token.id!).subscribe();
        });
        return true;
      }),
      catchError(() => of(false))
    );
  }

  // Süresi dolmuş token'ları temizle
  cleanupExpiredTokens(): Observable<any> {
    return this.http.get<IToken[]>(this.apiUrl).pipe(
      map(tokens => {
        const now = new Date();
        tokens.forEach(token => {
          const expiresAt = new Date(token.expiresAt);
          if (now > expiresAt) {
            this.deleteToken(token.id!).subscribe();
          }
        });
        return true;
      }),
      catchError(() => of(false))
    );
  }

  // Rastgele token oluştur
  private createRandomToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}