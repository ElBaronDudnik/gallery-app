import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

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
