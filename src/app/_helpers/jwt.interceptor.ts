/**
 * jwt.interceptor.ts
 *
 * Injectable http interceptor to add authorization header to needed requests that include
 * the JWT access token
 *
 * @author Jason Watmore (http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial)
 * @author Rhys Evans
 * @version 0.1
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // Intercept the request and add auth header
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    return next.handle(req);
  }
}
