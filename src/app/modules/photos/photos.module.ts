import { NgModule } from '@angular/core';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos/photos.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PhotosComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    PhotosRoutingModule
  ]
})
export class PhotosModule { }
