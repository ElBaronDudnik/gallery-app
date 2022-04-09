import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Photo } from '../../models/photo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([]);

  constructor() {}

  addToFavorites(photo: Photo): void {
    if (!this.favorites.getValue().find((photoEl: Photo) => photoEl.id === photo.id)) {
      this.favorites.next([...this.favorites.getValue(), photo]);
    }
  }

  getFavorites(): Observable<Photo[]> {
    return this.favorites.asObservable();
  }

  removeFromFavorites(photo: Photo): void {
    const filteredArr = this.favorites.getValue().filter((photoEl: Photo) => photoEl.id !== photo.id);
    this.favorites.next(filteredArr);
  }

}
