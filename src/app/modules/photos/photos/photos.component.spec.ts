import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { mockPhoto } from '../../../shared/testing-helpers/photo.mock';
import { PhotosService } from '../../../core/services/photos/photos.service';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let photosServiceSpy: jasmine.SpyObj<PhotosService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('NotificationService', ['showNotification']);
    const photosSpy = jasmine.createSpyObj('PhotosService', ['getPhotos', 'addToFavorite', 'isExistInFavorites']);
    await TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      providers: [
        { provide: NotificationService, useValue: spy },
        { provide: PhotosService, useValue: photosSpy }
      ]
    })
    .compileComponents();

    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
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
});
