/**
 * main.routing.ts
 *
 * The router file to populate the main layout with all the needed pages
 *
 * @author Rhys Evans
 * @version 0.1
 */
import { Routes } from '@angular/router';

import { CompanyProfileComponent } from '../../pages/company-profile/company-profile.component';
import { ActiveBookingsComponent } from '../../pages/active-bookings/active-bookings.component';
import { AvailableBookingsComponent } from '../../pages/available-bookings/available-bookings.component';
import { BookingHistoryComponent } from '../../pages/booking-history/booking-history.component';
import { DriversComponent } from '../../pages/drivers/drivers.component';


export const MainRoutes: Routes = [
  { path: 'company-profile', component: CompanyProfileComponent },
  { path: 'active-bookings', component: ActiveBookingsComponent },
  { path: 'available-bookings', component: AvailableBookingsComponent },
  { path: 'booking-history', component: BookingHistoryComponent },
  { path: 'drivers', component: DriversComponent }
];
