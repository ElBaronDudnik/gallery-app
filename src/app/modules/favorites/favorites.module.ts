import { NgModule } from '@angular/core';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { SharedModule } from '../../shared/shared.module';
import { SingleViewComponent } from './favorites/single-view/single-view.component';


@NgModule({
  declarations: [
    FavoritesComponent,
    SingleViewComponent
  ],
  imports: [
    SharedModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
