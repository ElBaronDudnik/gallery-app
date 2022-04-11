import { flush, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorsInterceptor } from './errors.interceptor';
import { NotificationService } from '../../services/notification/notification.service';
import createSpyObj = jasmine.createSpyObj;

describe('NotificationInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let interceptor: ErrorsInterceptor;

  beforeEach(() => {
    const spy = createSpyObj('NotificationService', ['showError']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorsInterceptor,
        multi: true
      }, { provide: NotificationService, useValue: spy }]
    });
    httpClient = TestBed.inject(HttpClient);
    notificationServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    interceptor = TestBed.inject(ErrorsInterceptor);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
