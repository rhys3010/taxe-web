/**
 * booking-history.component.ts
 *
 * The component file for the booking-history component to handle API requests etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { first } from 'rxjs/operators';

import { Booking } from '../../_models/booking';
import { CompanyService } from '../../_services/company.service';
import { BookingService } from '../../_services/booking.service';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  // Loaded list of bookings
  bookings: Booking[];
  // The company ID from local storage
  companyId = JSON.parse(localStorage.getItem('user')).company;
  constructor(private companyService: CompanyService,
              private bookingService: BookingService,
              private dialog: MatDialog) {}

  /**
   * Called when the component is created to fetch a list of al the company's bookings
   */
  ngOnInit() {
    this.loadAllBookings();
  }

  /**
   * Called by view to open a dialog displaying detailed information about a given bookings
   * @param id - Booking's ID
   */
  openBookingDialog(id: string) {
    // Get the full booking object from the Booking Service
    this.bookingService.getBooking(id)
      .pipe(first())
      .subscribe(
        booking => {
          // Pass to dialog
          this.dialog.open(BookingDialogComponent, {
            data: {
              booking
            }
          });
        }
      );
  }

  /**
   * Loads a list of all the company's bookings via service
   */
  private loadAllBookings() {
    this.companyService.getBookings(this.companyId)
      .pipe(first())
      .subscribe(
        bookings => {
          // @ts-ignore
          this.bookings = bookings;
        },
        error => {
          this.bookings = [];
        }
      );
  }
}
