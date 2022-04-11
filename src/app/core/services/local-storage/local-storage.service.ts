import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  saveToLocalStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) as string);
  }
}
