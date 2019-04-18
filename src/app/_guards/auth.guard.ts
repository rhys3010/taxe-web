/**
 * auth.guard.ts
 *
 * Injectable guard to protect the main page of the app to authenticated users only.
 * Note: Although this guard can be bypassed by manually setting localstorage, the API
 * requests are still protected by JWT.
 *
 * @author Jason Watmore (http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial)
 * @author Rhys Evans
 * @version 0.1
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Verify that 'user' exists in local storage
    if (localStorage.getItem('user')) {
      return true;
    } else {
      // User isn't logged in, so redirect to login page
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
