import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '../../models/photo';
import { HttpService } from '../http/http.service';
import { take } from 'rxjs/operators';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private photos: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([]);

  constructor(private http: HttpService, private favoritesService: FavoritesService) {}

  loadPhotos(): void {
    this.http.getRandom(15).pipe(take(1)).subscribe(photos =>
      this.photos.next([...this.photos.getValue(), ...photos])
    );
  }

  getPhotos(): Observable<Photo[]> {
    return this.photos.asObservable();
  }

  addToFavorite(photo: Photo): void {
    this.favoritesService.addToFavorites(photo);
  }
}
