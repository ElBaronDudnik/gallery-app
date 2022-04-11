import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { mockPhoto } from '../../../shared/testing-helpers/photo.mock';
import { PhotosService } from '../services/photos.service';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SingleViewComponent } from '../../favorites/favorites/single-view/single-view.component';
import { ChangeDetectionStrategy } from '@angular/core';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let photosServiceSpy: jasmine.SpyObj<PhotosService>;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('NotificationService', ['showNotification']);
    const photosSpy = jasmine.createSpyObj('PhotosService',
      ['getPhotos', 'addToFavorite', 'isExistInFavorites', 'loadPhotos']);
    const loaderSpy = jasmine.createSpyObj('LoaderService', ['getLoaderState']);
    await TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      providers: [
        { provide: NotificationService, useValue: spy },
        { provide: PhotosService, useValue: photosSpy },
        { provide: LoaderService, useValue: loaderSpy }
      ]
    }).overrideComponent(PhotosComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();

    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    loaderServiceSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    photosServiceSpy = TestBed.inject(PhotosService) as jasmine.SpyObj<PhotosService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos on ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(photosServiceSpy.getPhotos).toHaveBeenCalled();
  });

  it('should add photo to favorites on click', () => {
    component.onClick(mockPhoto);
    expect(photosServiceSpy.addToFavorite).toHaveBeenCalledWith(mockPhoto);
  });

  it('should show notification on click', () => {
    component.onClick(mockPhoto);
    expect(notificationServiceSpy.showNotification).toHaveBeenCalledWith(`Photo by ${mockPhoto.user.name} was added to favorites`);
  });

  it('should not add photo to favorites on click when photo already exist in collection', () => {
    photosServiceSpy.isExistInFavorites.and.returnValue(true);
    component.onClick(mockPhoto);
    expect(photosServiceSpy.addToFavorite).not.toHaveBeenCalled();
  });

  it('should show corresponding notification when photo already exist in collection', () => {
    photosServiceSpy.isExistInFavorites.and.returnValue(true);
    component.onClick(mockPhoto);
    expect(notificationServiceSpy.showNotification).toHaveBeenCalledWith(`Photo by ${mockPhoto.user.name} has already added to favorites`);
  });

  it('should trigger loadMore on directive output', () => {
    component.onLoadMore();
    expect(photosServiceSpy.loadPhotos).toHaveBeenCalled();
  });

  it('should render loader, when loading state is true', () => {
    loaderServiceSpy.getLoaderState.and.returnValue(of(true));
    component.ngOnInit();
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('.loader'));
    expect(loader).toBeTruthy();
  })
});
