import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Photo } from '../../../core/models/photo';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
  favoritesPhotos!: Observable<Photo[]>;
  constructor(private router: Router, private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.favoritesPhotos = this.favoriteService.getFavorites();
  }

  onClick(photo: Photo): void {
    this.router.navigate(['/photos', photo.id])
  }
}
