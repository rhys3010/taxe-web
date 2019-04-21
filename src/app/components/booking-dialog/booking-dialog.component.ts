/**
 * booking-dialog.component.ts
 *
 * The component file for the booking overview dialog to displayed more detailed
 * information about a given bookings
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Booking } from '../../_models/booking';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent {
  // Receive the booking as data into the dialog
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
