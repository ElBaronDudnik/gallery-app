import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleViewComponent } from './single-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../../../../core/services/http/http.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { By } from '@angular/platform-browser';
import { FavoritesService } from '../../../../core/services/favorites/favorites.service';
import { mockPhoto } from '../../../../shared/testing-helpers/photo.mock';
import { of } from 'rxjs';
import { ActivatedRouteStub } from '../../../../shared/testing-helpers/activated-route-stub';


describe('SingleViewComponent', () => {
  let component: SingleViewComponent;
  let fixture: ComponentFixture<SingleViewComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let activatedRouteStub: ActivatedRouteStub;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let favoriteServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['getPhoto']);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['openNotification']);
    const favoriteServiceSpy = jasmine.createSpyObj('FavoritesService', ['removeFromFavorites']);
    activatedRouteStub = new ActivatedRouteStub();
    await TestBed.configureTestingModule({
      declarations: [ SingleViewComponent ],
      providers: [
        { provide: HttpService, useValue: httpSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: FavoritesService, useValue: favoriteServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleViewComponent);
    component = fixture.componentInstance;
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    favoriteServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get photo by id', () => {
    activatedRouteStub.setParamMap({ id: '123' });

    component.ngOnInit();
    fixture.detectChanges();
    expect(httpServiceSpy.getPhoto).toHaveBeenCalledWith('123');
  });

  it('should not get photo if no id', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(activatedRouteStub.snapshot.paramMap.get('id')).toEqual(null);
    expect(httpServiceSpy.getPhoto).not.toHaveBeenCalled();
  });

  describe('#removeFromFavorites', () => {
    beforeEach(() => {
      component.photo = of(mockPhoto);
      fixture.detectChanges();
      const removeButton = fixture.debugElement.query(By.css('button'));
      removeButton.triggerEventHandler('click', null);
    });

    it('should remove photo from favorites on corresponding button click', () => {
      expect(favoriteServiceSpy.removeFromFavorites).toHaveBeenCalledWith(mockPhoto);
    });

    it('should show notification on remove', () => {
      expect(notificationServiceSpy.openNotification)
        .toHaveBeenCalledWith(`The photo by ${mockPhoto.user.name} was removed from favorites`);
    });
  });

  it('should show #noPhoto template when there is no photo', () => {
    const noPhotoTemplate = fixture.debugElement.query(By.css('.no-photo'));
    expect(noPhotoTemplate).toBeTruthy();
  })
});
