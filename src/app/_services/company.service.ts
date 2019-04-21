/**
 * company.service.ts
 *
 * Service class for all tasks to do with the company model, fetch company information, edit company, etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a companny by ID via the API
   * @param id - Company'd ID
   */
  getCompany(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/companies/${id}`)
      .pipe(map(company => {
        return company;
      }));
  }

  /**
   * Retrieves a list of all of the company's employed drivers
   * @param id - Company's ID
   */
  getDrivers(id: string) {
    return this.http.get<any>(`${environment.apiUrl}/companies/${id}/drivers`)
      .pipe(map(drivers => {
        return drivers;
      }));
  }

  /**
   * Removes a driver by ID from the company
   * @param companyId - Company's ID
   * @param driverId - Driver's ID
   */
  removeDriver(companyId: string, driverId: string) {
    // @ts-ignore
    return this.http.patch(`${environment.apiUrl}/companies/${companyId}/drivers/${driverId}`);
  }

  /**
   * Returns a list of the company's bookings
   * @param companyId - Company's ID
   */
  getBookings(companyId: string) {
    return this.http.get(`${environment.apiUrl}/companies/${companyId}/bookings`)
      .pipe(map(bookings => {
        return bookings;
      }));
  }

  /**
   * Returns a list of the company's admins
   * @param companyId - The company's ID
   */
  getAdmins(companyId: string) {
    return this.http.get(`${environment.apiUrl}/companies/${companyId}/admins`)
      .pipe(map(admins => {
        return admins;
      }));
  }

  /**
   * Returns a list of the company's active bookings
   * @param companyId - Company's ID
   */
  getActiveBookings(companyId: string){
    return this.http.get(`${environment.apiUrl}/companies/${companyId}/bookings?active=true`)
      .pipe(map(bookings => {
        return bookings;
      }));
  }
}
