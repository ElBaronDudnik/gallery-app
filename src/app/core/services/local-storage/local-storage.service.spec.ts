import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';


describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStorageFake: jasmine.SpyObj<Storage> = <jasmine.SpyObj<Storage>>{};

  beforeEach(() => {
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStorageFake ? JSON.parse(localStorageFake[key]) : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStorageFake[key] = JSON.stringify(value))
    );
    TestBed.configureTestingModule({
      providers: [LocalStorageService, { provide: window.localStorage, useValue: localStorageFake}]
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save correctly item to local storage', () => {
    const itemKey = 'test';
    const itemValue = 'value';
    service.saveToLocalStorage(itemKey, itemValue);
    expect(service.getFromLocalStorage(itemKey)).toBe(itemValue)
  });
});
