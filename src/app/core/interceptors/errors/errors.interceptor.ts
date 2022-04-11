import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationService } from '../../services/notification/notification.service';

@Injectable({ providedIn: 'root' })
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private notification: NotificationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
         this.notification.showError('Error from server');
         return throwError(error);
      })
    );
  }
}
