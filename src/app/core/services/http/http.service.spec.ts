import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Photo } from '../../models/photo';
import { mockPhoto } from '../../../shared/testing-helpers/photo.mock';

function generateArrayOfPhotos(n: number): Photo[] {
  return new Array(n).fill(mockPhoto);
}

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;
  let url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    url = 'https://api.unsplash.com/photos';
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPhotos', () => {
    it('should return expected array of photos with default properties', (done) => {
      const defaultPhotosNumber = 12;
      const expectedData: Photo[] = generateArrayOfPhotos(defaultPhotosNumber);
      const expectedUrl = `${url}?page=1&per_page=${defaultPhotosNumber}`;

      service.getPhotos().subscribe((result) => {
        expect(result).toEqual(expectedData);
        expect(result.length).toEqual(defaultPhotosNumber);
        done();
      });
      const testRequest = httpTestingController.expectOne(expectedUrl);

      testRequest.flush(expectedData);
    });

    it('should return expected array of photos with custom properties', (done) => {
      const customPhotosNumber = 10;
      const expectedData: Photo[] = generateArrayOfPhotos(customPhotosNumber);
      const expectedUrl = `https://api.unsplash.com/photos?page=1&per_page=${customPhotosNumber}`;

      service.getPhotos(1, customPhotosNumber).subscribe((result) => {
        expect(result).toEqual(expectedData);
        expect(result.length).toEqual(customPhotosNumber);
        done();
      });
      const testRequest = httpTestingController.expectOne(expectedUrl);

      testRequest.flush(expectedData);
    });
  });

  describe('#getPhoto', () => {
    it('should return expected photos obj with corresponding id', (done) => {
      const id = 'abc12';
      const expectedData: Photo = { ...mockPhoto, id};
      const expectedUrl = `${url}/:${id}`;

      service.getPhoto(id).subscribe((result) => {
        expect(result).toEqual(expectedData);
        done();
      });
      const testRequest = httpTestingController.expectOne(expectedUrl);

      testRequest.flush(expectedData);
    });
  });
});
