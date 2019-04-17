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

import { CompanyProfileComponent } from '../../pages/company-profile/company-profile.component';
import { ActiveBookingsComponent } from '../../pages/active-bookings/active-bookings.component';
import { AvailableBookingsComponent } from '../../pages/available-bookings/available-bookings.component';
import { BookingHistoryComponent } from '../../pages/booking-history/booking-history.component';
import { DriversComponent } from '../../pages/drivers/drivers.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
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
  ],
  declarations: [
    CompanyProfileComponent,
    ActiveBookingsComponent,
    AvailableBookingsComponent,
    BookingHistoryComponent,
    DriversComponent
  ]
})
export class MainModule { }
