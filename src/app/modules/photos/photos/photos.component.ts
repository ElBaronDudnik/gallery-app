import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PhotosService } from '../../../core/services/photos/photos.service';
import { Observable } from 'rxjs';
import { Photo } from '../../../core/models/photo';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { LoaderService } from '../../../core/services/loader/loader.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent implements OnInit {
  photos!: Observable<Photo[]>;
  isLoading!: Observable<boolean | null>;
  constructor(
    private photosService: PhotosService,
    private notification: NotificationService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.photos = this.photosService.getPhotos();
    this.isLoading = this.loader.getLoaderState();
  }

  onClick(photo: Photo): void {
    if (!this.photosService.isExistInFavorites(photo)) {
      this.notification.showNotification(`Photo by ${photo.user.name} was added to favorites`);
      this.photosService.addToFavorite(photo);
    } else {
      this.notification.showNotification(`Photo by ${photo.user.name} has already added to favorites`);
    }
  }
}
