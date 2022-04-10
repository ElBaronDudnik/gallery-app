import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleViewComponent } from './single-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../../../../core/services/http/http.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { By } from '@angular/platform-browser';
import { FavoritesService } from '../../../../core/services/favorites/favorites.service';
import { mockPhoto } from '../../../../shared/testing-helpers/photo.mock';

function snapshot(id: string | null) {
  return {
    snapshot: {
      paramMap: { get: (key: any) => id }
    }
  }
}

describe('SingleViewComponent', () => {
  let component: SingleViewComponent;
  let fixture: ComponentFixture<SingleViewComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let activatedRouteStub: jasmine.SpyObj<ActivatedRoute>;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let favoriteServiceSpy: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['getPhoto']);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['openNotification']);
    const favoriteServiceSpy = jasmine.createSpyObj('FavoritesService', 'removeFromFavorites');
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ SingleViewComponent ],
      providers: [
        { provide: HttpService, useValue: httpSpy },
        { provide: ActivatedRoute, useValue: snapshot('123') },
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
    activatedRouteStub = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    favoriteServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get photo by id', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(httpServiceSpy.getPhoto).toHaveBeenCalledWith('123');
  });

  it('should remove photo from favorites on corresponding button click', () => {
    const removeButton = fixture.debugElement.query(By.css('button'));
    removeButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(favoriteServiceSpy.removeFromFavorites).toHaveBeenCalledWith(mockPhoto);
  });

  it('should show notification on remove', () => {
    const removeButton = fixture.debugElement.query(By.css('button'));
    removeButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(notificationServiceSpy.openNotification)
      .toHaveBeenCalledWith(`Photo by ${mockPhoto.user.name} was removed from favorites`);
  });
});
