import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage errors
    }
  }
}