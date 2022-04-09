import { NgModule } from '@angular/core';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos/photos.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PhotosComponent
  ],
  imports: [
    SharedModule,
    PhotosRoutingModule
  ]
})
export class PhotosModule { }
