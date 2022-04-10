import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { Component } from '@angular/core';

// @Component({
//   template: '<div *ngIf="loaderService.getLoaderState() | async"></div>'
// })
// export class TestComponent {
//   constructor(public loaderService: LoaderService) {}
// }

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loader', (done) => {
    service.show();
    service.getLoaderState().subscribe(loaderState => {
      expect(loaderState).toBeTruthy();
      done();
    });
  });

  it('should hide loader', (done) => {
    service.hide();
    service.getLoaderState().subscribe(loaderState => {
      expect(loaderState).toBeFalsy();
      done();
    });
  });
});
