import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FavoritesModule { }
