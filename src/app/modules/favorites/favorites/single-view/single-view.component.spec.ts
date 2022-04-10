import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleViewComponent } from './single-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../../../../core/services/http/http.service';
import { ActivatedRoute } from '@angular/router';

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

  beforeEach(async () => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['getPhoto']);
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ SingleViewComponent ],
      providers: [
        { provide: HttpService, useValue: httpSpy },
        { provide: ActivatedRoute, useValue: snapshot('123') }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleViewComponent);
    component = fixture.componentInstance;
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
    activatedRouteStub = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
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
});
