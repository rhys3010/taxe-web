/**
 * authentication.service.ts
 *
 * Service class for user authentication, send API request for user login and allow user
 * to logout by removing reference from local storage.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  /**
   * Send login request to API to validate user credentials
   */
  login(email: string, password: string) {
    // Convert Credentails to Basic Auth Header
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(`${environment.apiUrl}/users/login`, '', { headers: headers })
      .pipe(map(user => {
        // If the user has been populated and a token found, login was successful
        if (user && user.token) {
          // Store the authed user in local storage
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      }));
  }

  /**
   * Log the user out by removing their reference from local storage
   */
  logout() {
    localStorage.removeItem('user');
  }
}
