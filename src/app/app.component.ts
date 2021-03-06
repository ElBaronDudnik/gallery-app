import { Component, OnInit } from '@angular/core';
import { PhotosService } from './modules/photos/services/photos.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.photosService.loadPhotos();
  }
}
