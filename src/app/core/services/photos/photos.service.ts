import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '../../models/photo';
import { HttpService } from '../http/http.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private photos: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([]);

  constructor(private http: HttpService) {}

  loadPhotos(): void {
    this.http.getRandom(15).pipe(take(1)).subscribe(photos =>
      this.photos.next([...this.photos.getValue(), ...photos])
    );
  }

  getPhotos(): Observable<Photo[]> {
    return this.photos.asObservable();
  }
}
