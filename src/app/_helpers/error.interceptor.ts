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
import { Router } from '@angular/router';

import { NotificationService } from '../_services/notification.service';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private router: Router) {}
  // Intercept the response to handle any errors returned
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      // HANDLE SPECIAL CASES
      // If Error is a token error, force the user to log out..
      if (err.error.code === 1 || err.error.code === 2 || err.error.code === 3) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }

      // Show generic error notification
      this.notificationService.showNotification('danger', 'error', err.error.description);
      return throwError(err.error.message);
    }));
  }
}
