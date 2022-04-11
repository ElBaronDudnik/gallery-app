import { TestBed } from '@angular/core/testing';

import { PhotosService } from './photos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavoritesService } from '../../favorites/services/favorites.service';
import { HttpService } from '../../../core/services/http/http.service';
import { mockPhoto } from '../../../shared/testing-helpers/photo.mock';
import { of } from 'rxjs';

describe('PhotosService', () => {
  let service: PhotosService;
  let favoriteServiceSpy: jasmine.SpyObj<FavoritesService>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spyFavorites = jasmine.createSpyObj('FavoriteService', ['addToFavorites', 'isExist']);
    const spyHttp = jasmine.createSpyObj('HttpService', ['getRandom']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: FavoritesService, useValue: spyFavorites },
        { provide: HttpService, useValue: spyHttp }
        ]
    });
    service = TestBed.inject(PhotosService);
    favoriteServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#loadPhotos should load photos', (done) => {
    httpServiceSpy.getRandom.and.returnValue(of([mockPhoto]));
    service.loadPhotos();
    service.getPhotos().subscribe(photos => {
      expect(photos).toEqual([mockPhoto]);
      done();
    });
  });

  it('#addToFavorites should add photo to favorites', () => {
    service.addToFavorite(mockPhoto);
    expect(favoriteServiceSpy.addToFavorites).toHaveBeenCalledWith(mockPhoto);
  });

  it('#isExistInFavorites should return existance in favorites collection', () => {
    service.isExistInFavorites(mockPhoto);
    expect(favoriteServiceSpy.isExist).toHaveBeenCalledWith(mockPhoto);
  })
});
