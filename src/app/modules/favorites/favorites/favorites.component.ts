import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from '../../../core/models/photo';
import { FavoritesService } from '../services/favorites.service';

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
    this.router.navigate(['/favorites', photo.id])
  }
}
