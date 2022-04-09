import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './components/list-view/list-view.component';
import { SingleViewComponent } from './components/single-view/single-view.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';

const SHARED_COMPONENTS = [
  ListViewComponent,
  SingleViewComponent,
  PathNotFoundComponent
];

const SHARED_MODULES = [
  CommonModule
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    ...SHARED_MODULES
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_MODULES
  ]
})
export class SharedModule { }
