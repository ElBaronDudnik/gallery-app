import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './components/list-view/list-view.component';
import { SingleViewComponent } from './components/single-view/single-view.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';

const SHARED_COMPONENTS = [
  ListViewComponent,
  SingleViewComponent,
  PathNotFoundComponent,
  HeaderComponent
];

const SHARED_MODULES = [
  CommonModule,
  MatToolbarModule,
  MatButtonToggleModule
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
  ],
  imports: [
    ...SHARED_MODULES,
    RouterModule
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_MODULES
  ]
})
export class SharedModule { }
