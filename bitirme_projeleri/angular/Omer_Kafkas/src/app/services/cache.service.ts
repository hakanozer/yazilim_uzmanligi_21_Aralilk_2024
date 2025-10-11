import { Injectable } from '@angular/core';

interface CacheEntry<T> { data: T; ts: number; ttl: number; }

@Injectable({ providedIn: 'root' })
export class CacheService {
  private store = new Map<string, CacheEntry<any>>();
  private readonly defaultTtlMs = 60_000; // 60s

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > entry.ttl) {
      this.store.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlMs?: number) {
    this.store.set(key, { data, ts: Date.now(), ttl: ttlMs ?? this.defaultTtlMs });
  }

  has(key: string) {
    return !!this.get(key);
  }

  clear(key?: string) {
    if (key) this.store.delete(key); else this.store.clear();
  }
}
