import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  private authorizationKey = 'r0HSubI7F1wFoIRMxrRRGsquZfgaXTEabXO86XSrSqQ';
  // private authorizationKey = 'nglvTDlsJhmHNCzysRXozso2EzCpeeJfnZEtlvD6T40';
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Client-ID ${this.authorizationKey}`
      }
    });
    return next.handle(modifiedRequest);
  }
}
