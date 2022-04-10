import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { mockPhoto } from '../../../shared/testing-helpers/photo.mock';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', ['saveToLocalStorage', 'getFromLocalStorage']);
    TestBed.configureTestingModule({
      providers: [ FavoritesService, { provide: LocalStorageService, useValue: spy}]
    });
    service = TestBed.inject(FavoritesService);
    localStorageSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add photo to favorites', (done) => {
    service.addToFavorites(mockPhoto);
    service.getFavorites().subscribe(value => {
      expect(value).toEqual([mockPhoto]);
      done();
    });
  });

  it('should save favorites photos to localstorage', () => {
    service.addToFavorites(mockPhoto);
    expect(localStorageSpy.saveToLocalStorage).toHaveBeenCalledWith('favorites', [mockPhoto]);
  });

  it('should remove photo to favorites', (done) => {
    service.removeFromFavorites(mockPhoto);
    service.getFavorites().subscribe(value => {
      expect(value).toEqual([]);
      done();
    });
  });

  it('should remove photo from localstorage when remove from favorites', () => {
    service.removeFromFavorites(mockPhoto);
    expect(localStorageSpy.saveToLocalStorage).toHaveBeenCalledWith('favorites', []);
  });
});
