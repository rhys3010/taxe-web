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
import { User } from '../../_models/user';
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
  // Loaded list of available drivers
  drivers: User[];
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
    this.loadAvailableDrivers();
    this.loadActiveBookings();
  }

  /**
   * Convenience function to return the name of a driver by their ID using the
   * loaded list of available drivers.
   * @param id - Driver's ID
   */
  getDriverName(id: string) {
    // If the driver's ID doesn't exist, return 'Unallocated'
    if (!id || !this.drivers) {
      return 'Unallocated';
    }
    const user = this.drivers.find(driver => driver._id === id);
    // If the found user's name is null, return 'Unallocated'
    // @ts-ignore
    if (!user.name) {
      return 'Unallocated';
    }
    // @ts-ignore
    return user.name;
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
   * Load a list of all the booking's currently available drivers
   */
  private loadAvailableDrivers() {
    // Get the list of drivers from the API and filter by availability
    this.companyService.getDrivers(this.companyId)
      .pipe(first())
      .subscribe(
        drivers => {
          // Filter the returned list to remove any unavailable drivers
          // this.drivers = drivers.filter(driver => driver.available);
          this.drivers = drivers;
        },
        error => {
          // If error occurred, set drivers to empty
          this.drivers = [];
        }
      );
  }

  /**
   * Release a booking back to the collective pool
   * @param id - The booking ID
   */
  private releaseBooking(id: string) {
    // Release the booking via the booking service
    this.bookingService.releaseBooking(id)
      .pipe(first())
      .subscribe(() => {
        // Send Success Message
        this.notificationService.showNotification('success', 'done', 'Booking Successfully Released');
        // Update View
        this.loadActiveBookings();
      });
  }

  /**
   * Edit a booking's status
   * @param id - The booking ID
   * @param status - The Updated status
   */
  private editBookingStatus(id: string, status: string) {
    // Create a new booking object to use to update the booking's status
    let updatedBooking = new Booking();
    updatedBooking.status = status;
    // Send the PATCH request
    this.bookingService.editBooking(id, updatedBooking)
      .pipe(first())
      .subscribe(() => {
        // Send Success Message
        this.notificationService.showNotification('success', 'done', 'Booking Status Successfully Changed');
        // Update View
        this.loadActiveBookings();
      });
  }

  /**
   * Edit a booking's driver
   * @param bookingId - The booking ID
   * @param driverId - The *new* driver's ID
   */
  private editBookingDriver(bookingId: string, driverId: string) {
    // Create a new booking object to use to update the booking's driver
    let updatedBooking = new Booking();
    updatedBooking.driver = driverId;
    // Send the PATCH request
    this.bookingService.editBooking(bookingId, updatedBooking)
      .pipe(first())
      .subscribe(() => {
        // Send Success Message
        this.notificationService.showNotification('success', 'done', 'Driver Successfully Changed');
        // Update View
        this.loadActiveBookings();
      });
  }

}
