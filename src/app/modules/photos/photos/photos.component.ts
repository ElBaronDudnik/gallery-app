import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../../core/services/photos/photos.service';
import { Observable } from 'rxjs';
import { Photo } from '../../../core/models/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnInit {
  photos!: Observable<Photo[]>;
  constructor(private photosService: PhotosService) { }

  ngOnInit(): void {
    this.photos = this.photosService.getPhotos();
  }

  onClick(photo: Photo): void {
    this.photosService.addToFavorite(photo);
  }
}
