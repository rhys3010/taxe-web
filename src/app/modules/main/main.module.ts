/**
 * main.module.ts
 *
 * The module file for the app's main screen to initialize router etc.
 *
 * @author Rhys Evans
 * @version 0.1
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutes } from './main.routing';

import { CompanyProfileComponent } from '../../components/company-profile/company-profile.component';
import { ActiveBookingsComponent } from '../../components/active-bookings/active-bookings.component';
import { AvailableBookingsComponent } from '../../components/available-bookings/available-bookings.component';
import { BookingHistoryComponent } from '../../components/booking-history/booking-history.component';
import { DriversComponent } from '../../components/drivers/drivers.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';
import {BookingDialogComponent} from '../../components/booking-dialog/booking-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    CompanyProfileComponent,
    ActiveBookingsComponent,
    AvailableBookingsComponent,
    BookingHistoryComponent,
    DriversComponent,
    BookingDialogComponent
  ],
  entryComponents: [
    BookingDialogComponent
  ],
})
export class MainModule { }
