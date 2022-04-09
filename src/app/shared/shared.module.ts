import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './components/list-view/list-view.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

const SHARED_COMPONENTS = [
  ListViewComponent,
  PathNotFoundComponent,
  HeaderComponent,
  LoaderComponent,
];

const SHARED_MODULES = [
  CommonModule,
  RouterModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
  ],
  imports: [
    ...SHARED_MODULES,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_MODULES
  ]
})
export class SharedModule { }
