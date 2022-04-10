import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  styles: [`
  .loader-container {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `],
  template: `
      <div class="loader-container">
        <mat-spinner></mat-spinner>
      </div>`,
})
export class LoaderComponent {}
