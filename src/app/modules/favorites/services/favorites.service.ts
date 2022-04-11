import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Photo } from '../../../core/models/photo';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([]);
  private key = 'favorites';

  constructor(private localStorageService: LocalStorageService) {
    const favoritesFromLocalStorage = this.localStorageService.getFromLocalStorage<Photo[]>(this.key) || [];
    this.favorites.next(favoritesFromLocalStorage);
  }

  addToFavorites(photo: Photo): void {
    this.favorites.next([...this.favorites.getValue(), photo]);
    this.updateLocalStorage();
  }

  isExist(photo: Photo): boolean {
    return !!this.favorites.getValue().find((photoEl: Photo) => photoEl.id === photo.id);
  }

  getFavorites(): Observable<Photo[]> {
    return this.favorites.asObservable();
  }

  removeFromFavorites(photo: Photo): void {
    const filteredArr = this.favorites.getValue().filter((photoEl: Photo) => photoEl.id !== photo.id);
    this.favorites.next(filteredArr);
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    this.localStorageService.saveToLocalStorage(this.key, this.favorites.getValue());
  }
}
