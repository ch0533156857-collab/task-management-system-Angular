import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setObject<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObject<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
