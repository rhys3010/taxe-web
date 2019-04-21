/**
 * main.routing.ts
 *
 * The router file to populate the main layout with all the needed components
 *
 * @author Rhys Evans
 * @version 0.1
 */
import { Routes } from '@angular/router';

import { CompanyProfileComponent } from '../../components/company-profile/company-profile.component';
import { ActiveBookingsComponent } from '../../components/active-bookings/active-bookings.component';
import { AvailableBookingsComponent } from '../../components/available-bookings/available-bookings.component';
import { BookingHistoryComponent } from '../../components/booking-history/booking-history.component';
import { DriversComponent } from '../../components/drivers/drivers.component';


export const MainRoutes: Routes = [
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'active-bookings', component: ActiveBookingsComponent },
  { path: 'available-bookings', component: AvailableBookingsComponent },
  { path: 'booking-history', component: BookingHistoryComponent },
  { path: 'drivers', component: DriversComponent }
];
