import { Component, OnInit } from '@angular/core';
import { Photo } from '../../../../core/models/photo';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../core/services/http/http.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../../../../core/services/favorites/favorites.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit {
  photo!: Observable<Photo>;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private favoriteService: FavoritesService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.photo = this.httpService.getPhoto(id);
    }
  }

  removeFromFavorites(photo: Photo): void {
    this.notificationService.openNotification(`The photo by ${photo.user.name} was removed from favorites`);
    this.favoriteService.removeFromFavorites(photo);
  }
}
