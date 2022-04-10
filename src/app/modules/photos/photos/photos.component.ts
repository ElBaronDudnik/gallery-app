import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../../core/services/photos/photos.service';
import { Observable } from 'rxjs';
import { Photo } from '../../../core/models/photo';
import { NotificationService } from '../../../core/services/notification/notification.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnInit {
  photos!: Observable<Photo[]>;
  constructor(private photosService: PhotosService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.photos = this.photosService.getPhotos();
  }

  onClick(photo: Photo): void {
    this.notification.openNotification(`Photo by ${photo.user.name} was added to favorites`);
    this.photosService.addToFavorite(photo);
  }
}
