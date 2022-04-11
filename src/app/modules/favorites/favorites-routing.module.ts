import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { SingleViewComponent } from './favorites/single-view/single-view.component';

const routes: Routes = [
  { path: 'favorites', component: FavoritesComponent },
  { path: 'favorites/:id', component: SingleViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
