import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  styles: [`
  .loader-container {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .bottom-loader {
    margin: -60px 0;
    padding: 30px 0;
  }
  .full-screen-loader {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  `],
  template: `
      <div [ngClass]="{'loader-container': true, 'full-screen-loader': fullScreen, 'bottom-loader': !fullScreen}">
        <mat-spinner [diameter]="fullScreen ? 100 : 40"></mat-spinner>
      </div>`,
})
export class LoaderComponent {
  @Input() fullScreen: boolean = false;

}
