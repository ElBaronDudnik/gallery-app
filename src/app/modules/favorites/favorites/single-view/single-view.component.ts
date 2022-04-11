import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Photo } from '../../../../core/models/photo';
import { HttpService } from '../../../../core/services/http/http.service';
import { FavoritesService } from '../../services/favorites.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleViewComponent implements OnInit {
  photoObj!: Observable<Photo>;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private favoriteService: FavoritesService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.photoObj = this.httpService.getPhoto(id);
    }
  }

  removeFromFavorites(photo: Photo): void {
    this.notificationService.showNotification(`The photo by ${photo.user.name} was removed from favorites`);
    this.favoriteService.removeFromFavorites(photo);
  }
}
