/**
 * booking.service.ts
 *
 * Service class for all tasks to do with the booking model, fetch booking information, edit booking, etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Booking } from '../_models/booking';

@Injectable()
export class BookingService {
  constructor(private http: HttpClient) {}

  /**
   * Claim a booking for a given company
   * @param bookingId - The booking's id
   * @param companyId - The claiming company's ID
   */
  claimBooking(bookingId: string, companyId: string) {
    // Create a booking object to update
    let updatedBooking = new Booking();
    updatedBooking.company = companyId;
    return this.http.patch<any>(`${environment.apiUrl}/bookings/${bookingId}/claim`, updatedBooking);
  }

  /**
   * Release a booking back into the available pool
   * @param id - The booking's ID
   */
  releaseBooking(id: string) {
    // @ts-ignore
    return this.http.patch<any>(`${environment.apiUrl}/bookings/${id}/release`);
  }

  /**
   * Edit a booking
   * @param id - Booking id
   * @param editedBooking - Updated Booking Object
   */
  editBooking(id: string, editedBooking: Booking) {
    return this.http.patch<any>(`${environment.apiUrl}/bookings/${id}`, editedBooking);
  }

  /**
   * Get a list of all unallocated (available) bookings
   */
  getAvailableBookings() {
    return this.http.get<any>(`${environment.apiUrl}/bookings`)
      .pipe(map(bookings => {
        return bookings;
      }));
  }
}
