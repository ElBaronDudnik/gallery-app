import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../../models/photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'https://api.unsplash.com/photos';
  private defaultPhotosNumber = 12;
  private defaultRandomPhotosNumber = 10;

  constructor(private http: HttpClient) { }

  getPhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.url}/${id}`);
  }

  getPhotos(page: number = 1, perPage: number = this.defaultPhotosNumber): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.url}?page=${page}&per_page=${perPage}`);
  }

  getRandom(count: number = this.defaultRandomPhotosNumber): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.url}/random/?count=${count}`);
  }
}
