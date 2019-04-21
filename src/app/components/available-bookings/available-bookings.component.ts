/**
 * available-bookings.component.ts
 *
 * The component file for the available-bookings component to handle API requests etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { Booking } from '../../_models/booking';
import { BookingService } from '../../_services/booking.service';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-available-bookings',
  templateUrl: './available-bookings.component.html',
  styleUrls: ['./available-bookings.component.scss']
})
export class AvailableBookingsComponent implements OnInit {
  // Loaded list of available bookings
  bookings: Booking[];
  // The company ID from  local storage
  companyId = JSON.parse(localStorage.getItem('user')).company;
  constructor(private bookingService: BookingService,
              private notificationService: NotificationService) {
  }

  /**
   * Called when the component is initialized to load all the available bookings
   */
  ngOnInit() {
    this.loadAvailableBookings();
  }

  /**
   * Claim a booking on behalf of a company
   * @param bookingId - The booking's ID
   */
  claimBooking(bookingId: string) {
    this.bookingService.claimBooking(bookingId, this.companyId)
      .pipe(first())
      .subscribe(() => {
        // Send success message
        this.notificationService.showNotification('success', 'done', 'Booking Successfully Claimed');
        // Update View
        this.loadAvailableBookings();
      });
  }

  /**
   * Retrieve a list of all the available bookings from the Booking Service
   */
  private loadAvailableBookings() {
    // Get the list of bookings from the API via the Booking Service
    this.bookingService.getAvailableBookings()
      .pipe(first())
      .subscribe(
        bookings => {
          this.bookings = bookings;
        },
        error => {
          this.bookings = [];
        }
      );
  }
}
