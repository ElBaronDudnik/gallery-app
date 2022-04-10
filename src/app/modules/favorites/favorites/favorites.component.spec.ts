import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoritesService } from '../../../core/services/favorites/favorites.service';
import { mockPhoto } from '../../../shared/testing-helpers/photo.mock';
import { Router } from '@angular/router';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoriteServiceSpy: jasmine.SpyObj<FavoritesService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FavoritesService', ['getFavorites']);
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ FavoritesComponent ],
      providers: [{ provide: FavoritesService, useValue: spy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    favoriteServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites photos on ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(favoriteServiceSpy.getFavorites).toHaveBeenCalled();
  });

  it('should navigate to /photos/:id on click', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onClick(mockPhoto);
    expect(navigateSpy).toHaveBeenCalledWith(['/photos', mockPhoto.id]);
  });
});
