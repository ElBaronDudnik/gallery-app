import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatShackBar', ['open']);
    TestBed.configureTestingModule({
      providers: [ NotificationService, { provide: MatSnackBar, useValue: spy }]
    });
    service = TestBed.inject(NotificationService);
    matSnackBarSpy =TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#showNotification should trigger opening snackBar with default action text', () => {
    service.showNotification('Test message');
    expect(matSnackBarSpy.open).toHaveBeenCalledWith('Test message', 'Close', { duration: 3000 });
  });

  it('#showError should trigger opening snackBar with corresponding option', () => {
    service.showError('Test message');
    expect(matSnackBarSpy.open).toHaveBeenCalledWith('Test message', 'X', Object({ panelClass: [ 'error' ] }));
  });
});
