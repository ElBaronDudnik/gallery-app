import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotosService } from './core/services/photos/photos.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({ template: `<div></div>` })
export class TestComponent {}

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;
  let photoServiceSpy: jasmine.SpyObj<PhotosService>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PhotosService', ['loadPhotos']);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'favorites', component: TestComponent}]),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: PhotosService, useValue: spy }]
    }).compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    photoServiceSpy = TestBed.inject(PhotosService) as jasmine.SpyObj<PhotosService>;
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load photos on ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(photoServiceSpy.loadPhotos).toHaveBeenCalled();
  });

  xit('should load photos on loadMore only on photos page', fakeAsync(() => {
    // spyOn(router, 'navigate');
    router.navigate(['favorites']);
    tick();
    fixture.detectChanges();
    component.onLoadMore();
    console.log(router.routerState.snapshot.url);
    expect(photoServiceSpy.loadPhotos).toHaveBeenCalled();
  }))
});
