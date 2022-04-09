import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleViewComponent } from './modules/favorites/favorites/single-view/single-view.component';
import { PathNotFoundComponent } from './shared/components/path-not-found/path-not-found.component';
import { PhotosComponent } from './modules/photos/photos/photos.component';
import { FavoritesComponent } from './modules/favorites/favorites/favorites.component';

const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: 'photos/:id', component: SingleViewComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: '/photos', pathMatch: 'full' },
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
