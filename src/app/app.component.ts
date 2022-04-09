import { Component, OnInit } from '@angular/core';
import { PhotosService } from './core/services/photos/photos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private photosService: PhotosService, private router: Router) {}

  ngOnInit(): void {
    this.photosService.loadPhotos();
  }

  onLoadMore() {
    if (this.router.routerState.snapshot.url === '/photos') {
      this.photosService.loadPhotos()
    }
  }
}
