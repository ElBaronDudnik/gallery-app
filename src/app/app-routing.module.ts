import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './shared/components/list-view/list-view.component';
import { SingleViewComponent } from './shared/components/single-view/single-view.component';
import { PathNotFoundComponent } from './shared/components/path-not-found/path-not-found.component';

const routes: Routes = [
  { path: 'photos', component: ListViewComponent },
  { path: 'photos/:id', component: SingleViewComponent },
  { path: 'favorites', component: ListViewComponent },
  { path: '', redirectTo: '/photos', pathMatch: 'full' },
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
