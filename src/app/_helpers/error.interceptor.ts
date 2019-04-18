/**
 * jwt.interceptor.ts
 *
 * Injectable http interceptor to handle all HTTP errors returned by API. Most HTTP errors will
 * be handled in a generic way by simply returning the Code and the error (https://github.com/rhys3010/taxe-api/blob/master/routes/README.md).
 * However, some error codes will prompt unique behaviour (invalid/expired token)
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}
  // Intercept the response to handle any errors returned
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      // HANDLE SPECIAL CASES
      // Show generic error notification
      const error = err.error.message;
      console.log(error);
      return throwError(error);
    }));
  }
}