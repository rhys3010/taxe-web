/**
 * active-bookings.component.ts
 *
 * The component file for the active-bookings component to handle API requests etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { Booking } from '../../_models/booking';
import { CompanyService } from '../../_services/company.service';
import { BookingService } from '../../_services/booking.service';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-active-bookings',
  templateUrl: './active-bookings.component.html',
  styleUrls: ['./active-bookings.component.scss']
})
export class ActiveBookingsComponent implements OnInit {
  // Loaded list of active bookings
  bookings: Booking[];
  // The company ID from local storage
  companyId = JSON.parse(localStorage.getItem('user')).company;
  constructor(private companyService: CompanyService,
              private bookingService: BookingService,
              private notificationService: NotificationService) {
  }

  /**
   * Called when the component is initialized to load the list of active bookings
   */
  ngOnInit() {
    this.loadActiveBookings();
    // TODO: Get company's *Available* drivers
  }

  /**
   * Load the list of active bookings via the Company Service
   */
  private loadActiveBookings() {
    // Get the list of bookings from the API via the service
    this.companyService.getActiveBookings(this.companyId)
      .pipe(first())
      .subscribe(
        bookings => {
          // @ts-ignore
          this.bookings = bookings;
        },
        error => {
          // If error occurred, set bookings to empty
          this.bookings = [];
        }
      );
  }

  /**
   * Release a booking back to the collective pool
   * @param id - The booking ID
   */
  private releaseBooking(id: string) {
  }

  /**
   * Edit a booking's status
   * @param id - The booking ID
   * @param status - The Updated status
   */
  private editBookingStatus(id: string, status: string) {
  }

  /**
   * Edit a booking's driver
   * @param bookingId - The booking ID
   * @param driverId - The *new* driver's ID
   */
  private editBookingDriver(bookingId: string, driverId: string) {
  }

}
